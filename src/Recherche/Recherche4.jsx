
export default function Recherche4(props) {
    return (
        <div style={{margin:'auto', textAlign: 'center'}}>
            <h3>Résultats :</h3>

            {props.liste.length === 0 ? (
                <p>Aucun produit trouvé</p>
            ) : (
                props.liste.map((e, key) => (
                    <div key={key}>
                        {e.nom} - {e.type}
                    </div>
                ))
            )}
        </div>
    );
}
