import { LOGIN, REGISTER, LOGOUT } from "./actionstype";

const initialState = {
    user: null,
    users: [],
    isAuthenticated: false
};

export default function authReducer(state = initialState, action) {
    switch (action.type) {

        case REGISTER:
            return {
                ...state,
                users: [...state.users, action.payload]
            };

        case LOGIN:
            return {
                ...state,
                user: action.payload,
                isAuthenticated: true
            };

        case LOGOUT:
            return {
                ...state,
                user: null,
                isAuthenticated: false
            };

        default:
            return state;
    }
}
