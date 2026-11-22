import axios from "axios";
import {
    LOGIN, REGISTER, LOGOUT,
    ADD_LEAGUE, UPDATE_LEAGUE, DELETE_LEAGUE, GET_LEAGUES,
    ADD_CLUB, UPDATE_CLUB, DELETE_CLUB, GET_CLUBS,
    ADD_PLAYER, UPDATE_PLAYER, DELETE_PLAYER, GET_PLAYERS,
    ADD_MATCH, UPDATE_MATCH, DELETE_MATCH, GET_MATCHS,
    FETCH_LEAGUES_REQUEST, FETCH_LEAGUES_SUCCESS, FETCH_LEAGUES_FAILURE
} from "./actionstype";

// AUTH
export const register = (user) => ({ type: REGISTER, payload: user });
export const login = (user) => ({ type: LOGIN, payload: user });
export const logout = () => ({ type: LOGOUT });

// LEAGUES
export const addlea = (obj) => ({ type: ADD_LEAGUE, payload: obj });
export const updatelea = (obj) => ({ type: UPDATE_LEAGUE, payload: obj });
export const getleas = (data) => ({ type: GET_LEAGUES, payload: data });

const deleteleaAction = (id) => ({ type: DELETE_LEAGUE, payload: id });

// Suppression d'un championnat : on supprime d'abord ses clubs
// (les joueurs et matchs de ces clubs sont supprimés par les reducers).
export const deletelea = (id) => (dispatch, getState) => {
    const clubs = getState().clubstate?.clubs || [];
    clubs
        .filter(c => c.leagueId === id)
        .forEach(c => dispatch(deleteclub(c.id)));
    dispatch(deleteleaAction(id));
};

// CLUBS
export const addclub = (obj) => ({ type: ADD_CLUB, payload: obj });
export const updateclub = (obj) => ({ type: UPDATE_CLUB, payload: obj });
export const deleteclub = (id) => ({ type: DELETE_CLUB, payload: id });
export const getclubs = (data) => ({ type: GET_CLUBS, payload: data });

// PLAYERS
export const addplayer = (obj) => ({ type: ADD_PLAYER, payload: obj });
export const updateplayer = (obj) => ({ type: UPDATE_PLAYER, payload: obj });
export const deleteplayer = (id) => ({ type: DELETE_PLAYER, payload: id });
export const getplayers = (data) => ({ type: GET_PLAYERS, payload: data });

// MATCHS
export const addmatch = (obj) => ({ type: ADD_MATCH, payload: obj });
export const updatematch = (obj) => ({ type: UPDATE_MATCH, payload: obj });
export const deletematch = (id) => ({ type: DELETE_MATCH, payload: id });
export const getmatchs = (data) => ({ type: GET_MATCHS, payload: data });

// FETCH LEAGUES
export const fetchLeaguesRequest = () => ({ type: FETCH_LEAGUES_REQUEST });
export const fetchLeaguesSuccess = (data) => ({ type: FETCH_LEAGUES_SUCCESS, payload: data });
export const fetchLeaguesFailure = (error) => ({ type: FETCH_LEAGUES_FAILURE, payload: error });

// ---------------------------------------------------------------------------
// CHARGEMENT DES DONNÉES INITIALES DEPUIS L'API https://worldcup26.ir (axios + thunk)
//   /get/soccer/leagues              -> championnats
//   /get/soccer/{slug}/clubs         -> clubs d'un championnat
//   /get/soccer/{slug}/fixtures      -> matchs d'un championnat
//   /get/soccer/{slug}/clubs/{id}    -> détails d'un club (effectif = joueurs)
// ---------------------------------------------------------------------------
const API = "https://worldcup26.ir/get/soccer";
const MAX_LEAGUES = 3;        // nombre de championnats chargés
const FIXTURES_LIMIT = 40;    // matchs chargés par championnat
const MAX_ROSTER_CLUBS = 8;   // nombre de clubs dont on charge l'effectif

