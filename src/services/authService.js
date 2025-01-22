import { setLocalUserInfo } from "../utils/userUtils";

const baseURL = "https://api-tabuada-glecio.vercel.app/api/v1/auth";

export const createUser = async (userData) => {
    try {
        const response = await fetch(`${baseURL}/local/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userData),
        });

        const body = await response.json();
        const { data } = body;

        if (!response.ok) {
            throw new Error(body.message || "Erro no registro de usuário");
        }

        localStorage.setItem("ACCESS_TOKEN", data.access_token);

        setLocalUserInfo({
            id: data.user.id,
            name: data.user.name,
            course: data.user.course.name,
            avatarDefault: data.user.avatar.path_default,
            avatarMedium: data.user.avatar.path_256px,
            avatarLow: data.user.avatar.path_128px,
            maxScore: 0,
            isAdmin: data.user.is_admin,
        });

        return data;
    } catch (error) {
        throw error;
    }
};

export const loginUser = async (credentials) => {
    try {
        const response = await fetch(`${baseURL}/local/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(credentials),
        });

        const body = await response.json();
        const { data } = body;

        if (!response.ok || body.status_code != 200) {
            throw new Error(body.message || "Erro na autenticação");
        }

        localStorage.setItem("ACCESS_TOKEN", data.access_token);

        setLocalUserInfo({
            id: data.user.id,
            name: data.user.name,
            course: data.user.course.name,
            avatarDefault: data.user.avatar.path_default,
            avatarMedium: data.user.avatar.path_256px,
            avatarLow: data.user.avatar.path_128px,
            maxScore: data.user.max_score,
            isAdmin: data.user.is_admin,
        });

        return data;
    } catch (error) {
        throw error;
    }
};

export const logoutUser = () => {
    localStorage.clear();
    window.location.href = "/login";
};

export const resetPasswordRequest = async (email) => {
    try {
        const response = await fetch(`${baseURL}/password-reset/request`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email }),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(
                data.message || "Erro ao tentar enviar e-mail de recuperação"
            );
        }

        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const resetPasswordConfirm = async (token, newPassword) => {
    try {
        const response = await fetch(`${baseURL}/password-reset/confirm`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ new_password: newPassword }),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Erro ao resetar a senha");
        }

        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};
