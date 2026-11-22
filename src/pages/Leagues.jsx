import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addlea, updatelea, deletelea, fetchInitialData } from "../redux/actioncreator";

const emptyForm = {
    name: "",
    country: "",
    season: "",
    year: new Date().getFullYear()
};

export default function Leagues() {
    const dispatch = useDispatch();

    const leaguesState = useSelector(state => state.leaguestate?.leagues || []);
    const loading = useSelector(state => state.leaguestate?.loading);
    const error = useSelector(state => state.leaguestate?.error);
    const leagues = Array.isArray(leaguesState) ? leaguesState : [];

    const [form, setForm] = useState(emptyForm);
    const [editingId, setEditingId] = useState(null);
    const [search, setSearch] = useState("");
    const [order, setOrder] = useState("asc");

    const reloadFromApi = () => {
        if (window.confirm("Recharger les données depuis l'API ? Vos modifications locales seront remplacées.")) {
            dispatch(fetchInitialData());
        }
    };

    const inputStyle = {
        padding: "12px",
        border: "1px solid #ddd",
        borderRadius: "7px",
        width: "100%",
        boxSizing: "border-box",
        marginTop: "7px"
    };

    const buttonStyle = {
        padding: "10px 16px",
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

        const current = editingId !== null ? leagues.find(l => l.id === editingId) : null;

        const obj = {
            ...form,
            id: editingId !== null ? editingId : Date.now(),
            year: Number(form.year),
            statistics: current?.statistics || { matchs: 0, clubs: 0 },
            status: current?.status || "active"
        };

        if (editingId !== null) {
            dispatch(updatelea(obj));
        } else {
            dispatch(addlea(obj));
        }

        resetForm();
    };

    const editLeague = league => {
        setForm({
            name: league.name || "",
            country: league.country || "",
            season: league.season || "",
            year: league.year || new Date().getFullYear()
        });
        setEditingId(league.id);
    };

    const removeLeague = league => {
        if (window.confirm(`Supprimer "${league.name}" ainsi que ses clubs, joueurs et matchs ?`)) {
            dispatch(deletelea(league.id));
            if (editingId === league.id) resetForm();
        }
    };

    const filtered = leagues
        .filter(l =>
            `${l.name} ${l.country} ${l.season}`.toLowerCase().includes(search.toLowerCase())
        )
        .sort((a, b) =>
            order === "asc"
                ? (a.name || "").localeCompare(b.name || "")
                : (b.name || "").localeCompare(a.name || "")
        );

    return (
        <div style={{ background: "#F5F6F0", minHeight: "80vh", padding: "35px 20px" }}>
            <div style={{ maxWidth: "1100px", margin: "auto" }}>
                <h1 style={{ color: "#0B3D2E" }}>Championnats</h1>
                <p style={{ color: "#777" }}>Total : {leagues.length} championnats</p>

                <button type="button" onClick={reloadFromApi} disabled={loading}
                    style={{ ...buttonStyle, background: "#246B4D", color: "white", opacity: loading ? 0.6 : 1 }}>
                    🔄 Recharger depuis l'API
                </button>

                {loading && <p style={{ color: "#0B3D2E" }}>Chargement des données depuis l'API...</p>}
                {error && (
                    <p style={{ color: "#B83232", background: "#ffeaea", padding: "10px", borderRadius: "7px" }}>
                        Impossible de charger les données depuis l'API : {error}
                    </p>
                )}

                <form onSubmit={handleSubmit} style={{
                    background: "white",
                    padding: "25px",
                    borderRadius: "12px",
                    margin: "25px 0",
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))",
                    gap: "15px"
                }}>
                    <label>Nom
                        <input style={inputStyle} name="name" value={form.name} onChange={handleChange} required />
                    </label>

                    <label>Pays
                        <input style={inputStyle} name="country" value={form.country} onChange={handleChange} required />
                    </label>

                    <label>Saison
                        <input style={inputStyle} name="season" value={form.season} onChange={handleChange} required />
                    </label>

                    <label>Année
                        <input style={inputStyle} type="number" name="year" value={form.year} onChange={handleChange} required />
                    </label>

                    <div style={{ display: "flex", alignItems: "end", gap: "8px" }}>
                        <button type="submit" style={{ ...buttonStyle, background: "#0B3D2E", color: "white" }}>
                            {editingId !== null ? "Modifier" : "Ajouter"}
                        </button>
                        {editingId !== null && (
                            <button type="button" style={{ ...buttonStyle, background: "#ddd" }}
                                onClick={resetForm}>
                                Annuler
                            </button>
                        )}
                    </div>
                </form>

                <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginBottom: "20px" }}>
                    <input style={{ ...inputStyle, maxWidth: "350px", margin: 0 }}
                        placeholder="Rechercher un championnat..." value={search}
                        onChange={e => setSearch(e.target.value)} />

                    <select style={{ ...inputStyle, maxWidth: "180px", margin: 0 }}
                        value={order} onChange={e => setOrder(e.target.value)}>
                        <option value="asc">Nom A - Z</option>
                        <option value="desc">Nom Z - A</option>
                    </select>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))", gap: "18px" }}>
                    {filtered.map(l => (
                        <div key={l.id} style={{
                            background: "white",
                            padding: "22px",
                            borderRadius: "12px",
                            boxShadow: "0 3px 12px rgba(0,0,0,0.05)"
                        }}>
                            <h3 style={{ color: "#0B3D2E" }}>🏆 {l.name}</h3>
                            <p>Pays : {l.country}</p>
                            <p>Saison : {l.season}</p>
                            <p>Année : {l.year}</p>

                            <div style={{ display: "flex", gap: "8px" }}>
                                <button style={{ ...buttonStyle, background: "#E0A843" }}
                                    onClick={() => editLeague(l)}>Modifier</button>
                                <button style={{ ...buttonStyle, background: "#B83232", color: "white" }}
                                    onClick={() => removeLeague(l)}>Supprimer</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
