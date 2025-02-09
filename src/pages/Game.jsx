import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { HiMiniChevronLeft } from "react-icons/hi2";
import { useNavigate } from "react-router";
import Modal from "../components/Modal";
import { motion } from "framer-motion";
import { scrollFromRight } from "../animations/pageAnimations";
import { ArrowRight, Delete } from "lucide-react";
import redSadFace from "../assets/images/elements/red-sad-face.svg";
import greenHappyFace from "../assets/images/elements/green-happy-face.svg";

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
			document.removeEventListener("visibilitychange", handleVisibilityChange);
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
				className="absolute flex items-center font-medium cursor-pointer text-darkPurple top-8 left-14 max-sm:left-4"
			>
				<HiMiniChevronLeft size={24} />
				Retornar
			</span>
			<main className="max-w-6xl p-6 pt-20 mx-auto">
				{/* Barra de progresso */}
				<div className="w-full h-5 mb-20 bg-skeletonLoadingBase rounded-full max-[580px]:mb-10">
					<div
						className="h-5 rounded-full bg-darkPurple"
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
						<p className="text-[192px] font-black text-darkPurple text-center max-lg:text-[160px] max-[810px]:text-9xl max-sm:text-8xl h-full aling  max-[580px]:mb-10">
							{currentMultiplicatipn}
						</p>
						<div className="flex justify-evenly gap-4 max-[580px]:justify-between">
							<div className="flex items-center gap-2">
								<img
									src={greenHappyFace}
									alt={`${greenHappyFace}'s image`}
									className="pointer-events-none select-none h-16 max-sm:h-12 max-[580px]:h-10    "
								/>
								<div className="flex flex-col">
									<span className="text-greenColor font-extrabold text-2xl leading-4 max-[580px]:text-xl max-[580px]:leading-3">
										40
									</span>
									<span className="font-medium text-darkGray text-lg max-[580px]:text-base">
										Acertos
									</span>
								</div>
							</div>
							<div className="flex items-center gap-2">
								<img
									src={redSadFace}
									alt={`${redSadFace}'s image`}
									className="pointer-events-none select-none h-16 max-sm:h-12 max-[580px]:h-10"
								/>
								<div className="flex flex-col">
									<span className="text-redColor font-extrabold text-2xl leading-4 max-[580px]:text-xl max-[580px]:leading-3">
										10
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
							className="w-full p-4 border border-grayColor outline-none bg-transparent rounded-xl mb-2 max-[580px]:p-3"
							disabled
							type="number"
							value="12"
						/>
						<div className="grid grid-cols-[repeat(3,112px)] auto-rows-[72px] gap-2 max-md:grid-cols-[repeat(3,80px)] max-md:auto-rows-[64px] max-[580px]:grid-cols-[repeat(3,1fr)] max-[580px]:auto-rows-[9vh]">
							<button className="w-full h-full text-4xl font-semibold text-white transition-all ease-in-out shadow-sm bg-darkPurple rounded-xl hover:scale-95">
								1
							</button>
							<button className="w-full h-full text-4xl font-semibold text-white transition-all ease-in-out shadow-sm bg-darkPurple rounded-xl hover:scale-95">
								2
							</button>
							<button className="w-full h-full text-4xl font-semibold text-white transition-all ease-in-out shadow-sm bg-darkPurple rounded-xl hover:scale-95">
								3
							</button>
							<button className="w-full h-full text-4xl font-semibold text-white transition-all ease-in-out shadow-sm bg-darkPurple rounded-xl hover:scale-95">
								4
							</button>
							<button className="w-full h-full text-4xl font-semibold text-white transition-all ease-in-out shadow-sm bg-darkPurple rounded-xl hover:scale-95">
								5
							</button>
							<button className="w-full h-full text-4xl font-semibold text-white transition-all ease-in-out shadow-sm bg-darkPurple rounded-xl hover:scale-95">
								6
							</button>
							<button className="w-full h-full text-4xl font-semibold text-white transition-all ease-in-out shadow-sm bg-darkPurple rounded-xl hover:scale-95">
								7
							</button>
							<button className="w-full h-full text-4xl font-semibold text-white transition-all ease-in-out shadow-sm bg-darkPurple rounded-xl hover:scale-95">
								8
							</button>
							<button className="w-full h-full text-4xl font-semibold text-white transition-all ease-in-out shadow-sm bg-darkPurple rounded-xl hover:scale-95">
								9
							</button>
							<button className="flex items-center justify-center w-full h-full text-white transition-all ease-in-out shadow-sm bg-redColor rounded-xl hover:scale-95">
								<Delete className="w-10 h-10" />
							</button>
							<button className="w-full h-full text-4xl font-semibold text-white transition-all ease-in-out shadow-sm bg-darkPurple rounded-xl hover:scale-95">
								0
							</button>
							<button className="flex items-center justify-center w-full h-full text-white transition-all ease-in-out shadow-sm bg-greenColor rounded-xl hover:scale-95">
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
