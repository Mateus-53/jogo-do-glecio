const screenSize = window.innerWidth;

export function scrollFromRight() {
    document.body.classList.add("no-scroll");

    return {
        initial: { x: "100vw", opacity: 0 },
        animate: {
            x: 0,
            opacity: 1,
            transition: {
                duration: screenSize < 980 ? 0.28 : 0.5,
                ease: "easeInOut",
            },
            overflow: "hidden",
            onComplete: () => {
                document.body.classList.remove("no-scroll");
            },
        },
        exit: {
            x: "100vw",
            opacity: 0,
            transition: { duration: 0.26, ease: "easeInOut" },
        },
    };
}

export function scrollFromLeft() {
    return {
        initial: { x: "-100vw", opacity: 0 },
        animate: {
            x: 0,
            opacity: 1,
            transition: {
                duration: screenSize < 980 ? 0.3 : 0.5,
                ease: "easeInOut",
            },
        },
        exit: {
            x: "-100vw",
            opacity: 0,
            transition: { duration: 0.26, ease: "easeInOut" },
        },
    };
}

export function fade() {
    return {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: {
            opacity: 0,
            transition: { duration: 0.3, ease: "easeInOut" },
        },
    };
}
