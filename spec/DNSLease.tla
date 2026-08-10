---- MODULE DNSLease ----
(* The DNS lease manager's state machine and timers, modeled for TLC.
 *
 * The lease resolves a hostname to a set of candidate hints, schedules a
 * refresh before each lease expires, keeps serving the last-known candidates
 * while a refresh keeps failing (the stale window), and gives up to Expired
 * when the window elapses. One query is outstanding at a time.
 *
 * Time is discrete model units. The clock advances by PollInterval; the timers
 * (lease expiry, refresh lead, negative-cache expiry, query timeout, stale
 * window) are absolute deadlines against the same clock. TimeBound caps the
 * model horizon so the state space is finite.
 *)

EXTENDS Integers, FiniteSets

CONSTANTS
    MaxRetries,      \* retries before resolution gives up
    TTL,             \* abstract effective TTL of a fresh lease (model units)
    NegTTL,          \* abstract negative-cache lease
    QueryTimeout,    \* a query with no answer within this window is failed
    StaleMax,        \* stale window before the lease gives up
    PollInterval,    \* tick cadence
    TimeBound        \* model horizon for the advancing clock

Candidates == {"c1", "c2", "c3", "c4", "c5", "c6", "c7", "c8"}

(* The hint sets a valid answer may carry: every size from one to the cap, so
 * the MaxHints invariant is exercised without the SUBSET blow-up. *)
PickHints == { {"c1"}, {"c1", "c2"}, {"c1", "c2", "c3"}, {"c1", "c2", "c3", "c4"},
               {"c1", "c2", "c3", "c4", "c5"}, {"c1", "c2", "c3", "c4", "c5", "c6"},
               {"c1", "c2", "c3", "c4", "c5", "c6", "c7"},
               {"c1", "c2", "c3", "c4", "c5", "c6", "c7", "c8"} }

VARIABLES
    state, now, hints,
    expire, refreshAt, negExpire, staleSince,
    retries, queryOut, querySentAt, nextRetry

States == {"Unresolved", "Resolving", "Valid", "Refreshing",
           "Stale", "Negative", "Failed", "Expired"}

vars == <<state, now, hints, expire, refreshAt, negExpire, staleSince,
          retries, queryOut, querySentAt, nextRetry>>

Init ==
    /\ state = "Unresolved"
    /\ now = 0
    /\ hints = {}
    /\ retries = 0
    /\ queryOut = FALSE
    /\ querySentAt = 0
    /\ nextRetry = 0
    /\ expire = 0
    /\ refreshAt = 0
    /\ negExpire = 0
    /\ staleSince = 0

Tick ==
    /\ now < TimeBound
    /\ now' = now + PollInterval
    /\ UNCHANGED <<state, hints, expire, refreshAt, negExpire, staleSince,
                   retries, queryOut, querySentAt, nextRetry>>

(* A fresh query leaves a state that holds no live query: the first resolve, a
 * retry after a failure, a negative lease that expired, or a failed/expired
 * lease whose backoff elapsed. Retries are counted by FailQuery, not here. *)
StartResolve ==
    /\ ~queryOut
    /\ \/ state = "Unresolved"
       \/ (state = "Negative" /\ now >= negExpire)
       \/ (state = "Failed" /\ now >= nextRetry)
       \/ (state = "Expired" /\ now >= nextRetry)
       \/ state = "Resolving"
    /\ state' = "Resolving"
    /\ retries' = IF state = "Resolving" THEN retries ELSE 0
    /\ queryOut' = TRUE
    /\ querySentAt' = now
    /\ UNCHANGED <<now, hints, expire, refreshAt, negExpire, staleSince, nextRetry>>

(* A valid answer renews the lease: a nonempty hint set, an expiry, and a
 * refresh scheduled before that expiry (RFC 8767 lead). *)
RcvValid ==
    /\ queryOut
    /\ state \in {"Resolving", "Refreshing", "Stale"}
    /\ hints' \in PickHints
    /\ expire' = now + TTL
    /\ refreshAt' = now + TTL - TTL \div 2
    /\ staleSince' = 0
    /\ retries' = 0
    /\ queryOut' = FALSE
    /\ state' = "Valid"
    /\ UNCHANGED <<now, negExpire, querySentAt, nextRetry>>

(* NXDOMAIN or NODATA with an SOA: the name is gone, the hint set drops. *)
RcvNegative ==
    /\ queryOut
    /\ state \in {"Resolving", "Refreshing"}
    /\ hints' = {}
    /\ negExpire' = now + NegTTL
    /\ queryOut' = FALSE
    /\ state' = "Negative"
    /\ UNCHANGED <<now, expire, refreshAt, staleSince, retries, querySentAt, nextRetry>>

(* A query failed (timeout or a negative RCODE): with hints servable the lease
 * goes stale and keeps serving the last-known candidates; without hints it
 * retries and, once the retries are exhausted, fails. *)
