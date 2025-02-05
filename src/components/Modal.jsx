import { motion } from "framer-motion";
import ButtonDanger from "./buttons/ButtonDanger";
import ButtonSupport from "./buttons/ButtonSupport";
import { fade } from "../animations/pageAnimations";
import { X } from "lucide-react";

function Modal({ title, message, type, onConfirm, onCancel }) {
	return (
		<motion.div
			variants={fade()}
			initial="initial"
			animate="animate"
			exit="exit"
			className="fixed top-0 left-0 flex items-center justify-center w-screen h-screen px-5 backdrop-blur-sm"
		>
			<div className="flex flex-col p-4 bg-white border shadow-md rounded-2xl min-w-[400px] min-h-[200px] justify-center">
				<div className="flex items-center justify-between">
					<h3 className="text-xl font-bold text-purpleGray">{title}</h3>
					<X
						strokeWidth={1.5}
						className="transition-all ease-in-out cursor-pointer hover:scale-110"
						onClick={onCancel}
					/>
				</div>
				<p className="mt-1">{message}</p>
				<div className="flex mt-4">
					<ButtonDanger type="button" onClick={onConfirm}>
						Sair
					</ButtonDanger>
				</div>
			</div>
		</motion.div>
	);
}

export default Modal;
