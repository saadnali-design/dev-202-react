
import { useState } from "react";

export default function Recetteform(props) {
    const [nom, setNom] = useState(props.recette?.nom || "");
    const [categorie, setCategorie] = useState(
        props.recette?.categorie || "Entrée"
    );
    const [ingredients, setIngredients] = useState(
        props.recette ? [...props.recette.ingredients] : [""]
    );
    const [niveau, setNiveau] = useState(props.recette?.niveau || 1);
    const [description, setDescription] = useState(
        props.recette?.description || ""
    );
    const [img, setImg] = useState(props.recette?.img || "");
    const [bool, setBool] = useState(false);
    const [ing, setIng] = useState("");

    function ajouteringredient() {
        if (ing.trim() !== "") {
            setIngredients([...ingredients, ing.trim()]);
            setIng("");
            setBool(false);
        }
    }

    function supprimeringredient(index) {
        setIngredients(ingredients.filter((e, i) => i !== index));
    }

    function modifieringredient(index, valeur) {
        const nouveau = [...ingredients];
        nouveau[index] = valeur;
        setIngredients(nouveau);
    }

    function choisirImage(e) {
        const fichier = e.target.files[0];

        if (fichier) {
            setImg(URL.createObjectURL(fichier));
        }
    }

    function soumettre(e) {
        e.preventDefault();

        const objetrecette = {
            id: props.recette ? props.recette.id : Date.now(),
            nom,
            categorie,
            img,
            description,
            ingredients: ingredients.filter((e) => e.trim() !== ""),
            niveau: Number(niveau),
            date: props.recette
                ? props.recette.date
                : new Date().toISOString().slice(0, 10)
        };

        props.enregistrer(objetrecette);
        props.fermer();
    }

    return (
        <form onSubmit={soumettre} className="form-recette">
            <h2>
                {props.recette ? "Modifier la recette" : "Ajouter une recette"}
            </h2>

            <label>Nom :</label>
            <input
                type="text"
                value={nom}
                onChange={(e) => setNom(e.target.value)}
                required
            />

            <label>Catégorie :</label>
            <select
                value={categorie}
                onChange={(e) => setCategorie(e.target.value)}
            >
                <option value="Entrée">Entrée</option>
                <option value="Plat">Plat</option>
                <option value="Dessert">Dessert</option>
                <option value="Boisson">Boisson</option>
            </select>

            <p>Ingrédients :</p>

            {ingredients.map((e, index) => (
                <div key={index} className="ligne-ingredient">
                    <input
                        type="text"
                        value={e}
                        onChange={(ev) =>
                            modifieringredient(index, ev.target.value)
                        }
                    />

                    <button
                        type="button"
                        onClick={() => supprimeringredient(index)}
                    >
                        Supprimer
                    </button>
                </div>
            ))}

            {bool ? (
                <div>
                    <input
                        type="text"
                        value={ing}
                        placeholder="Nouvel ingrédient"
                        onChange={(e) => setIng(e.target.value)}
                    />
                    <button type="button" onClick={ajouteringredient}>
                        Confirmer
                    </button>
                    <button type="button" onClick={() => setBool(false)}>
                        Annuler
                    </button>
                </div>
            ) : (
                <button type="button" onClick={() => setBool(true)}>
                    Ajouter un ingrédient
                </button>
            )}

            <label>Difficulté : {niveau}/5</label>
            <input
                type="range"
                min="1"
                max="5"
                value={niveau}
                onChange={(e) => setNiveau(Number(e.target.value))}
            />

            <label>Description :</label>
            <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />

            <label>Image :</label>
            <input type="file" accept="image/*" onChange={choisirImage} />

            {img && <img src={img} alt="Aperçu" width="150" />}

            <div className="actions-form">
                <button type="submit">Enregistrer</button>
                <button type="button" onClick={props.fermer}>
                    Annuler
                </button>
            </div>
        </form>
    );
}
