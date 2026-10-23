
export default function Carterecette(props) {
    const recette = props.recette;

    return (
        <div className="carte-recette" style={{padding:'20px'}}>
            {recette.img && (
                <img src={recette.img} alt={recette.nom} style={{    width:'100px',
    height:'100px'}} />
            )}

            <div className="infos-recette">
                <h3>{recette.nom}</h3>
                <span>{recette.categorie}</span>
            </div>

            <p>Description : {recette.description}</p>

            <h4>Ingrédients :</h4>
            <ul>
                {recette.ingredients.map((e, index) => (
                    <li key={index}>{e}</li>
                ))}
            </ul>

            <p>
                Difficulté : {recette.niveau}/5
                {" 🔥".repeat(recette.niveau)}
            </p>

            <p>Créée : {recette.date}</p>

            <div className="actions-recette">
                <button onClick={() => props.modifier(recette.id)}>
                    Modifier
                </button>

                <button onClick={() => props.dupliquer(recette.id)}>
                    Dupliquer
                </button>

                <button onClick={() => props.supprimer(recette.id)}>
                    Supprimer
                </button>
            </div>
        </div>
    );
}
