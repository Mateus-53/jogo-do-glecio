import { useEffect } from "react";
import { isTokenExpiringSoon } from "../utils/authUtils";

function Home() {
    useEffect(() => {
        const token = localStorage.getItem("ACCESS_TOKEN");

        if (!token || isTokenExpiringSoon(token)) {
            localStorage.removeItem("ACCESS_TOKEN");
            window.location.href = "/login";
        }
    }, []);
    
    return <p>Home</p>;
}

export default Home;
