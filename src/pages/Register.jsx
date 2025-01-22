import { useEffect, useState } from "react";
import Input from "../components/Input";
import ButtonPrimary from "../components/buttons/ButtonPrimary";
import Select from "../components/Select";
import { getAvatarsList, getCoursesList } from "../services/userService";
import Toast from "../components/Toast";
import AvatarSelector from "../components/AvatarSelector";
import { Link, useNavigate } from "react-router";
import { createUser } from "../services/authService";
import { AnimatePresence } from "framer-motion";

function Register() {
    const [avatarsList, setAvatarsList] = useState([]);
    const [coursesList, setCoursesList] = useState([]);
    const [buttonIsLoading, setButtonIsLoading] = useState(false);

    const [toast, setToast] = useState({
        message: "",
        type: "success",
        isVisible: false,
    });

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
            } catch (error) {
                setToast({
                    type: "error",
                    message:
                        error.message ||
                        "Ocorreu um erro ao carregar a lista de cursos.",
                    isVisible: true,
                });
            }
        };

        const fetchAvatars = async () => {
            try {
                const avatars = await getAvatarsList();
                setAvatarsList(avatars);
            } catch (error) {
                setToast({
                    type: "error",
                    message:
                        error.message ||
                        "Ocorreu um erro ao carregar os avatares.",
                    isVisible: true,
                });
            }
        };

        fetchAvatars();
        fetchCourses();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setButtonIsLoading(true);

        try {
            const response = await createUser(userData);

            if (response.access_token) {
                navigate("/", { replace: true });
            }
        } catch (error) {
            setToast({
                type: "error",
                message: error.message || "Erro ao criar perfil.",
                isVisible: true,
            });
        }

        setButtonIsLoading(false);
    };

    return (
        <>
            <div className="flex">
                <div className="h-screen w-1/2 bg-gradient-to-b from-darkPurple to-purple"></div>
                <main className="h-screen w-1/2 flex justify-center items-center overflow-y-auto pt-16">
                    <div className="w-full space-y-12 max-w-md bg-white p-8">
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
                                onChange={(e) =>
                                    setUserData((prev) => ({
                                        ...prev,
                                        password: e.target.value,
                                    }))
                                }
                            />
                            <ButtonPrimary
                                type="submit"
                                isLoading={buttonIsLoading}
                            >
                                Criar perfil
                            </ButtonPrimary>
                        </form>
                        <span className="text-purpleDarkGray text-center block mt-4">
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
            </div>
            <AnimatePresence>
                {toast.isVisible && (
                    <Toast
                        text={toast.message}
                        type={toast.type}
                        onClose={() =>
                            setToast((prev) => ({ ...prev, isVisible: false }))
                        }
                    />
                )}
            </AnimatePresence>
        </>
    );
}

export default Register;
