import {
    ADD_MATCH, UPDATE_MATCH, DELETE_MATCH, GET_MATCHS,
    DELETE_CLUB, DELETE_LEAGUE
} from "./actionstype";

const initialState = {
    matchs: []
};

export default function matchReducer(state = initialState, action) {
    switch (action.type) {

        case ADD_MATCH:
            return {
                ...state,
                matchs: [...state.matchs, action.payload]
            };

        case UPDATE_MATCH:
            return {
                ...state,
                matchs: state.matchs.map(m =>
                    m.id === action.payload.id ? action.payload : m
                )
            };

        case DELETE_MATCH:
            return {
                ...state,
                matchs: state.matchs.filter(m => m.id !== action.payload)
            };

        // Un club supprimé entraîne la suppression de ses matchs
        case DELETE_CLUB:
            return {
                ...state,
                matchs: state.matchs.filter(m =>
                    m.homeClubId !== action.payload && m.awayClubId !== action.payload
                )
            };

        case DELETE_LEAGUE:
            return {
                ...state,
                matchs: state.matchs.filter(m => m.leagueId !== action.payload)
            };

        case GET_MATCHS:
            return {
                ...state,
                matchs: Array.isArray(action.payload) ? action.payload : []
            };

        default:
            return state;
    }
}
