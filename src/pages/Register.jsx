import { useEffect, useState } from "react";
import Input from "../components/Input";
import ButtonPrimary from "../components/buttons/ButtonPrimary";
import Select from "../components/Select";
import { getAvatarsList, getCoursesList } from "../services/userService";
import SuccessToast from "../components/toast/SuccessToast";
import AvatarSelector from "../components/AvatarSelector";
import { Link } from "react-router";

function Register() {
    const [avatarsList, setAvatarsList] = useState([]);
    const [coursesList, setCoursesList] = useState([]);
    const [errorMessage, setErrorMessage] = useState(null);

    useEffect(() => {
        if (localStorage.getItem("ACCESS_TOKEN")) {
            window.location.href = "/";
        }
    }, []);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const courses = await getCoursesList();
                setCoursesList(courses);
            } catch (error) {
                setErrorMessage(error);
            }
        };

        const fetchAvatars = async () => {
            try {
                const avatars = await getAvatarsList();
                setAvatarsList(avatars);
            } catch (error) {
                setErrorMessage(error);
            }
        };

        fetchAvatars();
        fetchCourses();
    }, []);

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
                        <form className="space-y-4">
                            <AvatarSelector avatarsList={avatarsList} />
                            <Input
                                label="Insira seu nome"
                                name="name"
                                type="text"
                                placeholder="Glécio Raimundo"
                            />
                            <Select
                                label="Escolha sua turma"
                                name="courses"
                                values={coursesList}
                            />
                            <Input
                                label="Insira seu e-mail"
                                name="email"
                                type="email"
                                placeholder="glecio@prof.ce.gov.br"
                            />
                            <Input
                                label="Crie sua senha"
                                name="password"
                                type="password"
                            />
                            <ButtonPrimary type="button">
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
        </>
    );
}

export default Register;
