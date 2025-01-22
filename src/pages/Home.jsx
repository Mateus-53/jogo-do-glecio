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
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							fill="currentColor"
							className="w-5 "
						>
							<path
								fillRule="evenodd"
								d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
								clipRule="evenodd"
							/>
						</svg>
						Maior pontuação: {userInfo.maxScore}
					</p>
					<Link to="/edit-profile" className="text-purpleGray">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							fill="currentColor"
							className="w-5"
						>
							<path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z" />
							<path d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z" />
						</svg>
					</Link>
				</div>
			</div>
		</div>
	);
}

export default Home;
