import { useEffect } from "react";

function Register() {
    useEffect(() => {
        if (localStorage.getItem("ACCESS_TOKEN")) {
            window.location.href = "/";
        }
    }, []);

    return <>Register</>;
}

export default Register;
