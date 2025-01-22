import { FaCircleXmark, FaCircleCheck } from "react-icons/fa6";
import { CgClose } from "react-icons/cg";
import { motion } from "framer-motion";
import { useEffect } from "react";

const Toast = ({ text, type, onClose }) => {
    
    useEffect(() => {
        const timer = setTimeout(() => {
            if (onClose) {
                onClose();
            }
        }, 8000);

        return () => clearTimeout(timer);
    }, []);

    const toastVariants = {
        hidden: { opacity: 0, x: 100 },
        visible: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: 100 },
    };

    return (
        <motion.div
            id="toast"
            className="absolute right-10 bottom-8 flex items-center w-full max-w-xs p-4 text-purpleGray bg-white rounded-lg shadow"
            role="alert"
            variants={toastVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.3 }}
        >
            <div
                className={`inline-flex items-center justify-center flex-shrink-0 w-8 h-8 rounded-lg ${
                    type == "success"
                        ? " text-green-500 bg-green-200/80"
                        : "text-red-500 bg-red-100"
                }`}
            >
                {type == "success" ? (
                    <FaCircleCheck className="w-5 h-5" />
                ) : (
                    <FaCircleXmark className="w-5 h-5" />
                )}
                <span className="sr-only">Icon</span>
            </div>
            <div className="ms-3 text-sm font-normal">{text}</div>
            <button
                type="button"
                className="ms-auto -mx-1.5 -my-1.5 bg-white text-purpleGray p-1.5 hover:bg-gray-200/60 rounded-lg inline-flex items-center justify-center h-8 w-8"
                data-dismiss-target="#toast"
                aria-label="Close"
                onClick={onClose}
            >
                <span className="sr-only">Close</span>
                <CgClose className="w-5 h-5" />
            </button>
        </motion.div>
    );
};

export default Toast;
