
export default function Header() {
    return (
        <div style={{
            background: "linear-gradient(135deg, #1a1028, #35204d, #1a1028)",
            color: "#e0c878",
            textAlign: "center",
            padding: "35px 20px",
            borderBottom: "3px solid #c9a84c",
            boxShadow: "0 4px 15px rgba(0,0,0,0.4)"
        }}>
            <h1 style={{
                fontSize: "32px",
                letterSpacing: "5px",
                margin: "0 0 15px",
                textTransform: "uppercase"
            }}>
                ROYAUME D'ASTREA
            </h1>

            <h2 style={{
                color: "#f5e6b3",
                fontSize: "22px",
                letterSpacing: "2px",
                margin: "10px"
            }}>
                ATELIER DES POTIONS ENCHANTÉES
            </h2>

            <p style={{
                color: "#c5b6d8",
                fontSize: "15px",
                letterSpacing: "1px",
                margin: "10px 0 0"
            }}>
                GESTION DE LA COLLECTION DE POTIONS ✨
            </p>
        </div>
    );
}
