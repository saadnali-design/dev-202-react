
import axios from 'axios';
import { useEffect, useState, useContext, createContext } from 'react';
import Fetchc from './Fetchc';

const usercontext = createContext();

export default function Axios() {
    const [users, setusers] = useState([]);
    const [nom, setnom] = useState('');

    function getusers() {
        axios.get("https://jsonplaceholder.typicode.com/users")
            .then((reponse) => {
                setusers(reponse.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    useEffect(() => {
        setnom('updated');
    }, []);

    return (
        <usercontext.Provider value={nom}>
            <div>
                <button onClick={getusers}>
                    GET USERS : AXIOS
                </button>

                {users.map((user) => (
                    <div key={user.id}>
                        <p style={{ color: 'red' }}>
                            Utilisateur {user.id} :
                        </p>
                        <Fetchc user={user} />
                    </div>
                ))}

                <input
                    type="text"
                    value={nom}
                    onChange={(e) => setnom(e.target.value)}
                />

                <p>{nom}</p>

                <Composant2 />
            </div>
        </usercontext.Provider>
    );
}

function Composant2() {
    return (
        <div>
            Composant 2
            <Composant3 />
        </div>
    );
}

function Composant3() {
    const user = useContext(usercontext);

    return (
        <div>
            Composant 3
            <h2>{`Hello ${user} again !`}</h2>
        </div>
    );
}
