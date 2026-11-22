import {
    ADD_CLUB, UPDATE_CLUB, DELETE_CLUB, GET_CLUBS, DELETE_LEAGUE
} from "./actionstype";

const initialState = {
    clubs: []
};

export default function clubReducer(state = initialState, action) {
    switch (action.type) {

        case ADD_CLUB:
            return {
                ...state,
                clubs: [...state.clubs, action.payload]
            };

        case UPDATE_CLUB:
            return {
                ...state,
                clubs: state.clubs.map(c =>
                    c.id === action.payload.id ? action.payload : c
                )
            };

        case DELETE_CLUB:
            return {
                ...state,
                clubs: state.clubs.filter(c => c.id !== action.payload)
            };

        // Sécurité : plus aucun club sans championnat
        case DELETE_LEAGUE:
            return {
                ...state,
                clubs: state.clubs.filter(c => c.leagueId !== action.payload)
            };

        case GET_CLUBS:
            return {
                ...state,
                clubs: Array.isArray(action.payload) ? action.payload : []
            };

        default:
            return state;
    }
}
