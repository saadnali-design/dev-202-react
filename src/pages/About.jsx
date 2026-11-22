
export default function About() {
    return (
        <div style={{
            backgroundColor: "#F5F6F0",
            minHeight: "70vh",
            padding: "50px 20px"
        }}>
            <div style={{
                maxWidth: "850px",
                margin: "auto",
                backgroundColor: "white",
                padding: "40px",
                borderRadius: "15px",
                boxShadow: "0 4px 15px rgba(0,0,0,0.06)"
            }}>
                <h1 style={{ color: "#0B3D2E", fontSize: "32px" }}>
                    About FIFA World
                </h1>

                <p style={{ color: "#666", lineHeight: "1.9", fontSize: "16px" }}>
                    FIFA World est une application de gestion du football.
                    Elle permet de centraliser les informations des championnats,
                    des clubs, des joueurs et des matchs.
                </p>

                <p style={{ color: "#666", lineHeight: "1.9", fontSize: "16px" }}>
                    Les administrateurs peuvent ajouter, modifier, supprimer
                    et consulter les différentes informations. Ils peuvent
                    également organiser les matchs et suivre leurs résultats.
                </p>

                <div style={{
                    marginTop: "25px",
                    padding: "20px",
                    backgroundColor: "#E8F0E9",
                    borderRadius: "10px"
                }}>
                    <h3 style={{ color: "#0B3D2E" }}>Notre objectif</h3>
                    <p style={{ color: "#555", marginBottom: 0 }}>
                        Faciliter la gestion des compétitions et améliorer
                        l'organisation des activités footballistiques.
                    </p>
                </div>
            </div>
        </div>
    );
}
