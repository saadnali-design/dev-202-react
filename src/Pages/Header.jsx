
import { useSelector } from "react-redux";

export default function Header() {

    const budget = useSelector(state => state.budgetstate.budget).reduce((total,e)=>e+total,0)

    const expenses = useSelector(state => state.expensestate.expenses);

    const montantexpenses = expenses.reduce(
        (total, e) => total + e.montant, 0
    );

    const ecart = budget - montantexpenses;

    return (
        <div>
            <h1>CALCULATEUR DE BUDGET</h1>

            <div>Budget : {budget} DH</div>

            <div>Expenses : {montantexpenses} DH</div>

            <div style={ecart >= 0 ?
                { backgroundColor: "green" } :
                { backgroundColor: "red" }
            }>
                Ecart : {ecart} DH
            </div>
        </div>
    );
}
