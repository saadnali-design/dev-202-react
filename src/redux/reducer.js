const initialState = {
    potions: []
};

function reducer(state = initialState, action) {
    switch (action.type) {

        case "ADD_POTION":
            return {
                ...state,
                potions: [...state.potions, action.payload]
            };

        case "DELETE_POTION":
            return {
                ...state,
                potions: state.potions.filter(
                    p => p.id !== action.payload
                )
            };

        case "VIDER" :
            return {
                ...state,
                potions:[]
            }
        
        case "CHANGE_FAVORITE":
            return {
                ...state,
                potions: state.potions.map(p => {
                    if (p.id === action.payload) {
                        p.favorite = !p.favorite;
                    }
                    return p;
                })
            };

        default:
            return state;
    }
}

export default reducer;