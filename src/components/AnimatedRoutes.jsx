import { AnimatePresence } from "framer-motion";
import { Route, Routes, useLocation } from "react-router";
import About from "../pages/About";
import ChangePassword from "../pages/ChangePassword";
import EditProfile from "../pages/EditProfile";
import Game from "../pages/Game";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Ranking from "../pages/Ranking";
import Register from "../pages/Register";
import ResetPasswordConfirm from "../pages/ResetPasswordConfirm";
import ResetPasswordRequest from "../pages/ResetPasswordRequest";
import Result from "../pages/Result";

function AnimatedRoutes() {
    const location = useLocation();

    return (
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/play" element={<Game />} />
                <Route
                    path="/forgot-password"
                    element={<ResetPasswordRequest />}
                />
                <Route
                    path="/password-reset/confirm/:token"
                    element={<ResetPasswordConfirm />}
                />
                <Route path="/edit-profile" element={<EditProfile />} />
                <Route
                    path="/edit-profile/password"
                    element={<ChangePassword />}
                />
                <Route path="/about" element={<About />} />
                <Route path="/ranking" element={<Ranking />} />
                <Route path="/results" element={<Result />} />
            </Routes>
        </AnimatePresence>
    );
}
export default AnimatedRoutes;
