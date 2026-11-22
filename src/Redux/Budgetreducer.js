import { SET_BUDGET } from "./actiontype";

const initial_state = {
    budget: []
};

const budgetreducer = (state = initial_state, action) => {
    switch (action.type) {
        case SET_BUDGET:
            return {
                ...state,
                budget: [...state.budget,action.payload]
            };

        default:
            return state;
    }
};

export default budgetreducer;