// Extrait un tableau d'une réponse (tableau direct ou objet enveloppe)
const toList = (raw) => {
    if (Array.isArray(raw)) return raw;
    if (!raw || typeof raw !== "object") return [];
    const keys = ["data", "items", "leagues", "clubs", "events", "fixtures",
        "matches", "athletes", "players", "roster", "squad"];
    for (const k of keys) {
        if (Array.isArray(raw[k])) return raw[k];
        if (raw[k] && typeof raw[k] === "object") {
            const inner = toList(raw[k]);
            if (inner.length) return inner;
        }
    }
    return [];
};

// L'application utilise des id numériques : on convertit les id de l'API
const makeIdMapper = () => {
    const map = new Map();
    let counter = 1000000;
    return (key) => {
        const k = String(key);
        if (!map.has(k)) {
            const n = Number(key);
            map.set(k, key !== "" && key !== null && key !== undefined && Number.isFinite(n) ? n : ++counter);
        }
        return map.get(k);
    };
};

const toDateString = (value) => {
    const d = new Date(value);
    return Number.isNaN(d.getTime()) ? "" : d.toISOString().slice(0, 10);
};

const mapPosition = (value) => {
    const v = String(value || "").toLowerCase();
    if (/keeper|gk|gardien/.test(v)) return "Gardien";
    if (/def|back|d$/.test(v)) return "Défenseur";
    if (/forward|attack|strik|wing|fw/.test(v)) return "Attaquant";
    return "Milieu";
};

const computeAge = (p) => {
    if (Number(p.age) > 0) return Number(p.age);
    const dob = p.dateOfBirth || p.birthDate || p.birthdate;
    if (!dob) return 25;
    const diff = Date.now() - new Date(dob).getTime();
    return Number.isNaN(diff) ? 25 : Math.max(1, Math.floor(diff / 31557600000));
};

// Lit un match "compatible ESPN" : { date, competitions:[{competitors:[...]}], status }
const parseFixture = (ev) => {
    const comp = ev?.competitions?.[0];
    const competitors = comp?.competitors || ev?.competitors || [];

    let home = competitors.find(c => c.homeAway === "home");
    let away = competitors.find(c => c.homeAway === "away");
    if (!home && ev?.homeTeam) home = { team: ev.homeTeam, score: ev.homeScore };
    if (!away && ev?.awayTeam) away = { team: ev.awayTeam, score: ev.awayScore };
    if (!home || !away) return null;

    const teamOf = (c) => c.team || c;
    const nameOf = (t) => t.displayName || t.name || t.shortDisplayName || "";
    const h = teamOf(home);
    const a = teamOf(away);
    if (h.id === undefined || a.id === undefined) return null;

    const type = ev.status?.type || comp?.status?.type || {};
    const finished = type.state === "post" || type.completed === true || ev.status === "finished";
    const score = (c) => {
        const n = Number(c.score?.value ?? c.score);
        return Number.isFinite(n) ? n : 0;
    };

    return {
        id: ev.id,
        date: toDateString(ev.date || comp?.date),
        finished,
        home: { id: h.id, name: nameOf(h) },
        away: { id: a.id, name: nameOf(a) },
        homeScore: finished ? score(home) : null,
        awayScore: finished ? score(away) : null
    };
};

