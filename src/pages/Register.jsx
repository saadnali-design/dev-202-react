import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../redux/actioncreator";

export default function Register() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const users = useSelector(state => state.authstate?.users || []);

    const [form, setForm] = useState({
        nom: "",
        prenom: "",
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const [error, setError] = useState("");

    const handleChange = e => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = e => {
        e.preventDefault();

        const username = form.username.trim();
        const email = form.email.trim().toLowerCase();

        if (form.password !== form.confirmPassword) {
            setError("Les deux mots de passe ne correspondent pas.");
            return;
        }

        if (users.some(u => u.username === username)) {
            setError("Ce nom utilisateur existe déjà.");
            return;
        }

        if (users.some(u => (u.email || "").toLowerCase() === email)) {
            setError("Cet email est déjà utilisé.");
            return;
        }

        const user = {
            id: Date.now(),
            nom: form.nom.trim(),
            prenom: form.prenom.trim(),
            username,
            email,
            password: form.password
        };

        dispatch(register(user));

        setError("");
        alert("Inscription réussie !");
        navigate("/login");
    };

    const inputStyle = {
        width: "100%",
        padding: "12px",
        margin: "7px 0 15px",
        border: "1px solid #ddd",
        borderRadius: "7px",
        boxSizing: "border-box"
    };

    return (
        <div style={{
            minHeight: "80vh",
            background: "#F5F6F0",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "25px"
        }}>
            <form onSubmit={handleSubmit} style={{
                background: "white",
                width: "100%",
                maxWidth: "500px",
                padding: "35px",
                borderRadius: "15px",
                boxShadow: "0 4px 20px rgba(0,0,0,0.08)"
            }}>
                <h1 style={{
                    color: "#0B3D2E",
                    textAlign: "center"
                }}>
                    Create Account
                </h1>

                <p style={{
                    textAlign: "center",
                    color: "#777",
                    marginBottom: "25px"
                }}>
                    Créez votre compte FIFA World
                </p>

                <label htmlFor="nom">Nom</label>
                <input id="nom" style={inputStyle} name="nom"
                    value={form.nom} onChange={handleChange} required />

                <label htmlFor="prenom">Prénom</label>
                <input id="prenom" style={inputStyle} name="prenom"
                    value={form.prenom} onChange={handleChange} required />

                <label htmlFor="username">Nom utilisateur</label>
                <input id="username" style={inputStyle} name="username"
                    value={form.username} onChange={handleChange} required />

                <label htmlFor="email">Email</label>
                <input id="email" style={inputStyle} type="email" name="email"
                    value={form.email} onChange={handleChange} required />

                <label htmlFor="password">Mot de passe</label>
                <input id="password" style={inputStyle} type="password" name="password"
                    value={form.password} onChange={handleChange} minLength={4} required />

                <label htmlFor="confirmPassword">Confirmation du mot de passe</label>
                <input id="confirmPassword" style={inputStyle} type="password" name="confirmPassword"
                    value={form.confirmPassword} onChange={handleChange} required />

                {error && (
                    <p style={{
                        color: "red",
                        background: "#ffeaea",
                        padding: "10px",
                        borderRadius: "7px"
                    }}>
                        {error}
                    </p>
                )}

                <button type="submit" style={{
                    width: "100%",
                    padding: "13px",
                    background: "#0B3D2E",
                    color: "white",
                    border: "none",
                    borderRadius: "7px",
                    cursor: "pointer",
                    fontWeight: "bold"
                }}>
                    S'inscrire
                </button>

                <p style={{
                    textAlign: "center",
                    color: "#777",
                    marginTop: "20px"
                }}>
                    Vous avez déjà un compte ?
                    <br />
                    <Link to="/login" style={{
                        color: "#0B3D2E",
                        fontWeight: "bold"
                    }}>
                        Connectez-vous
                    </Link>
                </p>
            </form>
        </div>
    );
}
