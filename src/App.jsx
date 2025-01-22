import { BrowserRouter, Route, Routes } from "react-router";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ResetPasswordRequest from "./pages/ResetPasswordRequest";
import EditInformation from "./pages/EditInformation";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/password-reset" element={<ResetPasswordRequest />} />
                <Route path="/edit-information" element={<EditInformation />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
