import { combineReducers } from "redux";

import authReducer from "./authReducer";
import leagueReducer from "./leagueReducer";
import clubReducer from "./clubReducer";
import playerReducer from "./playerReducer";
import matchReducer from "./matchReducer";

const rootReducer = combineReducers({
    authstate: authReducer,
    leaguestate: leagueReducer,
    clubstate: clubReducer,
    playerstate: playerReducer,
    matchstate: matchReducer
});

export default rootReducer;
