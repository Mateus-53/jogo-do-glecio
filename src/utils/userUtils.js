export const getLocalUserInfo = () => {
    return {
        id: parseInt(localStorage.getItem("ID")),
        name: localStorage.getItem("NAME"),
        courseId: parseInt(localStorage.getItem("COURSE_ID")),
        course: localStorage.getItem("COURSE"),
        avatarId: parseInt(localStorage.getItem("AVATAR_ID")),
        avatarDefault: localStorage.getItem("AVATAR_DEFAULT"),
        avatarMedium: localStorage.getItem("AVATAR_MEDIUM"),
        avatarLow: localStorage.getItem("AVATAR_LOW"),
        maxScore: parseInt(localStorage.getItem("MAX_SCORE")),
        isAdmin: localStorage.getItem("IS_ADMIN") == "true" //depois,
    };
};

export const setLocalUserInfo = (data) => {
    Object.entries(data).forEach(([key, value]) => {
        const formattedKey = key
            .replace(/([a-z])([A-Z])/g, "$1_$2")
            .toUpperCase();
        localStorage.setItem(formattedKey, value);
    });
};
