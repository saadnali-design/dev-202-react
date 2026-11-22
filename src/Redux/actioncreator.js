import {SET_BUDGET,ADD_EXPENSE,DELETE_EXPENSE} from "./actiontype"

export const setbudget = (budget) =>{
    return {
        type: "SET_BUDGET",
        payload: budget
    }
}

export const addexpense = (expense) =>{
    return {
        type: "ADD_EXPENSE",
        payload: expense 
    }
}

export const deleteexpense = (id) =>{
    return {
        type: "DELETE_EXPENSE",
        payload: id
    }
}