import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Delete } from "lucide-react";
import { useEffect, useState } from "react";
import { HiMiniChevronLeft } from "react-icons/hi2";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { scrollFromRight } from "../animations/pageAnimations";
import Modal from "../components/Modal";
import { useOverlay } from "../contexts/TimerOverlayProvider";
import { setRanking } from "../services/rankingService";

import greenHappyFace from "../assets/images/elements/green-happy-face.svg";
import redSadFace from "../assets/images/elements/red-sad-face.svg";

function Game() {
    document.title = "Tabuada · Jogo do Glécio";

    const [showModal, setShowModal] = useState(false);
    const [showConfettiInResultPage, setShowConfettiInResultPage] =
        useState(false);
    const [multiplicationScaleAnimation, setMultiplicationScaleAnimation] =
        useState(false);

    const [progress, setProgress] = useState(100);
    const [isRunning, setIsRunning] = useState(true);

    const navigate = useNavigate();

    const [userResponse, setUserResponse] = useState("");
    const [correctAnswersCount, setCorrectAnswersCount] = useState(0);
    const [wrongAnswersCount, setWrongAnswersCount] = useState(0);
    const [lastMultiplication, setLastMultiplication] = useState({
        multiplication: "",
    });
    const [currentMultiplication, setCurrentMultiplication] = useState({
        multiplication: "0 x 0",
    });

    const { showTimerOverlay } = useOverlay();

    const handleModalConfirm = () => {
        navigate("/", { replace: true });
    };

    const checkIfUserIsCorrect = () => {
        if (parseInt(userResponse) === currentMultiplication.result) {
            setCorrectAnswersCount((prev) => prev + 1);
        } else {
            setWrongAnswersCount((prev) => prev + 1);
        }

        setLastMultiplication(currentMultiplication);

        generateNewMultiplication();
        setUserResponse("");
    };

    const generateNewMultiplication = () => {
        let firstNumber, secondNumber;
        let newMultiplication;

        do {
            firstNumber = Math.floor(Math.random() * 8) + 2;
            secondNumber = Math.floor(Math.random() * 9) + 1;
            newMultiplication = `${firstNumber} x ${secondNumber}`;
        } while (newMultiplication === lastMultiplication?.multiplication);

        setCurrentMultiplication({
            multiplication: newMultiplication,
            result: firstNumber * secondNumber,
        });

        setMultiplicationScaleAnimation(true)
        let timer = setTimeout(() => {
            setMultiplicationScaleAnimation(false)
        }, 200);

        return () => clearTimeout(timer)
    };

    const handleNumericButtonClick = (num) => {
        if (userResponse.length < 4) {
            setUserResponse((prev) => `${prev}${num}`);
        }
    };

    const setRankingScore = async (score) => {
        try {
            const response = await setRanking(score);

            if (response.status_code === 201) {
                console.info("Pontos enviados para o ranking");
            }
        } catch (error) {
            toast.error(
                error.message || "Erro ao enviar pontos para o ranking",
                { className: "bg-white" }
            );
        }
    };

    useEffect(() => {
        let timer;

        if (isRunning && !showModal && progress > 0) {
            timer = setInterval(() => {
                setProgress((prev) => Math.max(prev - 1.67, 0));
            }, 1000);
        }

        return () => clearInterval(timer);
    }, [progress, showModal, isRunning]);

    useEffect(() => {
        if (progress === 0) {
            showTimerOverlay();

            if (
                correctAnswersCount >
                parseInt(localStorage.getItem("MAX_SCORE") || "0")
            ) {
                localStorage.setItem("MAX_SCORE", correctAnswersCount);
                setShowConfettiInResultPage(true);
            }

            const timer = setTimeout(() => {
                console.log("show confetti", showConfettiInResultPage);

                navigate("/results", {
                    state: {
                        correctAnswers: correctAnswersCount,
                        wrongAnswers: wrongAnswersCount,
                        showConfetti: showConfettiInResultPage,
                    },
                });
            }, 1000);

            setRankingScore(correctAnswersCount);

            return () => clearTimeout(timer);
        }
    }, [
        progress,
        showTimerOverlay,
        correctAnswersCount,
        wrongAnswersCount,
        showConfettiInResultPage,
        navigate,
    ]);

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

    useEffect(() => {
        const handleKeyDown = (e) => {
            const numberKey = parseInt(e.key);

            if (progress != 0) {
                if (!isNaN(numberKey)) {
                    setUserResponse((prev) => `${prev}${numberKey}`);
                }

                if (e.key === "Enter") {
                    checkIfUserIsCorrect();
                }

                if (e.key === "Backspace") {
                    setUserResponse((prev) => prev.slice(0, -1));
                }
            }
        };

        document.body.addEventListener("keydown", handleKeyDown);

        return () => {
            document.body.removeEventListener("keydown", handleKeyDown);
        };
    }, [checkIfUserIsCorrect, userResponse, progress]);

    useEffect(() => {
        generateNewMultiplication();
    }, []);

    return (
        <motion.div
            initial="initial"
            animate="animate"
            exit="exit"
            variants={scrollFromRight()}
        >
            <span
                onClick={() => setShowModal(true)}
                className="flex cursor-pointer text-darkPurple items-center font-medium absolute top-8 left-14 max-sm:left-4"
            >
                <HiMiniChevronLeft size={24} />
                Retornar
            </span>
            <main className="pt-20 p-6 max-w-6xl mx-auto">
                {/* Barra de progresso */}
                <div className="w-full h-5 mb-20 bg-skeletonLoadingBase rounded-full max-[580px]:mb-10 overflow-hidden">
                    <div
                        className="h-5 bg-darkPurple rounded-full"
                        style={{
                            width: `${progress}%`,
                            transition: "width 1s linear",
                        }}
                    ></div>
                </div>

                {/* Conteúdo */}
                <div className="flex justify-between gap-10 max-lg:gap-5 max-[580px]:flex-col">
                    {/* Multiplicação e acertos/erros */}
                    <div className="flex flex-col justify-between w-[450px] max-[580px]:w-full">
                        <p
                            className={`text-[192px] font-black text-darkPurple text-center max-lg:text-[160px] max-[810px]:text-9xl max-sm:text-8xl h-full aling max-[580px]:mb-10 transition-scale duration-150 ease-in-out ${
                                multiplicationScaleAnimation ? "scale-105" : "scale-100"
                            }`}
                        >
                            {currentMultiplication.multiplication}
                        </p>
                        <div className="flex justify-evenly gap-4 max-[580px]:justify-between">
                            <div className="flex gap-2 items-center">
                                <img
                                    src={greenHappyFace}
                                    alt={`${greenHappyFace}'s image`}
                                    className="pointer-events-none select-none h-16 max-sm:h-12 max-[580px]:h-10    "
                                />
                                <div className="flex flex-col">
                                    <span className="text-greenColor font-extrabold text-2xl leading-4 max-[580px]:text-xl max-[580px]:leading-3">
                                        {correctAnswersCount}
                                    </span>
                                    <span className="font-medium text-darkGray text-lg max-[580px]:text-base">
                                        Acertos
                                    </span>
                                </div>
                            </div>
                            <div className="flex gap-2 items-center">
                                <img
                                    src={redSadFace}
                                    alt={`${redSadFace}'s image`}
                                    className="pointer-events-none select-none h-16 max-sm:h-12 max-[580px]:h-10"
                                />
                                <div className="flex flex-col">
                                    <span className="text-redColor font-extrabold text-2xl leading-4 max-[580px]:text-xl max-[580px]:leading-3">
                                        {wrongAnswersCount}
                                    </span>
                                    <span className="font-medium text-darkGray text-lg max-[580px]:text-base">
                                        Erros
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Teclado */}
                    <div className="max-w-[450px] max-[580px]:max-w-full">
                        <input
                            className="w-full text-lg text-purpleDarkGray font-medium p-4 border border-grayColor outline-none bg-transparent rounded-xl mb-2 max-[580px]:p-3"
                            disabled
                            type="text"
                            maxLength={3}
                            value={userResponse}
                        />
                        <div className="grid grid-cols-[repeat(3,112px)] auto-rows-[72px] gap-2 max-md:grid-cols-[repeat(3,80px)] max-md:auto-rows-[64px] max-[580px]:grid-cols-[repeat(3,1fr)] max-[580px]:auto-rows-[50px]">
                            <button
                                className="w-full h-full bg-darkPurple rounded-xl text-white font-semibold text-4xl shadow-sm hover:scale-95 transition-all ease-in-out"
                                onClick={() => handleNumericButtonClick("1")}
                            >
                                1
                            </button>
                            <button
                                className="w-full h-full bg-darkPurple rounded-xl text-white font-semibold text-4xl shadow-sm hover:scale-95 transition-all ease-in-out"
                                onClick={() => handleNumericButtonClick("2")}
                            >
                                2
                            </button>
                            <button
                                className="w-full h-full bg-darkPurple rounded-xl text-white font-semibold text-4xl shadow-sm hover:scale-95 transition-all ease-in-out"
                                onClick={() => handleNumericButtonClick("3")}
                            >
                                3
                            </button>
                            <button
                                className="w-full h-full bg-darkPurple rounded-xl text-white font-semibold text-4xl shadow-sm hover:scale-95 transition-all ease-in-out"
                                onClick={() => handleNumericButtonClick("4")}
                            >
                                4
                            </button>
                            <button
                                className="w-full h-full bg-darkPurple rounded-xl text-white font-semibold text-4xl shadow-sm hover:scale-95 transition-all ease-in-out"
                                onClick={() => handleNumericButtonClick("5")}
                            >
                                5
                            </button>
                            <button
                                className="w-full h-full bg-darkPurple rounded-xl text-white font-semibold text-4xl shadow-sm hover:scale-95 transition-all ease-in-out"
                                onClick={() => handleNumericButtonClick("6")}
                            >
                                6
                            </button>
                            <button
                                className="w-full h-full bg-darkPurple rounded-xl text-white font-semibold text-4xl shadow-sm hover:scale-95 transition-all ease-in-out"
                                onClick={() => handleNumericButtonClick("7")}
                            >
                                7
                            </button>
                            <button
                                className="w-full h-full bg-darkPurple rounded-xl text-white font-semibold text-4xl shadow-sm hover:scale-95 transition-all ease-in-out"
                                onClick={() => handleNumericButtonClick("8")}
                            >
                                8
                            </button>
                            <button
                                className="w-full h-full bg-darkPurple rounded-xl text-white font-semibold text-4xl shadow-sm hover:scale-95 transition-all ease-in-out"
                                onClick={() => handleNumericButtonClick("9")}
                            >
                                9
                            </button>
                            <button
                                className="w-full h-full bg-redColor rounded-xl text-white flex items-center justify-center shadow-sm hover:scale-95 transition-all ease-in-out"
                                onClick={() =>
                                    setUserResponse((prev) => prev.slice(0, -1))
                                }
                            >
                                <Delete className="w-10 h-10" />
                            </button>
                            <button
                                className="w-full h-full bg-darkPurple rounded-xl text-white font-semibold text-4xl shadow-sm hover:scale-95 transition-all ease-in-out"
                                onClick={() => handleNumericButtonClick("0")}
                            >
                                0
                            </button>
                            <button
                                className="w-full h-full bg-greenColor rounded-xl text-white flex items-center justify-center shadow-sm hover:scale-95 transition-all ease-in-out"
                                onClick={() => checkIfUserIsCorrect()}
                            >
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
                        onCancel={() => setShowModal(false)}
                    />
                )}
            </AnimatePresence>
        </motion.div>
    );
}
export default Game;
