import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";
import ButtonGreen from "../components/buttons/ButtonGreen";
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
            setToast({
                message: "As senhas não correspondem.",
                type: "error",
                isVisible: true,
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
        <div className="h-screen flex flex-col">
            <ButtonPageBack to="/login" replace={true}>
                Retornar para login
            </ButtonPageBack>
            <div className="flex max-sm:items-start max-sm:mt-24 justify-center items-center flex-grow">
                <main className="max-w-sm max-[405px]:max-w-[86%] max-sm:p-4 p-8 rounded-lg sm:border-2 border-gray">
                    <div className="space-y-2">
                        <p className="text-4xl text-darkPurple font-black">
                            Resete sua senha
                        </p>
                        <p className="text-purpleGray">
                            Digite sua nova senha abaixo para alterá-la. Só não
                            vai esquecer de novo, viu?
                        </p>
                    </div>
                    <form className="space-y-4 mt-6" onSubmit={handleSubmit}>
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
                        <ButtonGreen isLoading={buttonIsLoading}>
                            Confirmar
                        </ButtonGreen>
                    </form>
                </main>
            </div>
        </div>
    );
}
export default ResetPasswordConfirm;
