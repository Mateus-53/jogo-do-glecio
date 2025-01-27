import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { HiMiniChevronLeft } from "react-icons/hi2";
import { Link } from "react-router";
import { scrollFromRight } from "../animations/pageAnimations";
import Input from "../components/Input";
import ButtonPrimary from "../components/buttons/ButtonPrimary";
import { resetPasswordRequest } from "../services/authService";
import { toast } from "react-toastify";

function ResetPasswordRequest() {
    document.title = "Esqueceu sua senha? · Jogo do Glécio";

    const [email, setEmail] = useState("");
    const [time, setTime] = useState(0);
    const [buttonIsLoading, setButtonIsLoading] = useState(false);

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
                toast.success(response.message, {
                    className: "bg-white",
                });
            }
        } catch (error) {
            setButtonIsLoading(false);
            toast.error(
                error.message ||
                    "Erro ao enviar e-mail de recuperação. Tente novamente mais tarde",
                {
                    className: "bg-white",
                }
            );
        }
    };

    return (
        <div className="overflow-hidden">
            <motion.div
                className="h-screen flex flex-col"
                initial="initial"
                animate="animate"
                exit="exit"
                variants={scrollFromRight()}
            >
                <Link
                    to="/login"
                    replace={true}
                    className="flex text-darkPurple items-center font-medium p-2 absolute top-8 left-14 max-sm:left-4"
                >
                    <HiMiniChevronLeft size={24} />
                    Retornar
                </Link>
                <div className="flex max-sm:items-start max-sm:mt-24 justify-center items-center flex-grow">
                    <main className="max-w-sm max-[405px]:max-w-[86%] max-sm:p-4 p-8 rounded-lg sm:border-2 border-gray">
                        <div className="space-y-2">
                            <p className="text-4xl text-darkPurple font-black">
                                Esqueceu sua senha?
                            </p>
                            <p className="text-purpleGray">
                                Digite o endereço de e-mail do seu perfil e lhe
                                enviaremos um link de redefinição de senha.
                            </p>
                        </div>
                        <form
                            className="space-y-4 mt-6"
                            onSubmit={handleSubmit}
                        >
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
            </motion.div>
        </div>
    );
}
export default ResetPasswordRequest;
