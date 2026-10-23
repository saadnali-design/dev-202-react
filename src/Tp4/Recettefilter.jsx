
export default function Recettefilter(props) {
    return (
        <div className="filtres-recettes">
            <input
                type="text"
                placeholder="Rechercher par nom"
                value={props.nomr}
                onChange={(e) => props.setNomr(e.target.value)}
            />

            <select
                value={props.selectr}
                onChange={(e) => props.setSelectr(e.target.value)}
            >
                <option value="Toutes">Toutes les catégories</option>
                <option value="Entrée">Entrée</option>
                <option value="Plat">Plat</option>
                <option value="Dessert">Dessert</option>
                <option value="Boisson">Boisson</option>
            </select>
        </div>
    );
}
