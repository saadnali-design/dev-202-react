import { createStore, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import rootReducer from "./rootReducer";
import loggerMiddleware from "./middlewares";
import { fetchInitialData } from "./actioncreator";

const STORAGE_KEY = "fifa-world-state-v3";

// Recharge les données sauvegardées (utilisateurs, session, clubs, ...)
const loadState = () => {
    try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (!saved) return undefined;

        const s = JSON.parse(saved);
        return {
            authstate: s.authstate,
            leaguestate: { leagues: s.leagues || [], loading: false, error: null },
            clubstate: { clubs: s.clubs || [] },
            playerstate: { players: s.players || [] },
            matchstate: { matchs: s.matchs || [] }
        };
    } catch {
        return undefined;
    }
};

const preloadedState = loadState();

const store = createStore(
    rootReducer,
    preloadedState,
    applyMiddleware(thunk, loggerMiddleware)
);

// Données initiales : récupérées depuis l'API au premier lancement
const hasSavedData = (preloadedState?.leaguestate?.leagues?.length || 0) > 0;
if (!hasSavedData) {
    store.dispatch(fetchInitialData());
}

store.subscribe(() => {
    try {
        const s = store.getState();
        localStorage.setItem(STORAGE_KEY, JSON.stringify({
            authstate: s.authstate,
            leagues: s.leaguestate.leagues,
            clubs: s.clubstate.clubs,
            players: s.playerstate.players,
            matchs: s.matchstate.matchs
        }));
    } catch {
        // stockage indisponible : on ignore
    }
});

export default store;