export const fetchInitialData = () => {
    return async (dispatch) => {
        dispatch(fetchLeaguesRequest());

        try {
            const leaguesRes = await axios.get(`${API}/leagues`, { params: { kind: "club" } });
            const apiLeagues = toList(leaguesRes.data)
                .filter(l => l && l.slug)
                .slice(0, MAX_LEAGUES);

            if (apiLeagues.length === 0) {
                throw new Error("Aucun championnat renvoyé par l'API");
            }

            // Clubs et matchs de chaque championnat (en parallèle)
            const results = await Promise.all(apiLeagues.map(async (lg) => {
                const [clubsRes, fixturesRes] = await Promise.allSettled([
                    axios.get(`${API}/${lg.slug}/clubs`),
                    axios.get(`${API}/${lg.slug}/fixtures`, { params: { status: "all", limit: FIXTURES_LIMIT } })
                ]);
                return {
                    lg,
                    clubs: clubsRes.status === "fulfilled" ? toList(clubsRes.value.data) : [],
                    fixtures: fixturesRes.status === "fulfilled" ? toList(fixturesRes.value.data) : []
                };
            }));

            const leagueId = makeIdMapper();
            const clubId = makeIdMapper();
            const playerId = makeIdMapper();
            const matchId = makeIdMapper();
            const year = new Date().getFullYear();

            const leagues = [];
            const clubsMap = new Map();   // apiId -> club de l'application
            const matchs = [];

            const ensureClub = (apiId, name, league) => {
                const key = String(apiId);
                if (!clubsMap.has(key)) {
                    clubsMap.set(key, {
                        id: clubId(apiId),
                        name: name || `Club ${apiId}`,
                        country: league.country || "",
                        leagueId: league.id,
                        apiId,
                        slug: league.slug
                    });
                }
                return clubsMap.get(key);
            };

            results.forEach(({ lg, clubs, fixtures }) => {
                const league = {
                    id: leagueId(lg.id ?? lg.slug),
                    name: lg.name || lg.abbreviation || lg.slug,
                    country: lg.country || "",
                    season: String(year),
                    year,
                    statistics: { matchs: 0, clubs: 0 },
                    status: "active",
                    slug: lg.slug
                };
                leagues.push(league);

                clubs.forEach(c => {
                    if (c && c.id !== undefined) {
                        ensureClub(c.id, c.displayName || c.name || c.shortDisplayName, league);
                    }
                });

                fixtures.forEach(ev => {
                    const f = parseFixture(ev);
                    if (!f) return;
                    const home = ensureClub(f.home.id, f.home.name, league);
                    const away = ensureClub(f.away.id, f.away.name, league);
                    matchs.push({
                        id: matchId(f.id ?? `${league.id}-${home.id}-${away.id}-${f.date}`),
                        leagueId: league.id,
                        homeClubId: home.id,
                        awayClubId: away.id,
                        date: f.date,
                        status: f.finished ? "Terminé" : "À venir",
                        homeScore: f.homeScore,
                        awayScore: f.awayScore
                    });
                });
            });

            const clubs = Array.from(clubsMap.values());

            // Joueurs : effectif de quelques clubs (détails d'un club)
            const rosterResults = await Promise.allSettled(
                clubs.slice(0, MAX_ROSTER_CLUBS).map(c =>
                    axios.get(`${API}/${c.slug}/clubs/${c.apiId}`).then(res => ({ club: c, data: res.data }))
                )
            );

            const players = [];
            rosterResults.forEach(r => {
                if (r.status !== "fulfilled") return;
                const { club, data } = r.value;
                const roster = data?.roster ?? data?.athletes ?? data?.players ?? data?.squad ?? data?.club?.roster;
                toList(roster).forEach(item => {
                    const p = item?.athlete || item;
                    const name = p?.displayName || p?.fullName || p?.name;
                    if (!name) return;
                    const pos = p.position?.displayName || p.position?.name || p.position?.abbreviation || p.position;
                    players.push({
                        id: playerId(p.id ?? `${club.id}-${name}`),
                        name,
                        age: computeAge(p),
                        position: mapPosition(pos),
                        clubId: club.id
                    });
                });
            });

            // Statistiques des championnats
            leagues.forEach(l => {
                l.statistics = {
                    matchs: matchs.filter(m => m.leagueId === l.id).length,
                    clubs: clubs.filter(c => c.leagueId === l.id).length
                };
            });

            dispatch(getclubs(clubs));
            dispatch(getplayers(players));
            dispatch(getmatchs(matchs));
            dispatch(fetchLeaguesSuccess(leagues));

        } catch (error) {
            dispatch(fetchLeaguesFailure(error.message));
        }
    };
};
