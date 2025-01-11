import { useEffect } from "react";

function Login() {
    useEffect(() => {
        if (localStorage.getItem("ACCESS_TOKEN")) {
            window.location.href = "/";
        }
    }, []);

    return <>Login</>;
}

export default Login;
