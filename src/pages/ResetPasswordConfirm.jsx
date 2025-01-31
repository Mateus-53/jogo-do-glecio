import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";
import ButtonSuccess from "../components/buttons/ButtonSuccess";
import ButtonPageBack from "../components/buttons/ButtonPageBack";
import Input from "../components/Input";
import { resetPasswordConfirm } from "../services/authService";
import { isValidJWT } from "../utils/authUtils";

function ResetPasswordConfirm() {
    document.title = "Resetar senha · Jogo do Glécio";

    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [buttonIsLoading, setButtonIsLoading] = useState(false);
    const [inputErrorIndicator, setInputErrorIndicator] = useState(false);

    const navigate = useNavigate();

    const { token } = useParams();

    useEffect(() => {
        if (!isValidJWT(token)) {
            navigate("/login", { replace: true });
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setInputErrorIndicator(false);

        if (newPassword !== confirmPassword) {
            setInputErrorIndicator(true);
            toast.error("As senhas não correspondem", {
                className: "bg-white",
            });
            return;
        }

        setButtonIsLoading(true);

        try {
            const response = await resetPasswordConfirm(token, newPassword);

            setButtonIsLoading(false);

            if (response.status_code == 200) {
                toast.success(response.message, {
                    className: "bg-white",
                });

                navigate("/login", { replace: true });
            }
        } catch (error) {
            setButtonIsLoading(false);

            toast.error(
                error.message ||
                    "Erro ao resetar senha. Tente novamente mais tarde",
                {
                    className: "bg-white",
                }
            );
        }
    };

    return (
        <div className="flex flex-col h-screen">
            <ButtonPageBack to="/login" replace={true} absolute={true}>
                Retornar para login
            </ButtonPageBack>
            <div className="flex items-center justify-center flex-grow max-sm:items-start max-sm:mt-24">
                <main className="max-w-sm max-[405px]:max-w-[86%] max-sm:p-4 p-8 rounded-lg sm:border-2 border-gray">
                    <div className="space-y-2">
                        <p className="text-4xl font-black text-darkPurple">
                            Resete sua senha
                        </p>
                        <p className="text-purpleGray">
                            Digite sua nova senha abaixo para alterá-la. Só não
                            vai esquecer de novo, viu?
                        </p>
                    </div>
                    <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
                        <Input
                            label="Nova senha"
                            type="password"
                            name="new_password"
                            required={true}
                            error={inputErrorIndicator}
                            onChange={(e) => setNewPassword(e.target.value)}
                        />
                        <Input
                            label="Confirmar senha"
                            type="password"
                            name="new_password_confirm"
                            required={true}
                            error={inputErrorIndicator}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        <ButtonSuccess isLoading={buttonIsLoading}>
                            Confirmar
                        </ButtonSuccess>
                    </form>
                </main>
            </div>
        </div>
    );
}
export default ResetPasswordConfirm;
