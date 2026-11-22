import { ADD_EXPENSE, DELETE_EXPENSE } from "./actiontype";

const initial_state = {
    expenses: []
};

const expensereducer = (state = initial_state, action) => {
    switch (action.type) {

        case ADD_EXPENSE:
            return {
                ...state,
                expenses: [...state.expenses, action.payload]
            };

        case DELETE_EXPENSE:
            return {
                ...state,
                expenses: state.expenses.filter(
                    (e) => e.id !== action.payload
                )
            };

        default:
            return state;
    }
};

export default expensereducer;