
import { useSelector } from "react-redux";

export default function Information() {

    const potions = useSelector(state => state.potions);

    const pieces = potions.reduce((total, e) => total + Number(e.prix), 0);

    const favorites = potions.filter(e => e.favorite === true).length;

    const legendaire = potions.filter(e => e.rarete === "legendaire").length;

    const style = {
        background: "#241832",
        color: "#f5e6b3",
        padding: "20px",
        borderRadius: "12px",
        border: "1px solid #c9a84c",
        textAlign: "center",
        flex: 1,
        boxShadow: "0 4px 12px rgba(0,0,0,0.3)"
    };

    return (
        <div style={{
            display: "flex",
            gap: "20px",
            padding: "25px",
            justifyContent: "center",
            flexWrap: "wrap",
            background: "#f0e9dc"
        }}>

            <div style={style}>
                <h2>🧪</h2>
                <h2>{potions.length}</h2>
                <p>Potions</p>
            </div>

            <div style={style}>
                <h2>🪙</h2>
                <h2>{pieces}</h2>
                <p>Pièces d'or</p>
            </div>

            <div style={style}>
                <h2>⭐</h2>
                <h2>{favorites}</h2>
                <p>Favorites</p>
            </div>

            <div style={style}>
                <h2>👑</h2>
                <h2>{legendaire}</h2>
                <p>Légendaires</p>
            </div>

        </div>
    );
}
