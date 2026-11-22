import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/actioncreator";

export default function Header() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const isAuthenticated = useSelector(state => state.authstate?.isAuthenticated);
    const user = useSelector(state => state.authstate?.user);

    const handleLogout = () => {
        dispatch(logout());
        navigate("/login");
    };

    const style = {
        header: {
            backgroundColor: "#0B3D2E",
            color: "white",
            padding: "15px 40px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "10px"
        },
        logo: {
            fontSize: "25px",
            fontWeight: "bold",
            color: "#E0A843",
            textDecoration: "none"
        },
        nav: {
            display: "flex",
            gap: "20px",
            flexWrap: "wrap",
            alignItems: "center"
        },
        link: {
            color: "white",
            textDecoration: "none",
            fontSize: "16px",
            fontWeight: "500"
        },
        user: {
            color: "#E0A843",
            fontSize: "14px"
        },
        logoutButton: {
            background: "#B83232",
            color: "white",
            border: "none",
            borderRadius: "6px",
            padding: "7px 14px",
            cursor: "pointer",
            fontWeight: "bold"
        }
    };

    return (
        <header style={style.header}>
            <Link to="/" style={style.logo}>
                FIFA WORLD
            </Link>

            <nav style={style.nav}>
                <Link to="/" style={style.link}>Home</Link>
                <Link to="/about" style={style.link}>About</Link>
                <Link to="/leagues" style={style.link}>Leagues</Link>
                <Link to="/clubs" style={style.link}>Clubs</Link>
                <Link to="/players" style={style.link}>Players</Link>
                <Link to="/matchs" style={style.link}>Matches</Link>

                {isAuthenticated ? (
                    <>
                        <span style={style.user}>👤 {user?.username}</span>
                        <button style={style.logoutButton} onClick={handleLogout}>
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        <Link to="/login" style={style.link}>Login</Link>
                        <Link to="/register" style={style.link}>Register</Link>
                    </>
                )}
            </nav>
        </header>
    );
}
