
export default function Exercise4a(props) {
    return (
        <div>
            <input
                type="checkbox"
                checked={props.tache.terminee}
                onChange={() => props.basculerTache(props.tache.id)}
            />

            <span style={{
                textDecoration: props.tache.terminee
                    ? "line-through"
                    : "none"
            }}>
                {props.tache.texte}
            </span>

            <button
                onClick={() => props.supprimerTache(props.tache.id)}
            >
                Supprimer
            </button>
        </div>
    );
}
