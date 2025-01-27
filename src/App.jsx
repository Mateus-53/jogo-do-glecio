import { BrowserRouter, useLocation } from "react-router";
import AnimatedRoutes from "./components/AnimatedRoutes";
import { ToastContainer } from "react-toastify";

function App() {
    return (
        <BrowserRouter>
            <AnimatedRoutes />
            <ToastContainer
                position="bottom-right"
                autoClose={6000}
                theme="light"
                limit={3}
            />
        </BrowserRouter>
    );
}

export default App;
