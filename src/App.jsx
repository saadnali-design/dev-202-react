
import { Routes, Route, useLocation } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import About from "./pages/About";
import Leagues from "./pages/Leagues";
import Clubs from "./pages/Clubs";
import Players from "./pages/Players";
import Matches from "./pages/Matches";
import Login from "./pages/Login";
import Register from "./pages/Register";

export default function App() {

    const location = useLocation();

    const hideHeaderFooter =
        location.pathname === "/login" ||
        location.pathname === "/register";

    return (
        <>
            {!hideHeaderFooter && <Header />}

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/leagues" element={<Leagues />} />
                <Route path="/clubs" element={<Clubs />} />
                <Route path="/players" element={<Players />} />
                <Route path="/matchs" element={<Matches />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
            </Routes>

            {!hideHeaderFooter && <Footer />}
        </>
    );
}
