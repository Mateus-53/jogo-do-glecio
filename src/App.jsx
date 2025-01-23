import { BrowserRouter, Route, Routes } from "react-router";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ResetPasswordRequest from "./pages/ResetPasswordRequest";
import EditProfile from "./pages/EditProfile";
import ResetPasswordConfirm from "./pages/ResetPasswordConfirm";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/password-reset/request" element={<ResetPasswordRequest />} />
                <Route path="/password-reset/confirm/:token" element={<ResetPasswordConfirm />} />
                <Route path="/edit-information" element={<EditProfile />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
