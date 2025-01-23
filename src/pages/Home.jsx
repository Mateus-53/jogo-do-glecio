import { HiPencilSquare, HiStar } from "react-icons/hi2";
import { useEffect, useState } from "react";
import { isTokenExpiringSoon } from "../utils/authUtils";
import { Link, useNavigate } from "react-router";
import { getLocalUserInfo } from "../utils/userUtils";

function Home() {
	const navigate = useNavigate();
	const [userInfo, setUserInfo] = useState("");

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
		<div className="flex items-center w-1/2 gap-5">
			<img
				src={userInfo.avatarDefault}
				alt={`${userInfo.name ?? "Anônimo"}'s avatar`}
				className="pointer-events-none select-none w-28"
			/>
			<div className="w-full">
				<p className="text-lg text-purpleGray">Seja bem-vindo,</p>
				<h1 className="text-4xl font-black leading-8 text-darkPurple">
					{userInfo.name ?? "Anônimo"}
				</h1>
				<div className="flex items-center justify-between mt-3 text-darkGray">
					<p className="flex items-center gap-1 text-sm">
						<HiStar className="w-5 h-5"/>
						Maior pontuação: {userInfo.maxScore}
					</p>
					<Link to="/edit-profile" className="text-purpleGray">
						<HiPencilSquare className="w-7 h-7 p-1" title="Editar perfil"/>
					</Link>
				</div>
			</div>
		</div>
	);
}

export default Home;
