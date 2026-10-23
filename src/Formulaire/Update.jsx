
import { useState } from "react";

export default function Update(props) {
    const [nom, setnom] = useState(props.stagaire.nom);
    const [pre, setpre] = useState(props.stagaire.prenom);
    const [fil, setfil] = useState(props.stagaire.filiere);

    function modifierStagaire(e) {
        e.preventDefault();

        let stagaireModifie = {
            id: props.stagaire.id,
            nom: nom,
            prenom: pre,
            filiere: fil
        };

        props.enregistrer(stagaireModifie);
    }

    return (
        <div>
            <h3>Modifier un stagiaire</h3>

            <form onSubmit={modifierStagaire}>
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

                <button type="submit">Enregistrer</button>

                <button
                    type="button"
                    onClick={props.annuler}
                >
                    Annuler
                </button>
            </form>
        </div>
    );
}
