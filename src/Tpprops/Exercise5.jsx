
import { useState } from "react";

export default function Exercise5() {
    let movies = ['Inception', 'Interstellar', 'The Dark Knight'];

    const [m, setm] = useState(movies);
    const [movie, setmovie] = useState('');

    function afficher(e) {
        e.preventDefault();

        if (movie.trim() !== '') {
            setm([...m, movie]);
            setmovie('');
        } else {
            alert('Tu dois saisir le nom du film');
        }
    }

    function supprimer(index) {
        setm(m.filter((e, i) => i !== index));
    }

    return (
        <div>
            <form onSubmit={afficher}>
                <input
                    type="text"
                    value={movie}
                    onChange={(e) => setmovie(e.target.value)}
                />

                <button type="submit">Envoyer</button>
            </form>

            <div>
                {m.map((e, index) => (
                    <div key={index}>
                        {e} :
                        <button onClick={() => supprimer(index)}>
                            Supprimer
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