FailQuery ==
    /\ queryOut
    /\ state \in {"Resolving", "Refreshing"}
    /\ now >= querySentAt + QueryTimeout
    /\ queryOut' = FALSE
    /\ now' = now
    /\ hints' = hints
    /\ expire' = expire
    /\ refreshAt' = refreshAt
    /\ negExpire' = negExpire
    /\ querySentAt' = querySentAt
    /\ IF hints = {} THEN
           IF retries >= MaxRetries THEN
               /\ state' = "Failed"
               /\ nextRetry' = now + QueryTimeout
               /\ retries' = retries
               /\ staleSince' = staleSince
           ELSE
               /\ state' = "Resolving"
               /\ nextRetry' = now + QueryTimeout
               /\ retries' = retries + 1
               /\ staleSince' = staleSince
       ELSE
           /\ state' = "Stale"
           /\ nextRetry' = now + 4 * QueryTimeout
           /\ staleSince' = IF staleSince = 0 THEN now ELSE staleSince
           /\ retries' = retries

(* A valid lease schedules its refresh before its expiry. *)
RefreshDue ==
    /\ state = "Valid"
    /\ now >= refreshAt
    /\ state' = "Refreshing"
    /\ queryOut' = TRUE
    /\ querySentAt' = now
    /\ UNCHANGED <<now, hints, expire, refreshAt, negExpire, staleSince, retries, nextRetry>>

(* While stale, the lease intermittently re-resolves without leaving stale. *)
StaleRetry ==
    /\ state = "Stale"
    /\ now >= nextRetry
    /\ queryOut' = TRUE
    /\ querySentAt' = now
    /\ nextRetry' = now + 4 * QueryTimeout
    /\ UNCHANGED <<now, hints, expire, refreshAt, negExpire, staleSince, retries, state>>

(* The stale window elapses: give up and drop the hints. A stale-retry query in
 * flight is abandoned (single-flight: an abandoned query is no longer tracked). *)
StaleGiveUp ==
    /\ state = "Stale"
    /\ now >= staleSince + StaleMax
    /\ state' = "Expired"
    /\ hints' = {}
    /\ nextRetry' = now + QueryTimeout
    /\ queryOut' = FALSE
    /\ UNCHANGED <<now, expire, refreshAt, negExpire, staleSince, retries, querySentAt>>

(* A cached negative lease expires. *)
NegExpire ==
    /\ state = "Negative"
    /\ now >= negExpire
    /\ state' = "Resolving"
    /\ queryOut' = TRUE
    /\ querySentAt' = now
    /\ UNCHANGED <<now, hints, expire, refreshAt, negExpire, staleSince, retries, nextRetry>>

(* The tunnel signals collapse: force a refresh immediately from any state. *)
ForceRefresh ==
    /\ state \notin {"Resolving", "Refreshing"}
    /\ queryOut' = TRUE
    /\ querySentAt' = now
    /\ state' = IF hints = {} THEN "Resolving" ELSE "Refreshing"
    /\ UNCHANGED <<now, hints, expire, refreshAt, negExpire, staleSince, retries, nextRetry>>

Next == Tick \/ StartResolve \/ RcvValid \/ RcvNegative \/ FailQuery \/
       RefreshDue \/ StaleRetry \/ StaleGiveUp \/ NegExpire \/ ForceRefresh

(* The network is fair: a query eventually gets an answer, valid or negative,
 * and a failed query eventually fails. The tick is not under fairness, so a
 * behavior may stall the clock; the liveness property below does not need it. *)
Spec ==
    Init /\ [][Next]_vars
    /\ SF_vars(StartResolve) /\ SF_vars(RcvValid) /\ SF_vars(RcvNegative)
    /\ SF_vars(FailQuery)

(* --- Safety invariants --- *)

(* Hints are served only from the states that still hold a candidate set. *)
ServingStatesHaveHints ==
    state \in {"Valid", "Refreshing", "Stale"} => hints # {}

NonServingStatesNoHints ==
    hints # {} => state \in {"Valid", "Refreshing", "Stale"}

(* A valid lease's refresh is scheduled before its expiry. *)
RefreshBeforeExpiry ==
    state = "Valid" => refreshAt <= expire

(* At most one query is outstanding. *)
SingleFlight ==
    queryOut => state \in {"Resolving", "Refreshing", "Stale"}

(* An expired lease carries no servable hints. *)
ExpiredDropsHints ==
    state = "Expired" => hints = {}

MaxHints ==
    Cardinality(hints) <= 8

RetriesBounded ==
    retries <= MaxRetries

(* --- Liveness --- *)

(* With a fair network, a resolution eventually settles one way or another. *)
EventuallySettles ==
    <>(state \in {"Valid", "Negative", "Failed"})

====