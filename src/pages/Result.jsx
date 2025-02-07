import { useLocation } from "react-router";
import { motion } from "framer-motion";
import Confetti from "react-confetti";
import { useEffect, useState } from "react";
import { getLocalUserInfo } from "../utils/userUtils";

function Result() {
    document.title = "Resultados · Jogo do Glécio"

    const location = useLocation();

    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [windowHeight, setWindowHeight] = useState(window.innerHeight);

    const [userInfo, setUserInfo] = useState({});

    useEffect(() => {
        const info = getLocalUserInfo();
        setUserInfo(info);
    }, []);

    return (
        <>
            <motion.div>
                <main></main>
            </motion.div>

            {location.state?.correctAnswers > userInfo.maxScore && (
                <Confetti
                    width={windowWidth}
                    height={windowHeight}
                    recycle={false}
                    numberOfPieces={280}
                    style={{
                        zIndex: 50,
                    }}
                />
            )}
        </>
    );
}
export default Result;
