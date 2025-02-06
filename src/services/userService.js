import { setLocalUserInfo } from "../utils/userUtils";

const baseURL = "https://api-tabuada-glecio.vercel.app/api/v1";

export const getUser = async (userId) => {
    try {
        const response = await fetch(`${baseURL}/user/${userId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("ACCESS_TOKEN")}`,
            },
        });

        const body = await response.json();
        const { data } = body;

        if (!response.ok) {
            throw new Error(
                body.message || "Erro ao buscar informações do usuário"
            );
        }

        const userInfo = {
            id: data.id,
            name: data.name,
            courseId: data.course.id,
            course: data.course.name,
            avatarId: data.avatar.id,
            avatarDefault: data.avatar.path_default,
            avatarMedium: data.avatar.path_256px,
            avatarLow: data.avatar.path_128px,
            isAdmin: data.is_admin,
        };
        setLocalUserInfo(userInfo);

        return data;
    } catch (error) {
        throw error;
    }
};

export const updateUser = async (newData) => {
    try {
        const response = await fetch(`${baseURL}/user/update`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("ACCESS_TOKEN")}`,
            },
            body: JSON.stringify(newData),
        });

        const body = await response.json();
        const { data } = body;

        if (!response.ok) {
            throw new Error(
                body.message || "Erro ao atualizar informações do usuário"
            );
        }

        const newInfo = {
            id: data.id,
            name: data.name,
            courseId: data.course.id,
            course: data.course.name,
            avatarId: data.avatar.id,
            avatarDefault: data.avatar.path_default,
            avatarMedium: data.avatar.path_256px,
            avatarLow: data.avatar.path_128px,
            isAdmin: data.is_admin,
        };
        setLocalUserInfo(newInfo);

        return body;
    } catch (error) {
        throw error;
    }
};

export const updateUserPassword = async (credentials) => {
    try {
        const response = await fetch(`${baseURL}/user/update/password`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("ACCESS_TOKEN")}`,
            },
            body: JSON.stringify(credentials),
        });

        const body = await response.json();

        if (!response.ok) {
            throw new Error(
                body.message || "Erro ao atualizar senha do usuário"
            );
        }

        return body;
    } catch (error) {
        throw error;
    }
};

export const getAvatarsList = async () => {
    try {
        const response = await fetch(`${baseURL}/avatars/all`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        const body = await response.json();
        const { data } = body;

        if (!response.ok) {
            throw new Error(body.message || "Erro ao listar os avatares");
        }

        return data;
    } catch (error) {
        throw error;
    }
};

export const getCoursesList = async () => {
    try {
        const response = await fetch(`${baseURL}/courses/all`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("ACCESS_TOKEN")}`,
            },
        });

        const body = await response.json();
        const { data } = body;

        if (!response.ok) {
            throw new Error(body.message || "Erro ao listar as turmas");
        }

        return data;
    } catch (error) {
        throw error;
    }
};
