import { useEffect, useState } from "react";
import { getRankingGlobal, getRankingNormal } from "../services/rankingService";
import { HiStar } from "react-icons/hi";
import { HiMapPin, HiGlobeAmericas } from "react-icons/hi2";

function Ranking() {
	const [rankingNormalList, setRankingNomalList] = useState([]);
	const [rankingGlobalList, setRankingGlobalList] = useState([]);
	const [activeTab, setActiveTab] = useState("normal");

	/** Funções criadas fora de um useEffect pois é preciso executa-las no contexto do código quando o usuário quiser atualizar o ranking*/
	const fetchRankingNormal = async () => {
		const ranking = await getRankingNormal();
		setRankingNomalList(ranking);
	};

	const fetchRankingGlobal = async () => {
		const ranking = await getRankingGlobal();
		setRankingGlobalList(ranking);
	};

	useEffect(() => {
		fetchRankingNormal();
		fetchRankingGlobal();
	}, []);

	const activeList =
		activeTab === "normal" ? rankingNormalList : rankingGlobalList;

	return (
		<div className="flex flex-col gap-3 p-10 border rounded-md shadow-sm max-md:hidden md:w-1/2 text-darkGray border-grayColor lg:w-1/3">
			<h2 className="text-2xl font-bold">Ranking</h2>
			<p className="text-base">
				Veja os melhores jogadores competindo para alcançar as maiores
				pontuações no jogo de tabuada. Será que você consegue superar seus
				amigos e chegar ao topo?
			</p>
			<div className="flex gap-5">
				<button
					className={`flex items-center justify-start w-1/2 gap-1 pb-1 text-base font-medium border-b-2 ${
						activeTab === "normal"
							? "border-b-darkPurple text-darkPurple"
							: "border-b-darkGray text-darkGray"
					}`}
					onClick={() => setActiveTab("normal")}
				>
					<HiMapPin className="w-5 h-5" />
					Normal
				</button>
				<button
					className={`flex items-center justify-start w-1/2 gap-1 pb-1 text-base font-medium border-b-2 ${
						activeTab === "global"
							? "border-b-darkPurple text-darkPurple"
							: "border-b-darkGray text-darkGray"
					}`}
					onClick={() => setActiveTab("global")}
				>
					<HiGlobeAmericas className="w-5 h-5" />
					Global
				</button>
			</div>
			{/* Listagem */}
			<div className="flex flex-col pr-2 overflow-y-auto divide-y-2 divide-grayColor max-h-72">
				{activeList.length > 0 ? (
					activeList.map((item, index) => (
						<div
							key={index}
							className="flex items-center justify-between py-2 last:pb-0 first:pt-0 "
						>
							<div className="flex items-center">
								<span>{index + 1}º</span>
								<img
									src={item.user.avatar.path_default}
									alt={`${item.user.name}'s avatar`}
									className="w-10 h-10 mx-2"
								/>
								<div className="flex flex-col">
									<h3 className="text-base leading-4 capitalize text-purpleGray">
										{item.user.name}
									</h3>
									<span className="text-sm text-darkGray">
										{item.user.course.name}
									</span>
								</div>
							</div>
							<div className="flex items-center gap-1">
								<HiStar className="w-5 h-5" />
								<span>{item.score}</span>
							</div>
						</div>
					))
				) : (
					<p>
						Carregando{" "}
						{activeTab === "normal" ? "ranking normal" : "ranking global"}...
					</p>
				)}
			</div>
		</div>
	);
}

export default Ranking;
