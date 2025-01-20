import { useEffect, useState } from "react";
import Input from "../components/Input";
import ButtonPrimary from "../components/buttons/ButtonPrimary";
import { loginUser } from "../services/authService";
import { Link } from "react-router";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        if (localStorage.getItem("ACCESS_TOKEN")) {
            window.location.href = "/";
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await loginUser({ email, password });

            if (response.access_token) {
                window.location.href = "/";
            }
        } catch (error) {
            setError(error);
        }
    };

    return (
        <div className="flex">
            <main className="h-screen w-1/2 flex justify-center items-center">
                <div className="w-full space-y-16 max-w-md bg-white p-8">
                    <div className="flex flex-col gap-1 mb-6">
                        <p className="text-4xl font-black bg-gradient-to-b from-darkPurple to-purpleSecondary bg-clip-text text-transparent">
                            Bem-vindo de volta
                        </p>
                        <span className="text-purpleDarkGray">
                            Por favor, insira suas credenciais.
                        </span>
                    </div>
                    <form className="space-y-12" onSubmit={handleSubmit}>
                        <div></div>
                        <div className="space-y-3">
                            <Input
                                label="E-mail"
                                type="email"
                                name="email"
                                placeholder="glecio@prof.ce.gov.br"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <Input
                                label="Senha"
                                type="password"
                                name="password"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <ButtonPrimary type="submit">Acessar</ButtonPrimary>
                            <a
                                href="/password-reset"
                                className="text-purpleDarkGray self-end text-sm"
                            >
                                Esqueceu sua senha?
                            </a>
                        </div>
                    </form>
                    <span className="text-purpleDarkGray text-center block mt-4">
                        Não possui um perfil?{" "}
                        <Link
                            to="/register"
                            className="text-darkPurple font-medium"
                        >
                            Crie aqui.
                        </Link>
                    </span>
                </div>
            </main>

            <div className="h-screen w-1/2 bg-gradient-to-b from-darkPurple to-purple"></div>
        </div>
    );
}

export default Login;
