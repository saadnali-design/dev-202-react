
import { useState } from "react";
import Recherche2 from './Recherche2';
import Recherche3 from './Recherche3';
import Recherche4 from './Recherche4';

export default function Recherche1() {
    let list = [
        { nom: "banane", type: "fruit" },
        { nom: "orange", type: "fruit" },
        { nom: "pomme", type: "fruit" },
        { nom: "raisins", type: "fruit" },
        { nom: "kiwi", type: "fruit" },
        { nom: "tomate", type: "legume" },
        { nom: "carotte", type: "legume" },
        { nom: "pomme de terre", type: "legume" },
        { nom: "navet", type: "legume" },
        { nom: "poivron", type: "legume" }
    ];

    const [liste, setliste] = useState(list);

    function affichernom(name) {
        setliste(
            list.filter(e =>
                e.nom.toLowerCase().includes(name.toLowerCase())
            )
        );
    }

    function afficherselect(type) {
        if (type === '') {
            setliste(list);
        } else {
            setliste(list.filter(e => e.type === type));
        }
    }

    return (
        <div>
            <Recherche2 affichernom={affichernom} />
            <Recherche3 afficherselect={afficherselect} liste={list} />
            <Recherche4 liste={liste} />
        </div>
    );
}
