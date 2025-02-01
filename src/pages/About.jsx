import ButtonPageBack from "../components/buttons/ButtonPageBack";
import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa6";
import {
    fade,
} from "../animations/pageAnimations";
import { motion } from "framer-motion";

function About() {
    document.title = "Sobre o projeto · Jogo do Glécio";

    return (
        <motion.div
            initial="initial"
            animate="animate"
            exit="exit"
            variants={fade()}
        >
            <ButtonPageBack to="/" replace={true} absolute={true}>
                Retornar
            </ButtonPageBack>
            <main className="max-w-4xl p-8 mx-auto space-y-8 mt-16">
                <div className="space-y-4">
                    <h2 className="text-4xl text-darkPurple font-black">
                        Sobre o projeto
                    </h2>
                    <p>
                        Projeto desenvolvido para auxiliar os alunos da EEEP
                        Elsa Maria Porto Costa Lima a dominarem a tabuada e,
                        assim, tirarem uma boa nota nas provas do professor
                        Glécio. Desenvolvido por Informática 2022/24.
                    </p>
                </div>
                <div className="space-y-4">
                    <h2 className="text-4xl text-darkPurple font-black">
                        Desenvolvedores
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-7">
                        <Developer
                            name="Hiago Bernardo"
                            role="UX Writer"
                            avatarUrl="https://avatars.githubusercontent.com/u/105991097?s=256&v=4"
                            instagramUrl="https://www.instagram.com/hiago.bernardoo/"
                            githubUrl="https://github.com/hi-bernardo"
                            linkedinUrl=""
                        />
                        <Developer
                            name="Lucas Davi"
                            role="Desenvolvedor Front-End"
                            avatarUrl="https://avatars.githubusercontent.com/u/116373520?s=256&v=4"
                            instagramUrl="https://www.instagram.com/l.daavii/"
                            githubUrl="https://github.com/ldavi05"
                            linkedinUrl=""
                        />
                        <Developer
                            name="Luiz Leal"
                            role="Desenvolvedor Back-End & DBA"
                            avatarUrl="https://avatars.githubusercontent.com/u/116567691?s=256&v=4"
                            instagramUrl="https://www.instagram.com/luizleal.dev"
                            githubUrl="https://github.com/luizlealdev"
                            linkedinUrl=""
                        />
                        <Developer
                            name="Mateus Ferreira"
                            role="Desenvolvedor Front-End & UI/UX Designer"
                            avatarUrl="https://avatars.githubusercontent.com/u/121569308?s=256&v=4"
                            instagramUrl="https://www.instagram.com/mateusf.53/"
                            githubUrl="https://github.com/ldavi05"
                            linkedinUrl=""
                        />
                    </div>
                </div>
            </main>
        </motion.div>
    );
}
export default About;

const Developer = ({
    name,
    role,
    avatarUrl,
    githubUrl,
    instagramUrl,
    linkedinUrl,
}) => {
    const mobileRoleText = role.split("&");

    return (
        <div className="flex gap-3 items-center">
            <img
                src={avatarUrl}
                alt={`Imagem de ${name}`}
                className="rounded-full bg-skeletonLoadingBase w-24 h-24 drop-shadow-xl"
            />
            <div className="flex flex-col">
                <p className="text-3xl font-medium text-purpleDarkGray">
                    {name}
                </p>
                <span className="text-purpleDarkGray">
                    {window.innerWidth < 768 ? mobileRoleText[0] : role}
                </span>
                <div className="flex gap-2">
                    <a
                        href={instagramUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        title="Instagram"
                    >
                        <FaInstagram className="w-6 h-6 text-purpleDarkGray transition-all ease-in-out hover:scale-110" />
                    </a>
                    <a
                        href={githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        title="Github"
                    >
                        <FaGithub className="w-6 h-6 text-purpleDarkGray transition-all ease-in-out hover:scale-110" />
                    </a>
                    <a
                        href={linkedinUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        title="LinkedIn"
                    >
                        <FaLinkedin className="w-6 h-6 text-purpleDarkGray transition-all ease-in-out hover:scale-110" />
                    </a>
                </div>
            </div>
        </div>
    );
};
