
export default function Try1(props) {
    return (
        <div>
            <input
                type="checkbox"
                checked={props.statutp === "Terminé"}
                onChange={() => props.changer(props.id)}
            />

            {props.statutp === "Terminé" ? (
                <span style={{ textDecoration: "line-through" }}>
                    {props.titrep}
                </span>
            ) : (
                <span>{props.titrep}</span>
            )}

            <button onClick={() => props.supprimer(props.id)}>
                Supprimer
            </button>
        </div>
    );
}
