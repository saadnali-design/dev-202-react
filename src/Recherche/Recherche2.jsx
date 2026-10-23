
import { useState } from "react";

export default function Recherche2(props) {
    const [val, setval] = useState('');

    return (
        <div>
            <input
                type="text"
                placeholder="Rechercher"
                value={val}
                onChange={(e) => setval(e.target.value)}
            />

            <button onClick={() => props.affichernom(val)}>
                Envoyer
            </button>
        </div>
    );
}
