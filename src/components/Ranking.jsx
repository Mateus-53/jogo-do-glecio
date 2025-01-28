import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { HiFire, HiStar } from "react-icons/hi2";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { toast } from "react-toastify";
import { fade } from "../animations/pageAnimations";
import { getRankingGlobal, getRankingNormal } from "../services/rankingService";
import { IoMdCompass } from "react-icons/io";
import { getLocalUserInfo } from "../utils/userUtils";

function Ranking() {
	const [rankingNormalList, setRankingNormalList] = useState([]);
	const [rankingGlobalList, setRankingGlobalList] = useState([]);
	const [activeTab, setActiveTab] = useState("normal");
	const [loadedTabs, setLoadedTabs] = useState({
		normal: false,
		global: false,
	});

	const [showGradientTop, setShowGradientTop] = useState(true);
	const [showGradientBottom, setShowGradientBottom] = useState(false);

	const rankingListContainerRef = useRef(null);

	const userId = getLocalUserInfo().id;

	const fetchRankingNormal = async () => {
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
	};

	const fetchRankingGlobal = async () => {
		try {
			const ranking = await getRankingGlobal();

			console.log(ranking);
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
	};

	const handleTabChange = (tab) => {
		setActiveTab(tab);

		if (tab === "normal" && !loadedTabs.normal) {
			fetchRankingNormal();
		} else if (tab === "global" && !loadedTabs.global) {
			fetchRankingGlobal();
		}
	};

	useEffect(() => {
		if (!loadedTabs.normal) {
			fetchRankingNormal();
		}
	}, [loadedTabs.normal]);

	useEffect(() => {
		const handleScroll = () => {
			const container = rankingListContainerRef.current;

			if (!container) return;

			const isAtTop = container.scrollTop > 0;
			const isAtBottom =
				container.scrollHeight - container.scrollTop === container.offsetHeight;

			setShowGradientTop(isAtTop);
			setShowGradientBottom(!isAtBottom);
		};

		const container = rankingListContainerRef.current;
		if (container) {
			container.addEventListener("scroll", handleScroll);
			handleScroll();
			return () => container.removeEventListener("scroll", handleScroll);
		}
	}, []);

	const activeList =
		activeTab === "normal" ? rankingNormalList : rankingGlobalList;

	return (
		<div className="flex flex-col gap-3 p-10 border rounded-2xl shadow-sm min-w-[350px] lg:min-w-[380px] md:w-1/2 text-darkGray border-grayColor lg:w-1/3">
			<h2 className="text-2xl font-bold">Ranking</h2>
			<p className="text-base">
				Veja os melhores jogadores competindo para alcançar as maiores
				pontuações no jogo de tabuada. Será que você consegue superar seus
				amigos e chegar ao topo?
			</p>
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
			<div className="relative">
				<div
					ref={rankingListContainerRef}
					className="flex flex-col pr-2 overflow-y-auto divide-y-2 divide-grayColor/90 max-h-72"
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
												item.user.id == userId ? "text-purpleSecondary" : ""
											}`}
										>
											{index + 1}º
										</span>
										<img
											src={item.user.avatar.path_128px}
											alt={`${item.user.name}'s avatar`}
											className="w-10 h-10 mx-2 bg-skeletonLoadingBase rounded-full"
										/>
										<div className="flex flex-col flex-1 min-w-0">
											<h3
												title={item.user.name}
												className="text-base leading-4 capitalize text-purpleGray w-full overflow-hidden text-ellipsis whitespace-nowrap"
											>
												{item.user.name}
											</h3>
											<span
												title={item.user.course.name}
												className="text-sm text-darkGray w-full overflow-hidden text-ellipsis whitespace-nowrap"
											>
												{item.user.course.name}
											</span>
										</div>
									</div>
									<div
										className={`${
											item.user.id === userId ? "text-purpleSecondary" : ""
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
						<SkeletonTheme baseColor="#EFEAFA" highlightColor="#E7E1F6">
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
	);
}

export default Ranking;

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
			<div className="flex items-center gap-1 flex-shrink-0">
				<Skeleton width={20} height={20} className="mr-1" />
				<Skeleton width={30} height={16} />
			</div>
		</div>
	);
};
