import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addplayer, updateplayer, deleteplayer } from "../redux/actioncreator";

const emptyForm = { name: "", age: "", position: "", clubId: "" };

export default function Players() {
    const dispatch = useDispatch();

    const playersState = useSelector(state => state.playerstate?.players || []);
    const clubsState = useSelector(state => state.clubstate?.clubs || []);

    const players = Array.isArray(playersState) ? playersState : [];
    const clubs = Array.isArray(clubsState) ? clubsState : [];

    const [form, setForm] = useState(emptyForm);
    const [editingId, setEditingId] = useState(null);
    const [search, setSearch] = useState("");
    const [order, setOrder] = useState("asc");

    const inputStyle = {
        width: "100%",
        padding: "12px",
        border: "1px solid #ddd",
        borderRadius: "7px",
        boxSizing: "border-box",
        marginTop: "7px"
    };

    const buttonStyle = {
        padding: "10px 15px",
        border: "none",
        borderRadius: "7px",
        cursor: "pointer",
        fontWeight: "bold"
    };

    const handleChange = e => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const resetForm = () => {
        setForm(emptyForm);
        setEditingId(null);
    };

    const handleSubmit = e => {
        e.preventDefault();

        const obj = {
            ...form,
            id: editingId !== null ? editingId : Date.now(),
            age: Number(form.age),
            clubId: Number(form.clubId)
        };

        if (editingId !== null) {
            dispatch(updateplayer(obj));
        } else {
            dispatch(addplayer(obj));
        }

        resetForm();
    };

    const editPlayer = player => {
        setForm({
            name: player.name || "",
            age: String(player.age ?? ""),
            position: player.position || "",
            clubId: String(player.clubId ?? "")
        });
        setEditingId(player.id);
    };

    const removePlayer = player => {
        if (window.confirm(`Supprimer le joueur "${player.name}" ?`)) {
            dispatch(deleteplayer(player.id));
            if (editingId === player.id) resetForm();
        }
    };

    const getClubName = id =>
        clubs.find(c => c.id === id)?.name || "Club inconnu";

    const filtered = players
        .filter(p =>
            `${p.name} ${p.position} ${getClubName(p.clubId)}`
                .toLowerCase().includes(search.toLowerCase())
        )
        .sort((a, b) =>
            order === "asc"
                ? (a.name || "").localeCompare(b.name || "")
                : (b.name || "").localeCompare(a.name || "")
        );

    return (
        <div style={{ background: "#F5F6F0", minHeight: "80vh", padding: "35px 20px" }}>
            <div style={{ maxWidth: "1100px", margin: "auto" }}>
                <h1 style={{ color: "#0B3D2E" }}>Joueurs</h1>
                <p style={{ color: "#777" }}>Nombre total des joueurs : {players.length}</p>

                <form onSubmit={handleSubmit} style={{
                    background: "white",
                    padding: "25px",
                    borderRadius: "12px",
                    margin: "25px 0",
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit,minmax(170px,1fr))",
                    gap: "15px"
                }}>
                    <label>Nom du joueur
                        <input style={inputStyle} name="name" value={form.name}
                            onChange={handleChange} required />
                    </label>

                    <label>Âge
                        <input style={inputStyle} type="number" min="1" max="60" name="age"
                            value={form.age} onChange={handleChange} required />
                    </label>

                    <label>Position
                        <select style={inputStyle} name="position" value={form.position}
                            onChange={handleChange} required>
                            <option value="">Choisir une position</option>
                            <option value="Gardien">Gardien</option>
                            <option value="Défenseur">Défenseur</option>
                            <option value="Milieu">Milieu</option>
                            <option value="Attaquant">Attaquant</option>
                        </select>
                    </label>

                    <label>Club
                        <select style={inputStyle} name="clubId" value={form.clubId}
                            onChange={handleChange} required>
                            <option value="">Choisir un club</option>
                            {clubs.map(c => (
                                <option key={c.id} value={c.id}>{c.name}</option>
                            ))}
                        </select>
                    </label>

                    <div style={{ display: "flex", alignItems: "end", gap: "8px" }}>
                        <button type="submit" style={{ ...buttonStyle, background: "#0B3D2E", color: "white" }}>
                            {editingId !== null ? "Modifier" : "Ajouter"}
                        </button>

                        {editingId !== null && (
                            <button type="button" style={{ ...buttonStyle, background: "#ddd" }}
                                onClick={resetForm}>Annuler</button>
                        )}
                    </div>
                </form>

                <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginBottom: "20px" }}>
                    <input style={{ ...inputStyle, maxWidth: "350px", margin: 0 }}
                        placeholder="Rechercher un joueur..." value={search}
                        onChange={e => setSearch(e.target.value)} />

                    <select style={{ ...inputStyle, maxWidth: "180px", margin: 0 }}
                        value={order} onChange={e => setOrder(e.target.value)}>
                        <option value="asc">Nom A - Z</option>
                        <option value="desc">Nom Z - A</option>
                    </select>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))", gap: "18px" }}>
                    {filtered.map(p => (
                        <div key={p.id} style={{
                            background: "white",
                            padding: "22px",
                            borderRadius: "12px",
                            boxShadow: "0 3px 12px rgba(0,0,0,0.05)"
                        }}>
                            <h3 style={{ color: "#0B3D2E" }}>👤 {p.name}</h3>
                            <p>Âge : {p.age}</p>
                            <p>Position : {p.position}</p>
                            <p>Club : {getClubName(p.clubId)}</p>

                            <div style={{ display: "flex", gap: "8px" }}>
                                <button style={{ ...buttonStyle, background: "#E0A843" }}
                                    onClick={() => editPlayer(p)}>Modifier</button>
                                <button style={{ ...buttonStyle, background: "#B83232", color: "white" }}
                                    onClick={() => removePlayer(p)}>Supprimer</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
