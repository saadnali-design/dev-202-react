import { combineReducers } from 'redux';
import expensereducer from './Expensereducer';
import budgetreducer from './Budgetreducer';

const rootbudget = combineReducers({
    budgetstate: budgetreducer,
    expensestate: expensereducer
});

export default rootbudget;