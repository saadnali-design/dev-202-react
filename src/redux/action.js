export const addpotion = (potion) => {
    return {
        type: "ADD_POTION",
        payload: potion
    };
};

export const deletepotion = (idpotion) => {
    return {
        type: "DELETE_POTION",
        payload: idpotion
    };
};

export const vider = () =>{
    return {
        type : "VIDER"
    }
}

export const changerfavorite=(idpotion)=>{
    return {
        type:"CHANGE_FAVORITE",
        payload:idpotion
    }

}