import { useEffect, useState } from "react";
import Input from "../components/Input";
import ButtonPrimary from "../components/buttons/ButtonPrimary";
import { loginUser } from "../services/authService";
import { Link, useNavigate } from "react-router";
import { AnimatePresence } from "framer-motion";
import Toast from "../components/Toast";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [toast, setToast] = useState({
        message: "",
        type: "success",
        isVisible: false,
    });
    const [buttonIsLoading, setButtonIsLoading] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem("ACCESS_TOKEN")) {
            navigate("/", { replace: true });
        }
    }, [navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setButtonIsLoading(true);

        try {
            const response = await loginUser({ email, password });

            if (response.access_token) {
                navigate("/", { replace: true });
            }
        } catch (error) {
            setToast({
                message: error.message || "Erro ao fazer login",
                type: "error",
                isVisible: true,
            });
        }

        setButtonIsLoading(false);
    };

    return (
        <>
            <div className="flex">
                <main className="h-screen w-1/2 max-sm:w-full max-sm:items-start flex justify-center items-center">
                    <div className="w-full space-y-16 max-sm:space-y-8 max-w-md bg-white p-8">
                        <div className="flex flex-col gap-1">
                            <p className="text-4xl font-black bg-gradient-to-b from-darkPurple to-purpleSecondary bg-clip-text text-transparent">
                                Bem-vindo de volta
                            </p>
                            <span className="text-purpleDarkGray">
                                Por favor, insira suas credenciais.
                            </span>
                        </div>
                        <form className="space-y-12" onSubmit={handleSubmit}>
                            <div className="space-y-3">
                                <Input
                                    label="E-mail"
                                    type="email"
                                    name="email"
                                    required={true}
                                    placeholder="glecio@prof.ce.gov.br"
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <Input
                                    label="Senha"
                                    type="password"
                                    name="password"
                                    required={true}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <ButtonPrimary
                                    type="submit"
                                    isLoading={buttonIsLoading}
                                >
                                    Acessar
                                </ButtonPrimary>
                                <Link
                                    to="/password-reset/request"
                                    className="text-purpleDarkGray self-end text-sm"
                                >
                                    Esqueceu sua senha?
                                </Link>
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

                <div className="h-screen w-1/2 max-sm:hidden bg-gradient-to-b from-darkPurple to-purple"></div>
            </div>
            <AnimatePresence>
                {toast.isVisible && (
                    <Toast
                        text={toast.message}
                        type={toast.type}
                        onClose={() =>
                            setToast((prev) => ({ ...prev, isVisible: false }))
                        }
                    />
                )}
            </AnimatePresence>
        </>
    );
}

export default Login;
