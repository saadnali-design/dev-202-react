
import { useDispatch, useSelector } from "react-redux";
import { addexpense, setbudget } from "../Redux/actioncreator";
import { useState } from "react";

export default function Formulaire() {

    const [budget, setBudgetValue] = useState("");
    const [titexp, settitexp] = useState("");
    const [monexp, setmonexp] = useState("");

    const ids = useSelector(state => state.expensestate.expenses).length + 1;

    const dispatch = useDispatch();

    function ajouterbudget(b) {
        dispatch(setbudget(Number(b)));
        setBudgetValue("");
    }

    function ajouterexpense(t, m) {
        const obj = {
            id: ids,
            titre: t,
            montant: Number(m)
        };

        dispatch(addexpense(obj));

        settitexp("");
        setmonexp("");
    }

    return (
        <div>
            <h3>Ajouter Budget</h3>

            <input
                type="number"
                value={budget}
                onChange={(e) => setBudgetValue(e.target.value)}
            />

            <button onClick={() => ajouterbudget(budget)}>
                Ajouter Budget
            </button>

            <h3>Ajouter Expense</h3>

            <label>Titre expense</label>

            <input
                type="text"
                value={titexp}
                onChange={(e) => settitexp(e.target.value)}
            />

            <label>Montant expense</label>

            <input
                type="number"
                value={monexp}
                onChange={(e) => setmonexp(e.target.value)}
            />

            <button onClick={() => ajouterexpense(titexp, monexp)}>
                Ajouter Expense
            </button>
        </div>
    );
}
