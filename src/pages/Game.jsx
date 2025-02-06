import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { HiMiniChevronLeft } from "react-icons/hi2";
import { useNavigate } from "react-router";
import Modal from "../components/Modal";
import { motion } from "framer-motion";
import { scrollFromRight } from "../animations/pageAnimations";
import { ArrowRight, Delete } from "lucide-react";

function Game() {
    document.title = "Tabuada · Jogo do Glécio";

    const [showModal, setShowModal] = useState(false);
    const [progress, setProgress] = useState(100);
    const [isRunning, setIsRunning] = useState(true);

    const navigate = useNavigate();

    const [currentMultiplicatipn, setCurrentMultiplication] = useState("3 x 2");

    const handleModalConfirm = () => {
        navigate("/", { replace: true });
    };
    const handleModalCancel = () => {
        setShowModal(false);
    };

    useEffect(() => {
        let timer;

        if (isRunning && !showModal && progress > 0) {
            timer = setInterval(() => {
                setProgress((prev) => Math.max(prev - 1.67, 0));
            }, 1010); //1 segundo a mais
        }

        return () => clearInterval(timer);
    }, [progress, showModal, isRunning]);

    useEffect(() => {
        const handleVisibilityChange = () => {
            setIsRunning(!document.hidden);
        };

        document.addEventListener("visibilitychange", handleVisibilityChange);

        return () =>
            document.removeEventListener(
                "visibilitychange",
                handleVisibilityChange
            );
    }, []);

    const generateNewMultiplication = () => {};

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
            <main className="pt-20 p-6 max-w-6xl mx-auto">
                <div className="w-full h-5 mb-4 bg-skeletonLoadingBase rounded-full">
                    <div
                        className="h-5 bg-darkPurple rounded-full"
                        style={{
                            width: `${progress}%`,
                            transition: "width 1s linear",
                        }}
                    ></div>
                </div>

                <div className="flex justify-around">
                        <p className="text-9xl font-black text-darkPurple">
                            {currentMultiplicatipn}
                        </p>

                    <div className="max-w-[350px]">
                        <input
                            className="w-full p-4 border border-grayColor outline-none bg-transparent rounded-xl mb-2"
                            disabled
                            type="number"
                            value="12"
                        />
                        <div className="grid grid-cols-3 gap-2">
                            <button className="w-28 h-[72px] bg-darkPurple rounded-xl text-white font-semibold text-4xl shadow-sm hover:scale-95 transition-all ease-in-out">
                                1
                            </button>
                            <button className="w-28 h-[72px] bg-darkPurple rounded-xl text-white font-semibold text-4xl shadow-sm hover:scale-95 transition-all ease-in-out">
                                2
                            </button>
                            <button className="w-28 h-[72px] bg-darkPurple rounded-xl text-white font-semibold text-4xl shadow-sm hover:scale-95 transition-all ease-in-out">
                                3
                            </button>
                            <button className="w-28 h-[72px] bg-darkPurple rounded-xl text-white font-semibold text-4xl shadow-sm hover:scale-95 transition-all ease-in-out">
                                4
                            </button>
                            <button className="w-28 h-[72px] bg-darkPurple rounded-xl text-white font-semibold text-4xl shadow-sm hover:scale-95 transition-all ease-in-out">
                                5
                            </button>
                            <button className="w-28 h-[72px] bg-darkPurple rounded-xl text-white font-semibold text-4xl shadow-sm hover:scale-95 transition-all ease-in-out">
                                6
                            </button>
                            <button className="w-28 h-[72px] bg-darkPurple rounded-xl text-white font-semibold text-4xl shadow-sm hover:scale-95 transition-all ease-in-out">
                                7
                            </button>
                            <button className="w-28 h-[72px] bg-darkPurple rounded-xl text-white font-semibold text-4xl shadow-sm hover:scale-95 transition-all ease-in-out">
                                8
                            </button>
                            <button className="w-28 h-[72px] bg-darkPurple rounded-xl text-white font-semibold text-4xl shadow-sm hover:scale-95 transition-all ease-in-out">
                                9
                            </button>
                            <button className="w-28 h-[72px] bg-redColor rounded-xl text-white flex items-center justify-center shadow-sm hover:scale-95 transition-all ease-in-out">
                                <Delete className="w-10 h-10" />
                            </button>
                            <button className="w-28 h-[72px] bg-darkPurple rounded-xl text-white font-semibold text-4xl shadow-sm hover:scale-95 transition-all ease-in-out">
                                0
                            </button>
                            <button className="w-28 h-[72px] bg-greenColor rounded-xl text-white flex items-center justify-center shadow-sm hover:scale-95 transition-all ease-in-out">
                                <ArrowRight className="w-10 h-10" />
                            </button>
                        </div>
                    </div>
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
