import { Link, useNavigate, useParams } from "react-router";
import { HiMiniChevronLeft } from "react-icons/hi2";
import Input from "../components/Input";
import ButtonPrimary from "../components/buttons/ButtonPrimary";
import { useEffect, useState } from "react";
import { resetPasswordConfirm } from "../services/authService";
import Toast from "../components/Toast";
import { AnimatePresence } from "framer-motion";
import { isValidJWT } from "../utils/authUtils";

function ResetPasswordConfirm() {
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [buttonIsLoading, setButtonIsLoading] = useState(false);
    const [toast, setToast] = useState({
        message: "",
        type: "success",
        isVisible: false,
    });
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
                setToast({
                    message: response.message,
                    type: "success",
                    isVisible: true,
                });

                navigate("/login", { replace: true });
            }
        } catch (error) {
            setButtonIsLoading(false);
            setToast({
                message:
                    error.message ||
                    "Erro ao enviar e-mail de recuperação. Tente novamente mais tarde",
                type: "error",
                isVisible: true,
            });
        }
    };

    return (
        <div className="h-screen flex flex-col">
            <Link
                to="/login"
                replace={true}
                className="flex text-darkPurple items-center font-medium p-2 absolute top-8 left-14 max-sm:left-4"
            >
                <HiMiniChevronLeft size={24} />
                Retornar para login
            </Link>
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
                        <ButtonPrimary isLoading={buttonIsLoading}>
                            Confirmar
                        </ButtonPrimary>
                    </form>
                </main>
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
        </div>
    );
}
export default ResetPasswordConfirm;
