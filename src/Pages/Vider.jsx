
import { useDispatch } from "react-redux";
import { vider } from "../redux/action";

export default function Vider() {
    const dispatch = useDispatch();

    function renisialiser() {
        if (window.confirm("Voulez-vous vraiment vider l'atelier ?")) {
            dispatch(vider());
        }
    }

    return (
        <div style={{
            background: "#f0e9dc",
            padding: "25px",
            display: "flex",
            justifyContent: "center"
        }}>
            <div style={{
                background: "#241832",
                border: "1px solid #c9a84c",
                borderRadius: "12px",
                padding: "25px 40px",
                textAlign: "center",
                boxShadow: "0 4px 12px rgba(0,0,0,0.3)"
            }}>
                <h3 style={{
                    color: "#e0c878",
                    letterSpacing: "2px"
                }}>
                    ⚠️ Réinitialiser l'atelier
                </h3>

                <p style={{ color: "#c5b6d8" }}>
                    Supprimer toutes les potions de votre collection ?
                </p>

                <button
                    onClick={renisialiser}
                    style={{
                        background: "#8b2635",
                        color: "white",
                        border: "1px solid #c9a84c",
                        borderRadius: "8px",
                        padding: "12px 25px",
                        fontSize: "15px",
                        fontWeight: "bold",
                        cursor: "pointer",
                        letterSpacing: "1px"
                    }}
                >
                    🗑️ Réinitialiser
                </button>
            </div>
        </div>
    );
}
