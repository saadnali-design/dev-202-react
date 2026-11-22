import {
    ADD_PLAYER, UPDATE_PLAYER, DELETE_PLAYER, GET_PLAYERS, DELETE_CLUB
} from "./actionstype";

const initialState = {
    players: []
};

export default function playerReducer(state = initialState, action) {
    switch (action.type) {

        case ADD_PLAYER:
            return {
                ...state,
                players: [...state.players, action.payload]
            };

        case UPDATE_PLAYER:
            return {
                ...state,
                players: state.players.map(p =>
                    p.id === action.payload.id ? action.payload : p
                )
            };

        case DELETE_PLAYER:
            return {
                ...state,
                players: state.players.filter(p => p.id !== action.payload)
            };

        // Quand un club est supprimé, ses joueurs le sont aussi
        case DELETE_CLUB:
            return {
                ...state,
                players: state.players.filter(p => p.clubId !== action.payload)
            };

        case GET_PLAYERS:
            return {
                ...state,
                players: Array.isArray(action.payload) ? action.payload : []
            };

        default:
            return state;
    }
}
