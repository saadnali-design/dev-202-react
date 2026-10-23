
import { useState } from "react";
import Try1 from "./Try1";

export default function Try() {
    let tasks = [
        { id: 5, titre: "Maîtriser UML", statut: "Terminé" },
        { id: 7, titre: "Réviser JS", statut: "En cours" }
    ];

    const [taches, settaches] = useState(tasks);
    const [nvtache, setnvtache] = useState("");

    function ajouter(e) {
        e.preventDefault();

        if (nvtache.trim() !== "") {
            let id = taches.length > 0
                ? Math.max(...taches.map((e) => e.id)) + 1
                : 1;

            let statut = "En cours";
            let tache = { id, titre: nvtache, statut };

            settaches([...taches, tache]);
            setnvtache("");
        } else {
            alert("Tu dois entrer une tâche !");
        }
    }

    function supprimertache(id) {
        settaches(taches.filter((e) => e.id !== id));
    }

    function changerStatut(id) {
        settaches(
            taches.map((e) =>
                e.id === id
                    ? {
                        ...e,
                        statut: e.statut === "Terminé"
                            ? "En cours"
                            : "Terminé"
                    }
                    : e
            )
        );
    }

    let restant = taches.filter(
        (e) => e.statut === "Terminé"
    ).length;

    return (
        <div>
            <form onSubmit={ajouter}>
                <input
                    type="text"
                    value={nvtache}
                    onChange={(e) => setnvtache(e.target.value)}
                />
                <button type="submit">Ajouter</button>
            </form>

            {taches.map((e) => (
                <div key={e.id}>
                    <Try1
                        id={e.id}
                        statutp={e.statut}
                        titrep={e.titre}
                        supprimer={supprimertache}
                        changer={changerStatut}
                    />
                </div>
            ))}

            <span>
                {restant} tâches terminées sur {taches.length} tâches
            </span>
        </div>
    );
}
