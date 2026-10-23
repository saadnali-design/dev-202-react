
export default function Recherche3(props) {
    return (
        <div>
            <select onChange={(e) => props.afficherselect(e.target.value)}>
                <option value="">Tous les produits</option>

                {props.liste
                    .filter((e, index) =>
                        props.liste.findIndex(p => p.type === e.type) === index
                    )
                    .map((e, key) => (
                        <option key={key} value={e.type}>
                            {e.type}
                        </option>
                    ))}
            </select>
        </div>
    );
}
