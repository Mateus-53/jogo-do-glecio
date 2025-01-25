import { AnimatePresence } from "framer-motion";
import { Route, Routes, useLocation } from "react-router";
import EditProfile from "../pages/EditProfile";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ResetPasswordConfirm from "../pages/ResetPasswordConfirm";
import ResetPasswordRequest from "../pages/ResetPasswordRequest";

function AnimatedRoutes() {
    const location = useLocation();

    return (
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route
                    path="/password-reset/request"
                    element={<ResetPasswordRequest />}
                />
                <Route
                    path="/password-reset/confirm/:token"
                    element={<ResetPasswordConfirm />}
                />
                <Route path="/edit-information" element={<EditProfile />} />
            </Routes>
        </AnimatePresence>
    );
}
export default AnimatedRoutes;
