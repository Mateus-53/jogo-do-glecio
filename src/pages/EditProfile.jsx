import { useEffect, useState } from "react";
import { scrollFromRight } from "../animations/pageAnimations";
import { motion } from "framer-motion";
import { getLocalUserInfo } from "../utils/userUtils";
import ButtonPageBack from "../components/buttons/ButtonPageBack";
import ButtonSuccess from "../components/buttons/ButtonSuccess";
import Input from "../components/Input";
import Select from "../components/Select";

function EditProfile() {
	document.title = "Editar perfil · Jogo do Glécio";
	const [userInfo, setUserInfo] = useState({});
	const [userData, setUserData] = useState({
		avatar_id: 1,
		name: null,
		course_id: null,
		email: null,
		password: null,
	});

	useEffect(() => {
		const info = getLocalUserInfo();
		setUserInfo(info);
	}, []);

	return (
		<motion.div
			variants={scrollFromRight()}
			initial="initial"
			animate="animate"
			exit="exit"
		>
			<main className="flex flex-col max-w-6xl gap-6 p-10 lg:gap-16 md:mx-auto">
				<ButtonPageBack to="/" replace={true}>
					Retornar
				</ButtonPageBack>
				<div className="flex flex-col gap-6">
					<img
						src={userInfo.avatarDefault}
						alt={`${userInfo.name ?? "Anônimo"}'s avatar`}
						className="rounded-full pointer-events-none select-none w-28 bg-skeletonLoadingBase"
					/>
					<Input
						label="Nome"
						name="name"
						type="text"
						placeholder={`${userInfo.name ?? "Anônimo"}`}
						disabled={true}
						onChange={(e) => {
							setUserData((prev) => ({
								...prev,
								name: e.target.value,
							}));
						}}
					/>

					<Input
						label="E-mail"
						name="email"
						type="email"
						placeholder={`${userInfo.email ?? ""}`}
						disabled={true}
						onChange={(e) =>
							setUserData((prev) => ({
								...prev,
								email: e.target.value,
							}))
						}
					/>
					<Input
						label="Senha"
						name="password"
						placeholder="Redefenir Senha"
						disabled={true}
					/>

					<ButtonSuccess>Salvar Alterações</ButtonSuccess>
				</div>
			</main>
		</motion.div>
	);
}

export default EditProfile;
