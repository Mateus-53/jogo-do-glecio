import { useEffect, useState } from "react";
import { scrollFromRight } from "../animations/pageAnimations";
import { motion } from "framer-motion";
import { getLocalUserInfo } from "../utils/userUtils";
import ButtonPageBack from "../components/buttons/ButtonPageBack";
import ButtonSuccess from "../components/buttons/ButtonSuccess";
import Input from "../components/Input";
import Select from "../components/Select";
import { toast } from "react-toastify";
import { getAvatarsList, getCoursesList } from "../services/userService";

function EditProfile() {
    document.title = "Editar perfil · Jogo do Glécio";
    const [userInfo, setUserInfo] = useState({});

    const [avatarsList, setAvatarsList] = useState([]);
    const [coursesList, setCoursesList] = useState([]);

    const [userData, setUserData] = useState({
        avatar_id: 1,
        name: null,
        course_id: null,
    });

    useEffect(() => {
        const info = getLocalUserInfo();
        setUserInfo(info);
    }, []);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const courses = await getCoursesList();
                setCoursesList(courses);

                if (courses.length > 0) {
                    setUserData((prev) => ({
                        ...prev,
                        course_id: courses[0].id,
                    }));
                }
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

        //fetchAvatars();
        fetchCourses();
    }, []);

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
            <main className="flex flex-col max-w-3xl gap-6 p-6 pt-20 md:pt-10 md:p-10 lg:gap-16 md:mx-auto">
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
                        value={`${userInfo.name ?? "Anônimo"}`}
                        isEditing={true}
                        disabled={true}
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
                        selectedValue={
                            userInfo.courseId
                                ? userInfo.courseId
                                : coursesList.length > 0
                                ? coursesList[0]?.id
                                : null
                        }
                        onSelect={(avatarId) => {
                            setUserData((prev) => ({
                                ...prev,
                                course_id: avatarId,
                            }));
                        }}
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
