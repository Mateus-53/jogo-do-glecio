import { Link } from "react-router";
import { HiMiniChevronLeft } from "react-icons/hi2";
import Input from "../components/Input";
import ButtonPrimary from "../components/buttons/ButtonPrimary";
import { useEffect, useState } from "react";
import { resetPasswordRequest } from "../services/authService";
import Toast from "../components/Toast";
import { AnimatePresence } from "framer-motion";

function ResetPasswordRequest() {
    const [email, setEmail] = useState("");
    const [time, setTime] = useState(0);
    const [buttonIsLoading, setButtonIsLoading] = useState(false);
    const [toast, setToast] = useState({
        message: "",
        type: "success",
        isVisible: false,
    });

    useEffect(() => {
        if (time > 0) {
            const timer = setInterval(() => {
                setTime((prevTime) => prevTime - 1);
            }, 1000);

            return () => clearInterval(timer);
        }
    }, [time]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setButtonIsLoading(true);

        try {
            const response = await resetPasswordRequest(email);

            setTime(40);
            setButtonIsLoading(false);

            if (response.status_code == 200) {
                setToast({
                    message: response.message,
                    type: "success",
                    isVisible: true,
                });
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
                Retornar
            </Link>
            <div className="flex max-sm:items-start max-sm:mt-24 justify-center items-center flex-grow">
                <main className="max-w-sm max-[405px]:max-w-[86%] p-8 rounded-lg border-2 border-gray">
                    <div className="space-y-2">
                        <p className="text-4xl text-darkPurple font-black">
                            Resete sua senha
                        </p>
                        <p className="text-purpleGray">
                            Digite o endereço de e-mail do seu perfil e lhe
                            enviaremos um link de redefinição de senha.
                        </p>
                    </div>
                    <form className="space-y-4 mt-6" onSubmit={handleSubmit}>
                        <Input
                            label="Insira seu e-mail"
                            placeholder="glecio@prof.ce.gov.br"
                            type="email"
                            name="email"
                            required={true}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <ButtonPrimary
                            disabled={time > 0}
                            isLoading={buttonIsLoading}
                        >
                            {time > 0
                                ? `Reenviar e-mail em ${time}s`
                                : "Enviar"}
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
export default ResetPasswordRequest;
