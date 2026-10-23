
import { useState } from "react";
import Exercise4a from "./Exercise4a";

export default function Exercise4() {
    const [taches, settaches] = useState([
        { id: 5, texte: "Maîtriser UML", terminee: true },
        { id: 7, texte: "Réviser JS", terminee: false }
    ]);

    const [nouvelleTache, setnouvelleTache] = useState("");

    function ajouter(e) {
        e.preventDefault();

        if (nouvelleTache.trim() !== "") {
            let t = {
                id: Date.now(),
                texte: nouvelleTache,
                terminee: false
            };

            settaches([...taches, t]);
            setnouvelleTache("");
        }
    }

    function basculerTache(id) {
        settaches(
            taches.map((t) =>
                t.id === id
                    ? { ...t, terminee: !t.terminee }
                    : t
            )
        );
    }

    function supprimerTache(id) {
        settaches(taches.filter((t) => t.id !== id));
    }

    let restantes = taches.filter((t) => !t.terminee).length;

    return (
        <div>
            <form onSubmit={ajouter}>
                <input
                    type="text"
                    value={nouvelleTache}
                    onChange={(e) => setnouvelleTache(e.target.value)}
                />

                <button type="submit">Ajouter</button>
            </form>

            {taches.length === 0 ? (
                <p>Aucune tâche pour le moment</p>
            ) : (
                taches.map((t) => (
                    <Exercise4a
                        key={t.id}
                        tache={t}
                        basculerTache={basculerTache}
                        supprimerTache={supprimerTache}
                    />
                ))
            )}

            <p>
                {restantes} tâche(s) restante(s) sur {taches.length}
            </p>
        </div>
    );
}
