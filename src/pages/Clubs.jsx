
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addclub, updateclub, deleteclub } from "../redux/actioncreator";

const emptyForm = { name: "", country: "", leagueId: "" };

export default function Clubs() {
    const dispatch = useDispatch();

    const clubsState = useSelector(function(state) {
        return state.clubstate?.clubs || [];
    });

    const leaguesState = useSelector(function(state) {
        return state.leaguestate?.leagues || [];
    });

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

    function handleChange(e) {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    }

    function resetForm() {
        setForm(emptyForm);
        setEditingId(null);
    }

    function handleSubmit(e) {
        e.preventDefault();

        const obj = {
            ...form,
            id: editingId !== null ? editingId : Date.now(),
            leagueId: Number(form.leagueId)
        };

        if (editingId !== null) {
            dispatch(updateclub(obj));
        } else {
            dispatch(addclub(obj));
        }

        resetForm();
    }

    function editClub(club) {
        setForm({
            name: club.name || "",
            country: club.country || "",
            leagueId: String(club.leagueId ?? "")
        });

        setEditingId(club.id);
    }

    function removeClub(club) {
        if (window.confirm(`Supprimer "${club.name}" ainsi que ses joueurs et ses matchs ?`)) {
            dispatch(deleteclub(club.id));

            if (editingId === club.id) {
                resetForm();
            }
        }
    }

    const filtered = clubs
        .filter(function(c) {
            return `${c.name} ${c.country}`
                .toLowerCase()
                .includes(search.toLowerCase());
        })
        .sort(function(a, b) {
            if (order === "asc") {
                return (a.name || "").localeCompare(b.name || "");
            } else {
                return (b.name || "").localeCompare(a.name || "");
            }
        });

    function getLeagueName(id) {
        const league = leagues.find(function(l) {
            return l.id === id;
        });

        return league ? league.name : "Championnat inconnu";
    }

    return (
        <div style={{
            background: "#F5F6F0",
            minHeight: "80vh",
            padding: "35px 20px"
        }}>

            <div style={{ maxWidth: "1100px", margin: "auto" }}>

                <h1 style={{ color: "#0B3D2E" }}>Clubs</h1>

                <p style={{ color: "#777" }}>
                    Nombre total des clubs : {clubs.length}
                </p>

                <form onSubmit={handleSubmit} style={{
                    background: "white",
                    padding: "25px",
                    borderRadius: "12px",
                    margin: "25px 0",
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))",
                    gap: "15px"
                }}>

                    <label>
                        Nom du club
                        <input
                            style={inputStyle}
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            required
                        />
                    </label>

                    <label>
                        Pays
                        <input
                            style={inputStyle}
                            name="country"
                            value={form.country}
                            onChange={handleChange}
                            required
                        />
                    </label>

                    <label>
                        Championnat
                        <select
                            style={inputStyle}
                            name="leagueId"
                            value={form.leagueId}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Choisir un championnat</option>

                            {leagues.map(function(l) {
                                return (
                                    <option key={l.id} value={l.id}>
                                        {l.name}
                                    </option>
                                );
                            })}
                        </select>
                    </label>

                    <div style={{
                        display: "flex",
                        alignItems: "end",
                        gap: "8px"
                    }}>

                        <button
                            type="submit"
                            style={{
                                ...buttonStyle,
                                background: "#0B3D2E",
                                color: "white"
                            }}
                        >
                            {editingId !== null ? "Modifier" : "Ajouter"}
                        </button>

                        {editingId !== null && (
                            <button
                                type="button"
                                style={{
                                    ...buttonStyle,
                                    background: "#ddd"
                                }}
                                onClick={resetForm}
                            >
                                Annuler
                            </button>
                        )}

                    </div>
                </form>

                <div style={{
                    display: "flex",
                    gap: "12px",
                    flexWrap: "wrap",
                    marginBottom: "20px"
                }}>

                    <input
                        style={{
                            ...inputStyle,
                            maxWidth: "350px",
                            margin: 0
                        }}
                        placeholder="Rechercher un club..."
                        value={search}
                        onChange={function(e) {
                            setSearch(e.target.value);
                        }}
                    />

                    <select
                        style={{
                            ...inputStyle,
                            maxWidth: "180px",
                            margin: 0
                        }}
                        value={order}
                        onChange={function(e) {
                            setOrder(e.target.value);
                        }}
                    >
                        <option value="asc">Nom A - Z</option>
                        <option value="desc">Nom Z - A</option>
                    </select>

                </div>

                <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))",
                    gap: "18px"
                }}>

                    {filtered.map(function(c) {
                        return (
                            <div key={c.id} style={{
                                background: "white",
                                padding: "22px",
                                borderRadius: "12px",
                                boxShadow: "0 3px 12px rgba(0,0,0,0.05)"
                            }}>

                                <h3 style={{ color: "#0B3D2E" }}>
                                    ⚽ {c.name}
                                </h3>

                                <p>Pays : {c.country}</p>

                                <p>
                                    Championnat : {getLeagueName(c.leagueId)}
                                </p>

                                <div style={{
                                    display: "flex",
                                    gap: "8px"
                                }}>

                                    <button
                                        style={{
                                            ...buttonStyle,
                                            background: "#E0A843"
                                        }}
                                        onClick={function() {
                                            editClub(c);
                                        }}
                                    >
                                        Modifier
                                    </button>

                                    <button
                                        style={{
                                            ...buttonStyle,
                                            background: "#B83232",
                                            color: "white"
                                        }}
                                        onClick={function() {
                                            removeClub(c);
                                        }}
                                    >
                                        Supprimer
                                    </button>

                                </div>
                            </div>
                        );
                    })}

                </div>

            </div>
        </div>
    );
}
