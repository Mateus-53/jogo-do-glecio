import { AnimatePresence, motion } from "framer-motion";
import { Info, LogOut, Trophy, UserRoundPen } from "lucide-react";
import { useEffect, useState } from "react";
import { HiOutlinePlay, HiStar } from "react-icons/hi2";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { Link, useNavigate } from "react-router";
import { fade } from "../animations/pageAnimations";
import ButtonPrimary from "../components/buttons/ButtonPrimary";
import ButtonSuccess from "../components/buttons/ButtonSuccess";
import ButtonSupport from "../components/buttons/ButtonSupport";
import RankingList from "../components/RankingList";
import { logoutUser } from "../services/authService";
import { isTokenExpiringSoon } from "../utils/authUtils";
import { getLocalUserInfo } from "../utils/userUtils";

function Home() {
    document.title = "Início · Jogo do Glécio";

    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useState({});
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    const [mobileDropDown, setMobileDropDown] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("ACCESS_TOKEN");

        if (!token || isTokenExpiringSoon(token)) {
            localStorage.removeItem("ACCESS_TOKEN");
            navigate("/login", { replace: true });
        }
    }, [navigate]);

    useEffect(() => {
        const info = getLocalUserInfo();
        setUserInfo(info);
    }, []);

    useEffect(() => {
        const handleResize = () => {
            const viewportWidth =
                window.visualViewport?.width || window.innerWidth;
            setWindowWidth(viewportWidth);
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <>
            <motion.main
                initial="initial"
                animate="animate"
                exit="exit"
                variants={fade()}
                className="flex max-w-6xl gap-6 p-6 md:p-10 lg:gap-24 md:mx-auto"
                onAnimationStart={() => {
                    const viewportWidth =
                        window.visualViewport?.width || window.innerWidth;
                    setWindowWidth(viewportWidth);
                }}
            >
                <div className="flex flex-col w-full gap-14 md:gap-32 md:w-1/2 lg:w-2/3 relative">
                    {/* Profile header */}
                    <div className="flex items-center gap-8 md:gap-4 lg:gap-8">
                        {userInfo.avatarDefault ? (
                            <img
                                src={userInfo.avatarDefault}
                                alt={`${userInfo.name ?? "Anônimo"}'s avatar`}
                                className="rounded-full z-50 w-28 bg-skeletonLoadingBase max-sm:absolute max-sm:w-11 max-sm:top-0 right-0 max-sm:cursor-pointer"
                                onClick={() =>
                                    setMobileDropDown(!mobileDropDown)
                                }
                            />
                        ) : (
                            <SkeletonTheme
                                baseColor="var(--skeleton-loading-base)"
                                highlightColor="var(--skeleton-loading-highlight)"
                            >
                                <Skeleton
                                    circle={true}
                                    className="w-28 h-28 rounded-full"
                                />
                            </SkeletonTheme>
                        )}

                        <div className="w-full max-sm:mt-14">
                            <p className="text-base text-purpleGray">
                                Seja bem-vindo(a),
                            </p>
                            <p className="text-3xl md:text-4xl font-black leading-8 text-darkPurple">
                                {userInfo.name ?? "Anônimo"}
                            </p>
                            <div className="flex items-center justify-between mt-3 text-darkGray">
                                <p className="flex items-center gap-1 text-sm">
                                    <HiStar className="w-5 h-5" />
                                    Maior pontuação: {userInfo.maxScore ?? "00"}
                                </p>
                                <div
                                    className={`flex z-50 items-center gap-2 text-purpleGray max-sm:absolute max-sm:w-40 max-sm:bg-white max-sm:shadow-md max-sm:border max-sm:rounded-xl max-sm:flex-col max-sm:items-start top-12 right-1 max-sm:${
                                        mobileDropDown ? "flex" : "hidden"
                                    }`}
                                >
                                    <Link
                                        to="/edit-profile"
                                        title="Editar perfil"
                                        className="flex gap-2 max-sm:px-4 max-sm:py-1 max-sm:pt-3 max-sm:w-full"
                                    >
                                        <UserRoundPen
                                            strokeWidth={1.8}
                                            className="w-5 h-5 transition-all ease-in-out hover:scale-110"
                                        />
                                        <span className="sm:hidden">
                                            Editar perfil
                                        </span>
                                    </Link>
                                    <span
                                        title="Sair"
                                        className="flex gap-2 max-sm:px-4 max-sm:pb-3 max-sm:py-1 max-sm:w-full cursor-pointer"
                                        onClick={logoutUser}
                                    >
                                        <LogOut
                                            strokeWidth={1.8}
                                            className="w-5 h-5 transition-all ease-in-out cursor-pointer hover:scale-110"
                                        />
                                        <span className="sm:hidden select-none">Sair</span>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Middle text */}
                    <div className="flex flex-col md:gap-3 gap-5">
                        <h1 className="text-4xl font-black leading-8 text-darkPurple">
                            Tabuada do Glécio
                        </h1>
                        <p className="text-base text-purpleGray">
                            Aprimore suas habilidades com nosso jogo de tabuada!
                            Teste seus conhecimentos, avance nos desafios e
                            aprenda de forma divertida. Ficamos muito felizes em
                            ter você aqui!
                        </p>
                        <div className="flex gap-3 max-sm:flex-col">
                            <Link to="/play" className="w-full">
                                <ButtonSuccess invertedContent={true}>
                                    <HiOutlinePlay className="w-6 h-6" />
                                    Jogar agora!
                                </ButtonSuccess>
                            </Link>
                            {windowWidth < 768 && (
                                <Link to="/ranking" className="w-full">
                                    <ButtonSupport invertedContent={true}>
                                        <Trophy
                                            className="w-6 h-6"
                                            strokeWidth={1.5}
                                        />
                                        Ranking
                                    </ButtonSupport>
                                </Link>
                            )}
                            <Link to="/about" className="w-full">
                                <ButtonPrimary invertedContent={true}>
                                    <Info
                                        className="w-6 h-6"
                                        strokeWidth={1.6}
                                    />{" "}
                                    Saiba mais
                                </ButtonPrimary>
                            </Link>
                        </div>
                    </div>
                </div>
                {windowWidth >= 768 && <RankingList />}
            </motion.main>
            <AnimatePresence mode="wait">
                {mobileDropDown && (
                    <motion.div
                        className="w-screen h-screen absolute inset-0 backdrop-blur-sm z-0"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.1 }}
                    />
                )}
            </AnimatePresence>
        </>
    );
}

export default Home;
