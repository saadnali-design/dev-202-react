
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deletepotion, changerfavorite as changerfavoriteAction } from "../redux/action";

export default function Liste() {

    const dispatch = useDispatch();
    const potions = useSelector(state => state.potions);

    function supprimer(id) {
        dispatch(deletepotion(id));
        if (window.confirm("Voulez-vous vraiment supprimer cette potion ?")) {
            dispatch(deletepotion(id));
        }
    }

    function changerFavorite(id) {
        dispatch(changerfavoriteAction(id));
    }

    const [rech, setrech] = useState(potions);
    const [rein, setrein] = useState("");

    useEffect(() => {
        setrech(potions);
    }, [potions]);

    function toute() {
        setrech(potions);
        setrein("");
    }

    function filter(c) {
        setrein("");
        setrech(potions.filter(e => e.categorie === c));
    }

    function changerinput(valeur) {
        setrein(valeur);
        setrech(potions.filter(e =>
            e.nom.toLowerCase().includes(valeur.toLowerCase())
        ));
    }

    function prixc() {
        setrech([...rech].sort((a, b) => a.prix - b.prix));
    }

    function prixd() {
        setrech([...rech].sort((a, b) => b.prix - a.prix));
    }

    return (
        <div style={{
            background: "#f0e9dc",
            padding: "30px",
            minHeight: "400px"
        }}>

            <h2 style={{
                color: "#35204d",
                textAlign: "center",
                letterSpacing: "2px",
                marginBottom: "25px"
            }}>
                🧪 COLLECTION DES POTIONS
            </h2>

            {/* Partie recherche */}

            <div style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                gap: "12px",
                marginBottom: "30px"
            }}>

                <button onClick={toute} style={styleButton}>
                    Toutes
                </button>

                {[...new Set(potions.map(e => e.categorie))].map((c, index) => (
                    <button key={index} onClick={() => filter(c)} style={styleButton}>
                        {c}
                    </button>
                ))}

                <input
                    type="text"
                    value={rein}
                    onChange={(e) => changerinput(e.target.value)}
                    placeholder="🔍 Rechercher par nom"
                    style={styleInput}
                />

                <button onClick={prixc} style={styleButton}>
                    Prix ↑
                </button>

                <button onClick={prixd} style={styleButton}>
                    Prix ↓
                </button>
            </div>

            {/* Partie cartes */}

            <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                gap: "20px"
            }}>

                {rech.map((e, index) => (
                    <div
                        key={e.id}
                        style={{
                            background: "#241832",
                            color: "#f5e6b3",
                            border: e.favorite ? "2px solid gold" : "1px solid #8b779e",
                            borderRadius: "12px",
                            padding: "20px",
                            textAlign: "center",
                            boxShadow: "0 4px 12px rgba(0,0,0,0.25)"
                        }}
                    >

                        <div style={{ fontSize: "35px" }}>
                            {e.categorie === "soin" ? "❤️" :
                             e.categorie === "magie" ? "✨" : "🛡️"}
                        </div>

                        <button
                            onClick={() => changerFavorite(e.id)}
                            style={{
                                background: "transparent",
                                border: "none",
                                color: "#e0c878",
                                fontSize: "25px",
                                cursor: "pointer"
                            }}
                        >
                            {e.favorite ? "★" : "☆"}
                        </button>

                        <h3 style={{ color: "#e0c878" }}>{e.nom}</h3>

                        <p>Catégorie : {e.categorie}</p>
                        <p>Rareté : {e.rarete}</p>

                        <p style={{
                            color: "#e0c878",
                            fontWeight: "bold",
                            fontSize: "18px"
                        }}>
                            🪙 {e.prix} po
                        </p>

                        <button
                            onClick={() => supprimer(e.id)}
                            style={{
                                background: "#8b2635",
                                color: "white",
                                border: "1px solid #c9a84c",
                                borderRadius: "7px",
                                padding: "9px 18px",
                                cursor: "pointer",
                                marginTop: "10px"
                            }}
                        >
                            🗑️ Supprimer
                        </button>

                    </div>
                ))}

            </div>

            {rech.length === 0 && (
                <p style={{
                    textAlign: "center",
                    color: "#35204d",
                    fontSize: "18px",
                    marginTop: "30px"
                }}>
                    🔮 Aucune potion trouvée !
                </p>
            )}

        </div>
    );
}

const styleButton = {
    background: "#35204d",
    color: "#e0c878",
    border: "1px solid #c9a84c",
    borderRadius: "7px",
    padding: "10px 18px",
    cursor: "pointer",
    fontWeight: "bold"
};

const styleInput = {
    padding: "10px",
    borderRadius: "7px",
    border: "1px solid #c9a84c",
    background: "#fffaf0",
    outline: "none"
};
