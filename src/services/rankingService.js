const baseURL = "https://api-tabuada-glecio.vercel.app/api/v1/ranking";

export const getRankingNormal = async () => {
    try {
        const response = await fetch(`${baseURL}/normal`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("ACCESS_TOKEN")}`,
            },
        });

        const body = await response.json();

        if (!response.ok) {
            throw new Error(body.message || "Erro ao listar o ranking");
        }

        return body.data;
    } catch (error) {
        throw error;
    }
};

export const getRankingGlobal = async () => {
    try {
        const response = await fetch(`${baseURL}/global`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("ACCESS_TOKEN")}`,
            },
        });

        const body = await response.json();

        if (!response.ok) {
            throw new Error(body.message || "Erro ao listar o ranking");
        }

        return body.data;
    } catch (error) {
        throw error;
    }
};

export const setRanking = async (score, attempt = 0) => {
    try {
        const response = await fetch(baseURL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("ACCESS_TOKEN")}`,
            },
            body: JSON.stringify({ score }),
        });

        const body = await response.json();

        if (!response.ok) {
            if (attempt <= 3) {
                setRanking(score, attempt + 1);
            } else {
                throw new Error(
                    body.message || "Erro ao enviar pontos para o ranking"
                );
            }
        }

        return body;
    } catch (error) {
        throw error;
    }
};

export const resetRanking = async () => {
    try {
        const response = await fetch(baseURL, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("ACCESS_TOKEN")}`,
            },
        });

        const body = await response.json();

        if (!response.ok) {
            throw new Error(body.message || "Erro ao resetar o ranking");
        }

        return body;
    } catch (error) {
        throw error;
    }
};
