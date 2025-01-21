import { useEffect } from "react";
import { isTokenExpiringSoon } from "../utils/authUtils";
import { useNavigate } from "react-router";

function Home() {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("ACCESS_TOKEN");

        if (!token || isTokenExpiringSoon(token)) {
            localStorage.removeItem("ACCESS_TOKEN");
            navigate("/login", { replace: true });
        }
    }, [navigate]);

    return <p>Home</p>;
}

export default Home;
