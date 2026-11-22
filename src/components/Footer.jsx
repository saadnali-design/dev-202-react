
export default function Footer() {
    const style = {
        footer: {
            backgroundColor: "#0B3D2E",
            color: "white",
            textAlign: "center",
            padding: "25px",
            marginTop: "40px"
        },
        title: {
            color: "#E0A843",
            fontSize: "20px",
            fontWeight: "bold",
            marginBottom: "10px"
        },
        text: {
            fontSize: "14px",
            margin: "5px"
        }
    };

    return (
        <footer style={style.footer}>
            <div style={style.title}>FIFA WORLD</div>

            <p style={style.text}>
                Football Management Application
            </p>

            <p style={style.text}>
                © 2026 FIFA WORLD - All Rights Reserved
            </p>
        </footer>
    );
}
