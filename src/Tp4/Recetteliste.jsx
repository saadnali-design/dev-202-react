
import { useState } from "react";
import Recetteform from "./Recetteform";
import Recettefilter from "./Recettefilter";
import Carterecette from "./Carterecette";
import Pagination from "./Pagination";

const recettesInitiales = [
    {
        id: 1,
        nom: "Salade composée",
        categorie: "Entrée",
        img: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd",
        description: "Une salade fraîche et colorée.",
        ingredients: ["Laitue", "Tomate", "Concombre", "Maïs"],
        niveau: 1,
        date: "2026-10-20"
    },
    {
        id: 2,
        nom: "Tajine de poulet",
        categorie: "Plat",
        img: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398",
        description: "Un tajine de poulet aux olives et au citron.",
        ingredients: ["Poulet", "Olives", "Citron", "Oignon", "Épices"],
        niveau: 3,
        date: "2026-10-21"
    },
    {
        id: 3,
        nom: "Crêpes au chocolat",
        categorie: "Dessert",
        img: "https://images.unsplash.com/photo-1519676867240-f03562e64548",
        description: "Des crêpes moelleuses au chocolat.",
        ingredients: ["Farine", "Lait", "Œufs", "Sucre", "Chocolat"],
        niveau: 2,
        date: "2026-10-22"
    },
    {
        id: 4,
        nom: "Jus d'orange",
        categorie: "Boisson",
        img: "https://images.unsplash.com/photo-1600271886742-f049cd451bba",
        description: "Un jus d'orange frais et naturel.",
        ingredients: ["Oranges", "Eau", "Sucre"],
        niveau: 1,
        date: "2026-10-23"
    },
    {
        id: 5,
        nom: "Soupe de légumes",
        categorie: "Entrée",
        img: "https://images.unsplash.com/photo-1547592180-85f173990554",
        description: "Une soupe chaude et savoureuse.",
        ingredients: ["Carottes", "Pommes de terre", "Oignon", "Sel"],
        niveau: 2,
        date: "2026-10-23"
    },
    {
        id: 6,
        nom: "Pizza Margherita",
        categorie: "Plat",
        img: "https://images.unsplash.com/photo-1571407970349-bc81e7e96d47",
        description: "Une pizza à la tomate, à la mozzarella et au basilic.",
        ingredients: ["Farine", "Tomate", "Mozzarella", "Basilic"],
        niveau: 3,
        date: "2026-10-23"
    },
    {
        id: 7,
        nom: "Salade de fruits",
        categorie: "Dessert",
        img: "https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea",
        description: "Un mélange de fruits frais et sucrés.",
        ingredients: ["Pomme", "Banane", "Orange", "Fraise"],
        niveau: 1,
        date: "2026-10-23"
    },
    {
        id: 8,
        nom: "Smoothie à la fraise",
        categorie: "Boisson",
        img: "https://images.unsplash.com/photo-1553530666-ba11a7da3888",
        description: "Un smoothie fruité et rafraîchissant.",
        ingredients: ["Fraises", "Lait", "Banane", "Miel"],
        niveau: 1,
        date: "2026-10-23"
    }
];

export default function Recetteliste() {
    const [recettes, setRecettes] = useState(recettesInitiales);
    const [formVisible, setFormVisible] = useState(false);
    const [recetteEnCours, setRecetteEnCours] = useState(null);

    const [nomr, setNomr] = useState("");
    const [selectr, setSelectr] = useState("Toutes");
    const [pageActuelle, setPageActuelle] = useState(1);

    const recettesParPage = 3;

    // Recherche et filtrage
    const recettesFiltrees = recettes.filter((r) =>
        r.nom.toLowerCase().includes(nomr.toLowerCase()) &&
        (selectr === "Toutes" || r.categorie === selectr)
    );

    // Pagination
    const indexDerniereRecette = pageActuelle * recettesParPage;
    const indexPremiereRecette = indexDerniereRecette - recettesParPage;

    const recettesAffichees = recettesFiltrees.slice(
        indexPremiereRecette,
        indexDerniereRecette
    );

    // Ouvrir le formulaire d'ajout
    function creerRecette() {
        setRecetteEnCours(null);
        setFormVisible(true);
    }

    // Ouvrir le formulaire de modification
    function modifierRecette(id) {
        const recetteTrouvee = recettes.find((r) => r.id === id);
        setRecetteEnCours(recetteTrouvee);
        setFormVisible(true);
    }

    // Ajouter ou modifier une recette
    function enregistrer(rec) {
        const existe = recettes.some((r) => r.id === rec.id);

        if (existe) {
            setRecettes(
                recettes.map((r) => r.id === rec.id ? rec : r)
            );
        } else {
            setRecettes([...recettes, rec]);
        }

        setPageActuelle(1);
    }

    // Supprimer une recette
    function supprimerRecette(id) {
        setRecettes(recettes.filter((r) => r.id !== id));
        setPageActuelle(1);
    }

    // Dupliquer une recette
    function dupliquerRecette(id) {
        const recetteTrouvee = recettes.find((r) => r.id === id);

        if (recetteTrouvee) {
            const copie = {
                ...recetteTrouvee,
                id: Date.now(),
                nom: recetteTrouvee.nom + " (copie)",
                ingredients: [...recetteTrouvee.ingredients],
                date: new Date().toISOString().slice(0, 10)
            };

            setRecettes([...recettes, copie]);
        }
    }

    return (
        <div className="liste-recettes">
            <h1>Mes recettes</h1>

            <button onClick={creerRecette}>
                Ajouter une recette
            </button>

            {formVisible && (
                <Recetteform
                    key={recetteEnCours ? recetteEnCours.id : "nouvelle"}
                    recette={recetteEnCours}
                    enregistrer={enregistrer}
                    fermer={() => {
                        setFormVisible(false);
                        setRecetteEnCours(null);
                    }}
                />
            )}

            <Recettefilter
                nomr={nomr}
                setNomr={(valeur) => {
                    setNomr(valeur);
                    setPageActuelle(1);
                }}
                selectr={selectr}
                setSelectr={(valeur) => {
                    setSelectr(valeur);
                    setPageActuelle(1);
                }}
            />

            <p>{recettesFiltrees.length} recette(s) trouvée(s)</p>

            <div className="grille-recettes">
                {recettesAffichees.map((r) => (
                    <Carterecette
                        key={r.id}
                        recette={r}
                        modifier={modifierRecette}
                        supprimer={supprimerRecette}
                        dupliquer={dupliquerRecette}
                    />
                ))}
            </div>

            {recettesFiltrees.length === 0 && (
                <p>Aucune recette trouvée.</p>
            )}

            <Pagination
                totalRecettes={recettesFiltrees.length}
                recettesParPage={recettesParPage}
                pageActuelle={pageActuelle}
                changerPage={setPageActuelle}
            />
        </div>
    );
}
