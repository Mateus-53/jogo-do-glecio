import { jwtDecode } from "jwt-decode";

export const isTokenExpiringSoon = (token) => {
    try {
        const decoded = jwtDecode(token);
        const currentTime = Math.floor(Date.now() / 1000);
        const timeRemaining = decoded.exp - currentTime;

        return timeRemaining < 86400;
    } catch (error) {
        console.error("Erro ao decodificar o token:", error);
        return true;
    }
};