import { BrowserRouter, useLocation } from "react-router";
import AnimatedRoutes from "./components/AnimatedRoutes";

function App() {
    return (
        <BrowserRouter>
            <AnimatedRoutes />
        </BrowserRouter>
    );
}

export default App;
