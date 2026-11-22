import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addmatch, updatematch, deletematch } from "../redux/actioncreator";

const emptyForm = {
    leagueId: "",
    homeClubId: "",
    awayClubId: "",
    date: "",
    status: "À venir",
    homeScore: "",
    awayScore: ""
};

export default function Matches() {
    const dispatch = useDispatch();

    const matchsState = useSelector(state => state.matchstate?.matchs || []);
    const clubsState = useSelector(state => state.clubstate?.clubs || []);
    const leaguesState = useSelector(state => state.leaguestate?.leagues || []);

    const matchs = Array.isArray(matchsState) ? matchsState : [];
    const clubs = Array.isArray(clubsState) ? clubsState : [];
    const leagues = Array.isArray(leaguesState) ? leaguesState : [];

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
        const { name, value } = e.target;
        const next = { ...form, [name]: value };

        // Changer de championnat remet les clubs à zéro
        if (name === "leagueId") {
            next.homeClubId = "";
            next.awayClubId = "";
        }

        // Un match à venir n'a pas de score
        if (name === "status" && value === "À venir") {
            next.homeScore = "";
            next.awayScore = "";
        }

        // Le club visiteur ne peut pas être le club à domicile
        if (name === "homeClubId" && value === form.awayClubId) {
            next.awayClubId = "";
        }

        setForm(next);
    };

    const resetForm = () => {
        setForm(emptyForm);
        setEditingId(null);
    };

    const handleSubmit = e => {
        e.preventDefault();

        if (form.homeClubId === form.awayClubId) {
            alert("Choisissez deux clubs différents.");
            return;
        }

        if (form.status === "Terminé" && (form.homeScore === "" || form.awayScore === "")) {
            alert("Veuillez saisir les deux scores d'un match terminé.");
            return;
        }

        const finished = form.status === "Terminé";

        const obj = {
            ...form,
            id: editingId !== null ? editingId : Date.now(),
            leagueId: Number(form.leagueId),
            homeClubId: Number(form.homeClubId),
            awayClubId: Number(form.awayClubId),
            homeScore: finished ? Number(form.homeScore) : null,
            awayScore: finished ? Number(form.awayScore) : null
        };

        if (editingId !== null) {
            dispatch(updatematch(obj));
        } else {
            dispatch(addmatch(obj));
        }

        resetForm();
    };

    const editMatch = m => {
        setForm({
            leagueId: String(m.leagueId),
            homeClubId: String(m.homeClubId),
            awayClubId: String(m.awayClubId),
            date: m.date || "",
            status: m.status || "À venir",
            homeScore: m.homeScore === null || m.homeScore === undefined ? "" : String(m.homeScore),
            awayScore: m.awayScore === null || m.awayScore === undefined ? "" : String(m.awayScore)
        });
        setEditingId(m.id);
    };

    const removeMatch = m => {
        if (window.confirm("Supprimer ce match ?")) {
            dispatch(deletematch(m.id));
            if (editingId === m.id) resetForm();
        }
    };

    const getClubName = id => clubs.find(c => c.id === id)?.name || "Club inconnu";
    const getLeagueName = id => leagues.find(l => l.id === id)?.name || "Championnat inconnu";

    const leagueClubs = clubs.filter(c => !form.leagueId || c.leagueId === Number(form.leagueId));

    const filtered = matchs
        .filter(m =>
            `${getClubName(m.homeClubId)} ${getClubName(m.awayClubId)} ${m.status}`
                .toLowerCase().includes(search.toLowerCase())
        )
        .sort((a, b) =>
            order === "asc"
                ? (a.date || "").localeCompare(b.date || "")
                : (b.date || "").localeCompare(a.date || "")
        );

    return (
        <div style={{ background: "#F5F6F0", minHeight: "80vh", padding: "35px 20px" }}>
            <div style={{ maxWidth: "1100px", margin: "auto" }}>
                <h1 style={{ color: "#0B3D2E" }}>Matchs</h1>
                <p style={{ color: "#777" }}>Nombre total des matchs : {matchs.length}</p>

                <form onSubmit={handleSubmit} style={{
                    background: "white",
                    padding: "25px",
                    borderRadius: "12px",
                    margin: "25px 0",
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit,minmax(170px,1fr))",
                    gap: "15px"
                }}>
                    <label>Championnat
                        <select style={inputStyle} name="leagueId" value={form.leagueId}
                            onChange={handleChange} required>
                            <option value="">Choisir</option>
                            {leagues.map(l => (
                                <option key={l.id} value={l.id}>{l.name}</option>
                            ))}
                        </select>
                    </label>

                    <label>Club à domicile
                        <select style={inputStyle} name="homeClubId" value={form.homeClubId}
                            onChange={handleChange} required>
                            <option value="">Choisir</option>
                            {leagueClubs.map(c => (
                                <option key={c.id} value={c.id}>{c.name}</option>
                            ))}
                        </select>
                    </label>

                    <label>Club visiteur
                        <select style={inputStyle} name="awayClubId" value={form.awayClubId}
                            onChange={handleChange} required>
                            <option value="">Choisir</option>
                            {leagueClubs
                                .filter(c => c.id !== Number(form.homeClubId))
                                .map(c => (
                                    <option key={c.id} value={c.id}>{c.name}</option>
                                ))}
                        </select>
                    </label>

                    <label>Date
                        <input style={inputStyle} type="date" name="date" value={form.date}
                            onChange={handleChange} required />
                    </label>

                    <label>Statut
                        <select style={inputStyle} name="status" value={form.status}
                            onChange={handleChange}>
                            <option value="À venir">À venir</option>
                            <option value="Terminé">Terminé</option>
                        </select>
                    </label>

                    <label>Score domicile
                        <input style={inputStyle} type="number" min="0" name="homeScore"
                            value={form.homeScore} onChange={handleChange}
                            disabled={form.status === "À venir"}
                            required={form.status === "Terminé"} />
                    </label>

                    <label>Score visiteur
                        <input style={inputStyle} type="number" min="0" name="awayScore"
                            value={form.awayScore} onChange={handleChange}
                            disabled={form.status === "À venir"}
                            required={form.status === "Terminé"} />
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
                        placeholder="Rechercher un match..." value={search}
                        onChange={e => setSearch(e.target.value)} />

                    <select style={{ ...inputStyle, maxWidth: "180px", margin: 0 }}
                        value={order} onChange={e => setOrder(e.target.value)}>
                        <option value="asc">Date croissante</option>
                        <option value="desc">Date décroissante</option>
                    </select>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: "18px" }}>
                    {filtered.map(m => (
                        <div key={m.id} style={{
                            background: "white",
                            padding: "22px",
                            borderRadius: "12px",
                            boxShadow: "0 3px 12px rgba(0,0,0,0.05)"
                        }}>
                            <p style={{ color: "#0B3D2E", fontWeight: "bold" }}>
                                {getLeagueName(m.leagueId)}
                            </p>

                            <h3 style={{ textAlign: "center" }}>
                                {getClubName(m.homeClubId)} - {getClubName(m.awayClubId)}
                            </h3>

                            {m.status === "Terminé" && (
                                <h2 style={{ color: "#0B3D2E", textAlign: "center" }}>
                                    {m.homeScore} - {m.awayScore}
                                </h2>
                            )}

                            <p>Date : {m.date}</p>
                            <p>Statut : {m.status}</p>

                            <div style={{ display: "flex", gap: "8px" }}>
                                <button style={{ ...buttonStyle, background: "#E0A843" }}
                                    onClick={() => editMatch(m)}>Modifier</button>
                                <button style={{ ...buttonStyle, background: "#B83232", color: "white" }}
                                    onClick={() => removeMatch(m)}>Supprimer</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
