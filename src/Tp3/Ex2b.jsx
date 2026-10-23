export default function Ex2b(props) {
    return (
        <div>
            <h3>🎨 Historique des humeurs</h3>

            {props.historique.length === 0 ? (
                <p>Aucune humeur enregistrée.</p>
            ) : (
                props.historique.map((e, key) => (
                    <div
                        key={key}
                        style={{
                            backgroundColor: e.color,
                            padding: '10px',
                            margin: '5px'
                        }}
                    >
                        {e.label}
                    </div>
                ))
            )}
        </div>
    );
}