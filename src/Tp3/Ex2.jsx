
import { useState } from 'react';
import Ex2a from './Ex2a';
import Ex2b from './Ex2b';

export default function Ex2() {
    const moods = [
        { label: '😊 heureux', value: 'heureux', color: '#ffeb3b' },
        { label: '😴 fatigue', value: 'fatigue', color: '#81d4fa' },
        { label: '😡 stresse', value: 'stresse', color: '#ef9a9a' },
        { label: '😎 motive', value: 'motive', color: '#a5d6a7' }
    ];

    const [humeur, sethumeur] = useState({
        value: '',
        label: '',
        color: ''
    });

    const [historique, sethistorique] = useState([]);

    function ajouter(a) {
        sethumeur(a);
        sethistorique([...historique, a]);
    }

    function renisialiser(e) {
        e.preventDefault();
        sethumeur({
            value: '',
            label: '',
            color: ''
        });
    }

    function effacer(e) {
        e.preventDefault();
        sethistorique([]);
    }

    return (
        <div>
            {moods.map((a, key) => (
                <div key={key}>
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            ajouter(a);
                        }}
                        style={{ backgroundColor: a.color }}
                    >
                        {a.label}
                    </button>
                </div>
            ))}

            <Ex2a
                value={humeur.value}
                label={humeur.label}
                color={humeur.color}
            />

            <Ex2b historique={historique} />

            <button onClick={renisialiser}>
                🔄 Réinitialiser
            </button>

            <button onClick={effacer}>
                🗑️ Effacer l'historique
            </button>
        </div>
    );
}
