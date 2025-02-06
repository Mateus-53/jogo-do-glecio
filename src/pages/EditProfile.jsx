import { useEffect, useState } from "react";
import { scrollFromRight } from "../animations/pageAnimations";
import { motion } from "framer-motion";
import { getLocalUserInfo } from "../utils/userUtils";
import ButtonPageBack from "../components/buttons/ButtonPageBack";
import ButtonSuccess from "../components/buttons/ButtonSuccess";
import Input from "../components/Input";
import Select from "../components/Select";
import { toast } from "react-toastify";
import {
    getAvatarsList,
    getCoursesList,
    updateUser,
} from "../services/userService";

function EditProfile() {
    document.title = "Editar perfil · Jogo do Glécio";

    const [userInfo, setUserInfo] = useState({});

    const [avatarsList, setAvatarsList] = useState([]);
    const [coursesList, setCoursesList] = useState([]);
    const [buttonIsLoading, setButtonIsLoading] = useState(false);

    const [userData, setUserData] = useState({
        avatar_id: 1,
        name: "",
        course_id: 1,
    });

    useEffect(() => {
        const info = getLocalUserInfo();
        setUserInfo(info);

        // Atualiza userData com os dados obtidos do usuário
        setUserData((prev) => ({
            ...prev,
            name: info?.name || "",
            course_id: info?.courseId || 1,
        }));
    }, []);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const courses = await getCoursesList();
                setCoursesList(courses);
            } catch (error) {
                toast.error(
                    error.message ||
                        "Ocorreu um erro ao carregar a lista de cursos",
                    {
                        className: "bg-white",
                    }
                );
            }
        };

        const fetchAvatars = async () => {
            try {
                const avatars = await getAvatarsList();
                setAvatarsList(avatars);
            } catch (error) {
                toast.error(
                    error.message || "Ocorreu um erro ao carregar os avatares",
                    {
                        className: "bg-white",
                    }
                );
            }
        };

        fetchCourses();
        fetchAvatars();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setButtonIsLoading(true);

        try {
            const response = await updateUser(userData);
            if (response.status_code === 200) {
                toast.success(response.message, { className: "bg-white" });
            }
        } catch (error) {
            toast.error(
                error.message ||
                    "Ocorreu um erro ao atualizar suas informações. Tente novamente mais tarde.",
                {
                    className: "bg-white",
                }
            );
        }

        setButtonIsLoading(false);
    };

    /** PERGUNTA: COMO SERÁ A SELEÇÃO DE AVATAR NESTA PÁGINA ????????? */

    return (
        <motion.div
            variants={scrollFromRight()}
            initial="initial"
            animate="animate"
            exit="exit"
        >
            <ButtonPageBack to="/" replace={true} absolute={true}>
                Retornar
            </ButtonPageBack>
            <main className="flex flex-col max-w-3xl gap-6 p-6 pt-20 lg:gap-16 md:mx-auto">
                <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
                    <img
                        src={userInfo.avatarDefault}
                        alt={`${userInfo.name ?? "Anônimo"}'s avatar`}
                        className="rounded-full w-28 bg-skeletonLoadingBase"
                    />

                    <Input
                        label="Nome"
                        name="name"
                        type="text"
                        value={userData.name}
                        onChange={(e) => {
                            setUserData((prev) => ({
                                ...prev,
                                name: e.target.value,
                            }));
                        }}
                    />

                    <Select
                        label="Turma"
                        name="courses"
                        values={coursesList}
                        selectedValue={userData.course_id}
                        onSelect={(courseId) => {
                            setUserData((prev) => ({
                                ...prev,
                                course_id: courseId,
                            }));
                        }}
                    />

                    <Input
                        label="Senha"
                        name="password"
                        placeholder="Redefenir Senha"
                        disabled={true}
                    />

                    <ButtonSuccess
                        type="submit"
                        isLoading={buttonIsLoading}
                        disabled={
                            userData.name != userInfo.name ||
                            userData.course_id != userInfo.courseId
                                ? false
                                : true
                        }
                    >
                        Salvar Alterações
                    </ButtonSuccess>
                </form>
            </main>
        </motion.div>
    );
}

export default EditProfile;
