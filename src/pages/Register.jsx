import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { fade } from "../animations/pageAnimations";
import AvatarSelector from "../components/AvatarSelector";
import ButtonPrimary from "../components/buttons/ButtonPrimary";
import Input from "../components/Input";
import Select from "../components/Select";
import { createUser } from "../services/authService";
import { getAvatarsList, getCoursesList } from "../services/userService";
import { toast } from "react-toastify";

function Register() {
    document.title = "Criar perfil · Jogo do Glécio";

    const [avatarsList, setAvatarsList] = useState([]);
    const [coursesList, setCoursesList] = useState([]);

    const [buttonIsLoading, setButtonIsLoading] = useState(false);
    const [inputErrorIndicator, setInputErrorIndicator] = useState(false);

    const [userData, setUserData] = useState({
        avatar_id: 1,
        name: null,
        course_id: null,
        email: null,
        password: null,
    });

    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem("ACCESS_TOKEN")) {
            navigate("/", { replace: true });
        }
    }, [navigate]);

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

        fetchAvatars();
        fetchCourses();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        setButtonIsLoading(true);
        setInputErrorIndicator(false);

        try {
            if (userData.password.length <= 4) {
                setInputErrorIndicator(true);
                throw new Error("A senha deve conter no mínimo 4 caracteres.");
            }

            const response = await createUser(userData);

            if (response.access_token) {
                navigate("/", { replace: true });

                toast.success("Perfil criado com sucesso!", {
                    className: "bg-white",
                });
            }
        } catch (error) {
            toast.error(error.message || "Erro ao criar perfil", {
                className: "bg-white",
            });
        }

        setButtonIsLoading(false);
    };

    return (
        <>
            <motion.div
                className="flex"
                initial="initial"
                animate="animate"
                exit="exit"
                variants={fade()}
            >
                <div className="h-screen w-1/2 max-sm:hidden bg-gradient-to-b from-darkPurple to-purple"></div>
                <main className="h-screen w-1/2 max-sm:w-full max-sm:items-start max-sm:pt-0 flex justify-center items-center overflow-y-auto pt-16">
                    <div className="w-full space-y-12 max-sm:space-y-6 max-w-md bg-white p-8">
                        <div className="flex flex-col gap-1 mb-6">
                            <p className="text-4xl font-black bg-gradient-to-b from-darkPurple to-purpleSecondary bg-clip-text text-transparent">
                                Crie seu perfil
                            </p>
                            <span className="text-purpleDarkGray">
                                Informe os dados abaixo para a criar seu perfil.
                            </span>
                        </div>
                        <form className="space-y-4" onSubmit={handleSubmit}>
                            <AvatarSelector
                                avatarsList={avatarsList}
                                onSelect={(avatarId) =>
                                    setUserData((prev) => ({
                                        ...prev,
                                        avatar_id: avatarId,
                                    }))
                                }
                            />
                            <Input
                                label="Insira seu nome"
                                name="name"
                                type="text"
                                placeholder="Glécio Raimundo"
                                required={true}
                                onChange={(e) => {
                                    setUserData((prev) => ({
                                        ...prev,
                                        name: e.target.value,
                                    }));
                                }}
                            />
                            <Select
                                label="Escolha sua turma"
                                name="courses"
                                values={coursesList}
                                selectedValue={
                                    coursesList.length > 0
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
                                label="Insira seu e-mail"
                                name="email"
                                type="email"
                                placeholder="glecio@prof.ce.gov.br"
                                required={true}
                                onChange={(e) =>
                                    setUserData((prev) => ({
                                        ...prev,
                                        email: e.target.value,
                                    }))
                                }
                            />
                            <Input
                                label="Crie sua senha"
                                name="password"
                                type="password"
                                error={inputErrorIndicator}
                                required={true}
                                onChange={(e) =>
                                    setUserData((prev) => ({
                                        ...prev,
                                        password: e.target.value,
                                    }))
                                }
                            />
                            <ButtonPrimary
                                disabled={coursesList.length === 0}
                                type="submit"
                                isLoading={buttonIsLoading}
                            >
                                Criar perfil
                            </ButtonPrimary>
                        </form>
                        <span className="text-purpleDarkGray text-center block">
                            Já possui um perfil?{" "}
                            <Link
                                to="/login"
                                className="text-darkPurple font-medium"
                            >
                                Acesse aqui
                            </Link>
                        </span>
                    </div>
                </main>
            </motion.div>
        </>
    );
}

export default Register;
