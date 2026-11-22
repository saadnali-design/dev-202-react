
import { useSelector, useDispatch } from "react-redux";
import { deleteexpense } from "../Redux/actioncreator";

export default function Table() {

    const expenses = useSelector(state => state.expensestate.expenses);
    const dispatch = useDispatch();

    function supprimer(id) {
        dispatch(deleteexpense(id));
    }

    return (
        <div>
            <table border="1">
                <thead>
                    <tr>
                        <th>Titre</th>
                        <th>Montant</th>
                        <th>Supprimer</th>
                    </tr>
                </thead>

                <tbody>
                    {expenses.map((e, index) => (
                        <tr key={e.id}>
                            <td>{e.titre}</td>
                            <td>{e.montant} DH</td>
                            <td>
                                <button onClick={() => supprimer(e.id)}>
                                    Supprimer
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
