import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../redux/actioncreator";

export default function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const users = useSelector(state => state.authstate?.users || []);

    const [form, setForm] = useState({
        username: "",
        password: ""
    });

    const [error, setError] = useState("");

    const handleChange = e => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = e => {
        e.preventDefault();

        const user = users.find(u =>
            u.username === form.username.trim() &&
            u.password === form.password
        );

        if (user) {
            dispatch(login(user));
            setError("");
            navigate("/");
        } else {
            setError("Login ou mot de passe n'est pas valide.");
        }
    };

    const inputStyle = {
        width: "100%",
        padding: "13px",
        margin: "8px 0 18px",
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
                maxWidth: "420px",
                padding: "35px",
                borderRadius: "15px",
                boxShadow: "0 4px 20px rgba(0,0,0,0.08)"
            }}>
                <h1 style={{
                    color: "#0B3D2E",
                    textAlign: "center",
                    marginBottom: "10px"
                }}>
                    FIFA WORLD
                </h1>

                <p style={{
                    color: "#777",
                    textAlign: "center",
                    marginBottom: "30px"
                }}>
                    Connectez-vous à votre compte
                </p>

                <label htmlFor="username">Nom utilisateur</label>
                <input
                    id="username"
                    style={inputStyle}
                    type="text"
                    name="username"
                    value={form.username}
                    onChange={handleChange}
                    placeholder="Votre nom utilisateur"
                    required
                />

                <label htmlFor="password">Mot de passe</label>
                <input
                    id="password"
                    style={inputStyle}
                    type="password"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    placeholder="Votre mot de passe"
                    required
                />

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
                    Se connecter
                </button>

                <p style={{
                    textAlign: "center",
                    color: "#777",
                    marginTop: "22px"
                }}>
                    Si vous n'êtes pas inscrit,
                    <br />
                    <Link to="/register" style={{
                        color: "#0B3D2E",
                        fontWeight: "bold"
                    }}>
                        Inscrivez-vous maintenant !
                    </Link>
                </p>
            </form>
        </div>
    );
}
