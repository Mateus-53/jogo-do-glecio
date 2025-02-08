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

export const isValidJWT = (token) => {
    if (typeof token !== 'string') {
        return false;
    }

    const parts = token.split('.');
    if (parts.length !== 3) {
        return false; // Um token JWT deve ter exatamente 3 partes
    }

    try {
        // Função para decodificar Base64URL
        const decodeBase64URL = (str) => {
            const base64 = str.replace(/-/g, '+').replace(/_/g, '/');
            const padding = '='.repeat((4 - (base64.length % 4)) % 4); // Adiciona padding se necessário
            const base64WithPadding = base64 + padding;

            // Usar atob para decodificar Base64 no navegador
            return atob(base64WithPadding);
        };

        // Decodifica e valida as partes do token
        const [header, payload, signature] = parts;

        decodeBase64URL(header);
        decodeBase64URL(payload);

        // A assinatura não precisa ser decodificada, mas deve existir
        if (!signature) {
            return false;
        }

        return true; // Todas as partes são válidas
    } catch (error) {
        console.error('Erro ao verificar token JWT:', error);
        return false;
    }
};
