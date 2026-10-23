
import { useState } from "react";
import Update from "./Update";

export default function Stagaire() {
    let Stagaires = [
        {
            id: 1,
            nom: "nali",
            prenom: "saad",
            filiere: "dev"
        },
        {
            id: 2,
            nom: "ouhabi",
            prenom: "amina",
            filiere: "id"
        }
    ];

    const [stagaires, setstagaires] = useState(Stagaires);
    const [nom, setnom] = useState("");
    const [pre, setpre] = useState("");
    const [fil, setfil] = useState("");
    const [isclick, setis] = useState(false);
    const [stgUpdate, setstgUpdate] = useState(null);

    function addnewstg(e) {
        e.preventDefault();

        let ids = stagaires.length
            ? Math.max(...stagaires.map(s => s.id)) + 1
            : 1;

        let stagaire = {
            id: ids,
            nom: nom,
            prenom: pre,
            filiere: fil
        };

        setstagaires(stagaires => [...stagaires, stagaire]);
        setis(false);
        setnom("");
        setpre("");
        setfil("");
    }

    function supprimer(ids) {
        setstagaires(stagaires =>
            stagaires.filter(e => e.id !== ids)
        );

        if (stgUpdate && stgUpdate.id === ids) {
            setstgUpdate(null);
        }
    }

    function modifier(stagaire) {
        setstgUpdate(stagaire);
    }

    function enregistrerModification(stagaireModifie) {
        setstagaires(stagaires =>
            stagaires.map(s =>
                s.id === stagaireModifie.id ? stagaireModifie : s
            )
        );

        setstgUpdate(null);
    }

    return (
        <div>
            <h3>La liste des stagiaires :</h3>

            {isclick === false ? (
                <button onClick={() => setis(true)}>
                    Créer un nouveau stagiaire
                </button>
            ) : (
                <form onSubmit={addnewstg}>
                    <input
                        type="text"
                        placeholder="Nom"
                        value={nom}
                        onChange={e => setnom(e.target.value)}
                        required
                    />

                    <input
                        type="text"
                        placeholder="Prénom"
                        value={pre}
                        onChange={e => setpre(e.target.value)}
                        required
                    />

                    <input
                        type="text"
                        placeholder="Filière"
                        value={fil}
                        onChange={e => setfil(e.target.value)}
                        required
                    />

                    <button type="submit">Ajouter</button>

                    <button
                        type="button"
                        onClick={() => setis(false)}
                    >
                        Annuler
                    </button>
                </form>
            )}

            <br />

            <table border={1} style={{ borderCollapse: "collapse" }}>
                <thead>
                    <tr>
                        <th style={{ color: "red" }}>Nom</th>
                        <th style={{ color: "red" }}>Prénom</th>
                        <th style={{ color: "red" }}>Filière</th>
                        <th style={{ color: "red" }}>Action</th>
                    </tr>
                </thead>

                <tbody>
                    {stagaires.map(stagaire => (
                        <tr key={stagaire.id}>
                            <td>{stagaire.nom}</td>
                            <td>{stagaire.prenom}</td>
                            <td>{stagaire.filiere}</td>
                            <td>
                                <button
                                    onClick={() => supprimer(stagaire.id)}
                                >
                                    Supprimer
                                </button>

                                <button
                                    onClick={() => modifier(stagaire)}
                                >
                                    Modifier
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {stgUpdate && (
                <Update
                    stagaire={stgUpdate}
                    enregistrer={enregistrerModification}
                    annuler={() => setstgUpdate(null)}
                />
            )}
        </div>
    );
}
