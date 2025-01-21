/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                purple: "var(--purple)",
                darkPurple: "var(--dark-purple)",
                purpleSecondary: "var(--purple-seconday)",
                green: "var(--green)",
                darkGreen: "var(--dark-green)",
                red: "var(--red)",
                darkRed: "var(--dark-red)",
                white: "var(--white)",
                gray: "var(--gray)",
                darkGray: "var(--dark-gray)",
                purpleGray: "var(--purple-gray)",
                purpleDarkGray: "var(--purple-dark-gray)",
                skeletonLoadingBase: "var(--skeleton-loading-base)",
                skeletonLoadingHighlight: "var(--skeleton-loading-highlight)",
            },
        },
    },
    plugins: [],
};
