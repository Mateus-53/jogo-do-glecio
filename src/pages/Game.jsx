import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { HiMiniChevronLeft } from "react-icons/hi2";
import { useNavigate } from "react-router";
import Modal from "../components/Modal";
import { motion } from "framer-motion";
import { scrollFromRight } from "../animations/pageAnimations";

function Game() {
    document.title = "Tabuada · Jogo do Glécio";

    const [showModal, setShowModal] = useState(false);
    const [progress, setProgress] = useState(100);

    const navigate = useNavigate();

    const handleModalConfirm = () => {
        navigate("/", { replace: true });
    };
    const handleModalCancel = () => {
        setShowModal(false);
        //lembrar: fazer com que o tempo pause quando o modal estiver ativo
    };

    useEffect(() => {
        let timer;

        if (progress > 0) {
            timer = setInterval(() => {
                setProgress((prev) => Math.max(prev - 1.67, 0));
            }, 1010); //1 segundo a mais
        }

        return () => clearInterval(timer);
    }, [progress]);

    return (
        <motion.div
            initial="initial"
            animate="animate"
            exit="exit"
            variants={scrollFromRight()}
        >
            <span
                onClick={() => setShowModal(true)}
                className="flex cursor-pointer text-darkPurple items-center font-medium p-2 absolute top-8 left-14 max-sm:left-4"
            >
                <HiMiniChevronLeft size={24} />
                Retornar
            </span>
            <main className="pt-20 p-6 max-w-3xl mx-auto">
                <div className="w-full h-5 mb-4 bg-skeletonLoadingBase rounded-full">
                    <div
                        className="h-5 bg-darkPurple rounded-full"
                        style={{
                            width: `${progress}%`,
                            transition: "width 1s linear",
                        }}
                    ></div>
                </div>
            </main>

            <AnimatePresence mode="wait">
                {showModal && (
                    <Modal
                        title="Tem certeza que deseja sair?"
                        message="Todo seu progresso será perdido."
                        onConfirm={handleModalConfirm}
                        onCancel={handleModalCancel}
                    />
                )}
            </AnimatePresence>
        </motion.div>
    );
}
export default Game;
