import { useNavigate } from "react-router";
import { HiMiniChevronLeft } from "react-icons/hi2";
import Modal from "../components/Modal";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";

function Game() {
    document.title = "Tabuada · Jogo do Glécio";

    const [showModal, setShowModal] = useState(false);

    const navigate = useNavigate();

    const handleModalConfirm = () => {
        navigate("/", { replace: true });
    };
    const handleModalCancel = () => {
        setShowModal(false);
        //lembrar: fazer com que o tempo pause quando o modal estiver ativo
    };

    return (
        <div>
            <span
                onClick={() => setShowModal(true)}
                className="flex cursor-pointer text-darkPurple items-center font-medium p-2 absolute top-8 left-14 max-sm:left-4"
            >
                <HiMiniChevronLeft size={24} />
                Retornar
            </span>

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
        </div>
    );
}
export default Game;
