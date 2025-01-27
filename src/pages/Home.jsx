import { HiPencilSquare, HiStar } from "react-icons/hi2";
import { useEffect, useState } from "react";
import { isTokenExpiringSoon } from "../utils/authUtils";
import { Link, useNavigate } from "react-router";
import { getLocalUserInfo } from "../utils/userUtils";
import ButtonPrimary from "../components/buttons/ButtonPrimary";
import ButtonGreen from "../components/buttons/ButtonGreen";
import { HiOutlineInformationCircle, HiOutlinePlay } from "react-icons/hi2";
import Ranking from "../components/Ranking";

function Home() {
    document.title = "Início · Jogo do Glécio";

    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useState({});

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

    return (
			<main className="flex gap-12 lg:gap-24 p-10 max-w-7xl mx-auto">
				<div className="flex flex-col w-full gap-32 md:w-1/2 lg:w-2/3">
					{/* Profile header */}
					<div className="flex items-center gap-8 md:gap-4 lg:gap-8">
						<img
							src={userInfo.avatarDefault}
							alt={`${userInfo.name ?? "Anônimo"}'s avatar`}
							className="pointer-events-none select-none w-28"
						/>
						<div className="w-full">
							<p className="text-base text-purpleGray">Seja bem-vindo,</p>
							<p className="text-4xl font-black leading-8 text-darkPurple">
								{userInfo.name ?? "Anônimo"}
							</p>
							<div className="flex items-center justify-between mt-3 text-darkGray">
								<p className="flex items-center gap-1 text-sm">
									<HiStar className="w-5 h-5" />
									Maior pontuação: {userInfo.maxScore}
								</p>
								<Link to="/edit-profile" className="text-purpleGray">
									<HiPencilSquare
										className="p-1 w-7 h-7"
										title="Editar perfil"
									/>
								</Link>
							</div>
						</div>
					</div>
					{/* Middle text */}
					<div className="flex flex-col gap-3">
						<h1 className="text-4xl font-black leading-8 text-darkPurple">
							Lorem Ipsum
						</h1>
						<p className="text-base text-purpleGray">
							Lorem, ipsum dolor sit amet consectetur adipisicing elit.
							Voluptatibus reiciendis est officiis pariatur exercitationem
							incidunt, esse deserunt enim? Quibusdam quos, hic optio veritatis
							error vel maiores dolore magni blanditiis dolorum!
						</p>
						<div className="flex gap-3">
							<ButtonPrimary>
								<HiOutlineInformationCircle className="w-6 h-6" /> Saiba mais
							</ButtonPrimary>
							<ButtonGreen type="submit">
								<HiOutlinePlay className="w-6 h-6" />
								Jogar agora!
							</ButtonGreen>
						</div>
					</div>
				</div>
				<Ranking></Ranking>
			</main>
		);
}

export default Home;
