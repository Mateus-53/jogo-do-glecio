import { AnimatePresence, motion } from "framer-motion";
import { Trash2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { HiArrowPath, HiFire, HiStar } from "react-icons/hi2";
import { IoMdCompass } from "react-icons/io";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { toast } from "react-toastify";
import { fade } from "../animations/pageAnimations";
import ButtonDanger from "../components/buttons/ButtonDanger";
import {
    getRankingGlobal,
    getRankingNormal,
    resetRanking,
} from "../services/rankingService";
import { getLocalUserInfo } from "../utils/userUtils";
import ButtonSupport from "./buttons/ButtonSupport";
import Modal from "./Modal";

function RankingList() {
    const [rankingNormalList, setRankingNormalList] = useState([]);
    const [rankingGlobalList, setRankingGlobalList] = useState([]);
    const [activeTab, setActiveTab] = useState("normal");

    const [loadedTabs, setLoadedTabs] = useState({
        normal: false,
        global: false,
    });

    const [normalScrollPosition, setNormalScrollPosition] = useState(0);
    const [globalScrollPosition, setGlobalScrollPosition] = useState(0);

    const [showGradientTop, setShowGradientTop] = useState(true);
    const [showGradientBottom, setShowGradientBottom] = useState(false);

    const [isRankingUpdating, setIsRankingUpdating] = useState(false);
    const [isRankingReseting, setIsRankingReseting] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const rankingListContainerRef = useRef(null);

    const [userInfo, setUserInfo] = useState({});

    useEffect(() => {
        const info = getLocalUserInfo();
        setUserInfo(info);
    }, []);

    const fetchRankingNormal = async () => {
        setIsRankingUpdating(true);

        try {
            const ranking = await getRankingNormal();

            setRankingNormalList(ranking);
            setLoadedTabs((prev) => ({ ...prev, normal: true }));
        } catch (error) {
            toast.error(
                error.message ||
                    "Erro ao buscar dados do ranking. Tente novamente mais tarde.",
                {
                    className: "bg-white",
                }
            );
        }
        setIsRankingUpdating(false);
    };

    const fetchRankingGlobal = async () => {
        setIsRankingUpdating(true);

        try {
            const ranking = await getRankingGlobal();

            setRankingGlobalList(ranking);
            setLoadedTabs((prev) => ({ ...prev, global: true }));
        } catch (error) {
            toast.error(
                error.message ||
                    "Erro ao buscar dados do ranking. Tente novamente mais tarde.",
                {
                    className: "bg-white",
                }
            );
        }

        setIsRankingUpdating(false);
    };

    const updateRanking = async () => {
        if (isRankingUpdating) return;
        setIsRankingUpdating(true);

        try {
            if (activeTab === "normal") {
                setRankingNormalList([]);
                await fetchRankingNormal();
            } else {
                setRankingGlobalList([]);
                await fetchRankingGlobal();
            }
        } catch (error) {
            toast.error(
                error.message ||
                    "Erro ao atualizar ranking. Tente novamente mais tarde",
                { className: "bg-white" }
            );
        } finally {
            setIsRankingUpdating(false);
        }
    };

    const handleTabChange = (tab) => {
        setActiveTab(tab);

        if (tab === "normal" && !loadedTabs.normal) {
            fetchRankingNormal();
        } else if (tab === "global" && !loadedTabs.global) {
            fetchRankingGlobal();
        }
    };

    const handleResetRanking = async () => {
        setIsRankingReseting(true)

        try {
            const response = await resetRanking();

            if (response.status_code === 200) {
                toast.success(response.message, { className: "bg-white" });
            }
        } catch (error) {
            toast.error(
                error.message ||
                    "Erro ao limpar o ranking. Tente novamente mais tarde",
                { className: "bg-white" }
            );
        } finally {
            setShowModal(false);
            setIsRankingReseting(false)
        }
    };

    useEffect(() => {
        if (!loadedTabs.normal) {
            fetchRankingNormal();
        }
    }, [loadedTabs.normal]);

    useEffect(() => {
        const container = rankingListContainerRef.current;

        if (!container) return;

        const handleScroll = () => {
            const scrollTop = container.scrollTop;

            if (activeTab === "normal") {
                setNormalScrollPosition(scrollTop);
            } else if (activeTab === "global") {
                setGlobalScrollPosition(scrollTop);
            }

            const isAtTop = scrollTop > 0;
            const isAtBottom =
                container.scrollHeight - scrollTop === container.offsetHeight;

            setShowGradientTop(isAtTop);
            setShowGradientBottom(!isAtBottom);
        };

        container.addEventListener("scroll", handleScroll);

        container.scrollTop =
            activeTab === "normal"
                ? normalScrollPosition
                : globalScrollPosition;

        if (container) {
            setShowGradientTop(container.scrollTop > 0);
        }

        return () => container.removeEventListener("scroll", handleScroll);
    }, [activeTab, normalScrollPosition, globalScrollPosition]);

    const activeList =
        activeTab === "normal" ? rankingNormalList : rankingGlobalList;

    return (
        <>
            <div className="flex flex-col gap-3 p-8 max-md:pt-20 md:p-10 md:border rounded-2xl max-sm:w-screen max-sm:h-screen md:shadow-sm min-w-[350px] lg:min-w-[380px] md:w-1/2 text-darkGray border-grayColor lg:w-1/3">
                <h2 className="text-2xl font-bold">Ranking</h2>
                {!userInfo.isAdmin && (
                    <p className="text-base">
                        Veja os melhores jogadores competindo para alcançar as
                        maiores pontuações no jogo de tabuada.
                    </p>
                )}

                <div className="flex flex-col gap-2">
                    {userInfo.isAdmin && (
                        <ButtonDanger
                            className="flex items-center justify-center w-full h-12 gap-2 p-3 border rounded-lg font text-darkGray border-grayColor"
                            onClick={() => setShowModal(true)}
                        >
                            <Trash2 className="w-5 h-5" strokeWidth={1.6} />
                            Limpar
                        </ButtonDanger>
                    )}
                    <ButtonSupport
                        className="flex items-center justify-center w-full h-12 gap-2 p-3 border rounded-lg font text-darkGray border-grayColor"
                        onClick={updateRanking}
                    >
                        <HiArrowPath
                            className={`w-5 h-5 ${
                                isRankingUpdating ? "animate-spin" : ""
                            }`}
                        />
                        Atualizar
                    </ButtonSupport>
                </div>
                <div className="flex gap-5">
                    <button
                        className={`flex items-center justify-center w-1/2 gap-1 pb-1 text-base font-medium border-b-2 ${
                            activeTab === "normal"
                                ? "border-b-darkPurple text-darkPurple"
                                : "border-b-darkGray text-darkGray"
                        }`}
                        onClick={() => handleTabChange("normal")}
                    >
                        <IoMdCompass className="w-5 h-5" />
                        Normal
                    </button>
                    <button
                        className={`flex items-center justify-center w-1/2 gap-1 pb-1 text-base font-medium border-b-2 ${
                            activeTab === "global"
                                ? "border-b-darkPurple text-darkPurple"
                                : "border-b-darkGray text-darkGray"
                        }`}
                        onClick={() => handleTabChange("global")}
                    >
                        <HiFire className="w-5 h-5" />
                        Global
                    </button>
                </div>
                {/* Listagem */}
                <div className="relative mt-2 max-sm:flex-1 max-sm:overflow-hidden">
                    <div
                        ref={rankingListContainerRef}
                        className="flex flex-col pr-2 overflow-y-auto divide-y-2 divide-grayColor/90 max-h-full md:max-h-72"
                    >
                        {activeList.length > 0 ? (
                            activeList.map((item, index) => (
                                <AnimatePresence
                                    key={`${activeTab}-${item.user.id}-${index}`}
                                    mode="wait"
                                >
                                    <motion.div
                                        key={`${activeTab}-${item.user.id}-${index}`}
                                        variants={fade()}
                                        initial="initial"
                                        animate="animate"
                                        exit="exit"
                                        className="flex items-center justify-between py-2 last:pb-0 first:pt-0"
                                    >
                                        <div className="flex items-center min-w-0">
                                            <span
                                                className={`min-w-6 ${
                                                    item.user.id == userInfo.id
                                                        ? "text-purpleSecondary"
                                                        : ""
                                                }`}
                                            >
                                                {index + 1}º
                                            </span>
                                            <img
                                                src={
                                                    item.user.avatar.path_128px
                                                }
                                                alt={`${item.user.name}'s avatar`}
                                                className="w-10 h-10 mx-2 rounded-full bg-skeletonLoadingBase"
                                            />
                                            <div className="flex flex-col flex-1 min-w-0">
                                                <h3
                                                    title={item.user.name}
                                                    className="w-full overflow-hidden text-base leading-4 capitalize text-purpleGray text-ellipsis whitespace-nowrap"
                                                >
                                                    {item.user.name}
                                                </h3>
                                                <span
                                                    title={
                                                        item.user.course.name
                                                    }
                                                    className="w-full overflow-hidden text-sm text-darkGray text-ellipsis whitespace-nowrap"
                                                >
                                                    {item.user.course.name}
                                                </span>
                                            </div>
                                        </div>
                                        <div
                                            className={`${
                                                item.user.id === userInfo.id
                                                    ? "text-purpleSecondary"
                                                    : ""
                                            } flex items-cente gap-1 flex-shrink-0 w-11 font-medium`}
                                            title={`${item.score} pontos`}
                                        >
                                            <HiStar className="w-5 h-5" />
                                            <span>{item.score}</span>
                                        </div>
                                    </motion.div>
                                </AnimatePresence>
                            ))
                        ) : (
                            <SkeletonTheme
                                baseColor="var(--skeleton-loading-base)"
                                highlightColor="var(--skeleton-loading-highlight)"
                            >
                                {Array.from({ length: 20 }).map((_, i) => (
                                    <RankingItemSkeleton key={i} />
                                ))}
                            </SkeletonTheme>
                        )}
                    </div>
                    {showGradientTop && (
                        <div className="absolute top-0 left-0 w-full h-16 pointer-events-none bg-gradient-to-t from-transparent to-white" />
                    )}
                    {showGradientBottom && (
                        <div className="absolute bottom-0 left-0 w-full h-16 pointer-events-none bg-gradient-to-b from-transparent to-white" />
                    )}
                </div>
            </div>
            <AnimatePresence mode="wait">
                {showModal && (
                    <Modal
                        title="Tem certeza que deseja resetar o ranking?"
                        message="Todo os dados do ranking serão apagados."
                        confirmText="Resetar"
                        isLoading={isRankingReseting}
                        onConfirm={() => handleResetRanking()}
                        onCancel={() => setShowModal(false)}
                    />
                )}
            </AnimatePresence>
        </>
    );
}

export default RankingList;

const RankingItemSkeleton = () => {
    return (
        <div className="flex items-center justify-between py-2 last:pb-0 first:pt-0">
            <div className="flex items-center min-w-0">
                <Skeleton width={20} height={20} className="mr-2" />
                <Skeleton circle height={40} width={40} className="mx-2" />
                <div className="flex flex-col flex-1 min-w-0">
                    <Skeleton
                        width="80%"
                        height={20}
                        className="mb-1"
                        style={{ minWidth: "100px" }}
                    />
                    <Skeleton width="60%" height={16} />
                </div>
            </div>
            <div className="flex items-center flex-shrink-0 gap-1">
                <Skeleton width={20} height={20} className="mr-1" />
                <Skeleton width={30} height={16} />
            </div>
        </div>
    );
};
