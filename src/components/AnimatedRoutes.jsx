import { AnimatePresence } from "framer-motion";
import { Route, Routes, useLocation } from "react-router";
import About from "../pages/About";
import EditProfile from "../pages/EditProfile";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ResetPasswordConfirm from "../pages/ResetPasswordConfirm";
import ResetPasswordRequest from "../pages/ResetPasswordRequest";
import Game from "../pages/Game";

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
                    path="/password-reset/request"
                    element={<ResetPasswordRequest />}
                />
                <Route
                    path="/password-reset/confirm/:token"
                    element={<ResetPasswordConfirm />}
                />
                <Route path="/edit-profile" element={<EditProfile />} />
                <Route path="/about" element={<About />} />
            </Routes>
        </AnimatePresence>
    );
}
export default AnimatedRoutes;
