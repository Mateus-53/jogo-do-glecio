import { motion } from "framer-motion";
import ButtonDanger from "./buttons/ButtonDanger";
import ButtonSupport from "./buttons/ButtonSupport";
import { fade } from "../animations/pageAnimations";

function Modal({ title, message, type, onConfirm, onCancel }) {
    return (
        <motion.div
            variants={fade()}
            initial="initial"
            animate="animate"
            exit="exit"
            className="fixed top-0 left-0 backdrop-blur-sm w-screen h-screen flex items-center justify-center px-5"
        >
            <div className="bg-white rounded-2xl h-56 max-w-[350px] p-5 flex flex-col justify-between shadow-md border">
                <div>
                    <h3 className="text-3xl text-purpleGray font-extrabold">
                        {title}
                    </h3>
                    <p>{message}</p>
                </div>
                <div className="flex flex-row gap-2">
                    <ButtonSupport type="button" onClick={onCancel}>
                        Cancelar
                    </ButtonSupport>
                    <ButtonDanger type="button" onClick={onConfirm}>
                        Sair
                    </ButtonDanger>
                </div>
            </div>
        </motion.div>
    );
}

export default Modal;
