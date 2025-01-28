import { scrollFromRight } from "../animations/pageAnimations";
import ButtonPageBack from "../components/buttons/ButtonPageBack";
import { motion } from "framer-motion";

function EditProfile() {
    document.title = "Editar perfil · Jogo do Glécio";

    return (
        <motion.div
            variants={scrollFromRight()}
            initial="initial"
            animate="animate"
            exit="exit"
        >
            <ButtonPageBack to="/" replace={true}>
                Retornar
            </ButtonPageBack>
        </motion.div>
    );
}

export default EditProfile;
