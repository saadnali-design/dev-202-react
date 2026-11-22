import {
    ADD_LEAGUE, UPDATE_LEAGUE, DELETE_LEAGUE, GET_LEAGUES,
    FETCH_LEAGUES_REQUEST, FETCH_LEAGUES_SUCCESS, FETCH_LEAGUES_FAILURE
} from "./actionstype";

const initialState = {
    leagues: [],
    loading: false,
    error: null
};

export default function leagueReducer(state = initialState, action) {
    switch (action.type) {

        case ADD_LEAGUE:
            return {
                ...state,
                leagues: [...state.leagues, action.payload]
            };

        case UPDATE_LEAGUE:
            return {
                ...state,
                leagues: state.leagues.map(l =>
                    l.id === action.payload.id ? action.payload : l
                )
            };

        case DELETE_LEAGUE:
            return {
                ...state,
                leagues: state.leagues.filter(l => l.id !== action.payload)
            };

        case GET_LEAGUES:
            return {
                ...state,
                leagues: Array.isArray(action.payload) ? action.payload : []
            };

        case FETCH_LEAGUES_REQUEST:
            return { ...state, loading: true, error: null };

        // Les championnats reçus de l'API (déjà normalisés) remplacent la liste
        case FETCH_LEAGUES_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                leagues: Array.isArray(action.payload) ? action.payload : []
            };

        case FETCH_LEAGUES_FAILURE:
            return { ...state, loading: false, error: action.payload };

        default:
            return state;
    }
}
