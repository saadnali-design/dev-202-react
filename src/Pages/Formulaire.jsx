
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addpotion } from "../redux/action";

export default function Formulaire() {

    const [nom, setnom] = useState("");
    const [categorie, setcategorie] = useState("");
    const [rarete, setrarete] = useState("");
    const [prix, setprix] = useState("");

    const dispatch = useDispatch();
    const potions = useSelector(state => state.potions);
    const ids = potions.length + 1;

    function ajouter(e) {
        e.preventDefault();

        if (nom !== "" && categorie !== "" && rarete !== "" && prix !== "") {
            const objpo = {
                id: ids,
                nom: nom,
                categorie: categorie,
                rarete: rarete,
                prix: prix,
                favorite: false
            };

            dispatch(addpotion(objpo));

            setnom("");
            setcategorie("");
            setrarete("");
            setprix("");
        }
        else{
            alert("tu dois remplir tous les champs !!!")
        }
    }

    return (
        <div style={{
            background: "#f0e9dc",
            padding: "30px",
            display: "flex",
            justifyContent: "center"
        }}>
            <form onSubmit={ajouter} style={{
                background: "#241832",
                border: "2px solid #c9a84c",
                borderRadius: "15px",
                padding: "30px",
                width: "350px",
                display: "flex",
                flexDirection: "column",
                gap: "12px",
                boxShadow: "0 5px 20px rgba(0,0,0,0.3)"
            }}>

                <h2 style={{
                    color: "#e0c878",
                    textAlign: "center",
                    letterSpacing: "2px",
                    marginBottom: "15px"
                }}>
                    🧪 Fabriquer une Potion
                </h2>

                <label style={{ color: "#f5e6b3" }}>Nom :</label>
                <input
                    type="text"
                    value={nom}
                    onChange={(e) => setnom(e.target.value)}
                    placeholder="Nom de la potion"
                    style={styleInput}
                />

                <label style={{ color: "#f5e6b3" }}>Catégorie :</label>
                <select
                    value={categorie}
                    onChange={(e) => setcategorie(e.target.value)}
                    style={styleInput}
                >
                    <option value="">Choisir</option>
                    <option value="soin">❤️ Soin</option>
                    <option value="magie">✨ Magie</option>
                    <option value="protection">🛡️ Protection</option>
                </select>

                <label style={{ color: "#f5e6b3" }}>Rareté :</label>
                <select
                    value={rarete}
                    onChange={(e) => setrarete(e.target.value)}
                    style={styleInput}
                >
                    <option value="">Choisir</option>
                    <option value="commune">Commune</option>
                    <option value="rare">Rare</option>
                    <option value="legendaire">Légendaire</option>
                </select>

                <label style={{ color: "#f5e6b3" }}>Prix :</label>
                <input
                    type="number"
                    value={prix}
                    onChange={(e) => setprix(e.target.value)}
                    placeholder="Prix en pièces d'or"
                    min="0"
                    style={styleInput}
                />

                <button type="submit" style={{
                    background: "linear-gradient(135deg, #c9a84c, #e0c878)",
                    color: "#241832",
                    border: "none",
                    borderRadius: "8px",
                    padding: "13px",
                    marginTop: "12px",
                    fontWeight: "bold",
                    fontSize: "15px",
                    cursor: "pointer"
                }}>
                    ✨ Fabriquer la potion
                </button>

            </form>
        </div>
    );
}

const styleInput = {
    padding: "11px",
    borderRadius: "7px",
    border: "1px solid #c9a84c",
    background: "#f5f0e6",
    color: "#241832",
    outline: "none",
    fontSize: "14px"
};
