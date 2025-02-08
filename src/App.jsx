import { BrowserRouter, useLocation } from "react-router";
import AnimatedRoutes from "./components/AnimatedRoutes";
import { ToastContainer } from "react-toastify";
import { TimerOverlayProvider } from "./contexts/TimerOverlayProvider";

function App() {
    return (
        <TimerOverlayProvider>
            <BrowserRouter>
                <AnimatedRoutes />
                <ToastContainer
                    position="bottom-right"
                    autoClose={6000}
                    theme="light"
                    limit={3}
                />
            </BrowserRouter>
        </TimerOverlayProvider>
    );
}

export default App;
