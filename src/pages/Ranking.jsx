import { useNavigate } from "react-router";
import RankingList from "../components/RankingList";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { scrollFromRight } from "../animations/pageAnimations";
import ButtonPageBack from "../components/buttons/ButtonPageBack";

function Ranking() {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    const navigate = useNavigate();

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 768) {
                navigate("/", { replace: true });
            }
        };

        window.addEventListener("resize", handleResize);

        handleResize();

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, [navigate]);

    return (
        <motion.main
            initial="initial"
            animate="animate"
            exit="exit"
            variants={scrollFromRight()}
        >
            <ButtonPageBack to="/" absolute={true}>Retornar</ButtonPageBack>
            <RankingList />
        </motion.main>
    );
}
export default Ranking;
