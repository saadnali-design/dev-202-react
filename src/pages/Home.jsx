import { useSelector } from "react-redux";

export default function Home() {
    const leaguesState = useSelector(state => state.leaguestate?.leagues || []);
    const clubsState = useSelector(state => state.clubstate?.clubs || []);
    const playersState = useSelector(state => state.playerstate?.players || []);
    const matchsState = useSelector(state => state.matchstate?.matchs || []);

    const leagues = Array.isArray(leaguesState) ? leaguesState : [];
    const clubs = Array.isArray(clubsState) ? clubsState : [];
    const players = Array.isArray(playersState) ? playersState : [];
    const matchs = Array.isArray(matchsState) ? matchsState : [];

    const today = new Date();
    const todayString = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

    const allUpcoming = matchs
        .filter(m => m.status === "À venir" && (m.date || "") >= todayString)
        .sort((a, b) => (a.date || "").localeCompare(b.date || ""));

    const upcoming = allUpcoming.slice(0, 5);

    const getClub = id => clubs.find(c => c.id === id)?.name || "Club inconnu";
    const getLeague = id => leagues.find(l => l.id === id)?.name || "Championnat";

    const stats = [
        { name: "Championnats", value: leagues.length, icon: "🏆" },
        { name: "Clubs", value: clubs.length, icon: "⚽" },
        { name: "Joueurs", value: players.length, icon: "👤" },
        { name: "Matchs à venir", value: allUpcoming.length, icon: "📅" }
    ];

    const card = {
        backgroundColor: "white",
        padding: "22px",
        borderRadius: "12px",
        boxShadow: "0 3px 12px rgba(0,0,0,0.06)",
        border: "1px solid #eeeeee"
    };

    return (
        <div style={{ background: "#F5F6F0", minHeight: "80vh", paddingBottom: "40px" }}>

            <section style={{ background: "linear-gradient(120deg,#0B3D2E,#246B4D)", color: "white", padding: "65px 35px" }}>
                <div style={{ maxWidth: "1100px", margin: "auto" }}>
                    <p style={{ color: "#E0A843", letterSpacing: "3px", fontWeight: "bold" }}>
                        FOOTBALL MANAGEMENT
                    </p>
                    <h1 style={{ fontSize: "42px", margin: "15px 0" }}>
                        Welcome to <span style={{ color: "#E0A843" }}>FIFA World</span>
                    </h1>
                    <p style={{ color: "#D9E5DC", maxWidth: "600px", lineHeight: "1.7" }}>
                        Gérez les championnats, les clubs, les joueurs et les matchs dans une seule application.
                    </p>
                </div>
            </section>

            <section style={{ maxWidth: "1100px", margin: "35px auto", padding: "0 20px" }}>
                <h2 style={{ color: "#0B3D2E" }}>Dashboard</h2>
                <p style={{ color: "#777" }}>Vue générale de votre application</p>

                <div style={{ display: "flex", flexWrap: "wrap", gap: "18px", marginTop: "20px" }}>
                    {stats.map((s, i) => (
                        <div key={i} style={{ ...card, flex: "1 1 200px", display: "flex", alignItems: "center", gap: "15px" }}>
                            <span style={{ fontSize: "30px" }}>{s.icon}</span>
                            <div>
                                <p style={{ color: "#777", margin: 0 }}>{s.name}</p>
                                <h2 style={{ color: "#0B3D2E", margin: "5px 0" }}>{s.value}</h2>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <section style={{ maxWidth: "1100px", margin: "35px auto", padding: "0 20px" }}>
                <h2 style={{ color: "#0B3D2E" }}>Upcoming Matches</h2>
                <p style={{ color: "#777" }}>Les cinq prochains matchs</p>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: "18px", marginTop: "20px" }}>
                    {upcoming.length > 0 ? upcoming.map(m => (
                        <div key={m.id} style={card}>
                            <p style={{ color: "#0B3D2E", fontWeight: "bold" }}>
                                {getLeague(m.leagueId)}
                            </p>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "10px" }}>
                                <strong>{getClub(m.homeClubId)}</strong>
                                <b style={{ color: "#E0A843" }}>VS</b>
                                <strong>{getClub(m.awayClubId)}</strong>
                            </div>
                            <p style={{ color: "#777", marginBottom: 0 }}>📅 {m.date}</p>
                        </div>
                    )) : (
                        <p style={{ color: "#777" }}>Aucun match à venir.</p>
                    )}
                </div>
            </section>
        </div>
    );
}
