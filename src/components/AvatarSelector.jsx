import { useEffect, useRef, useState } from "react";
import { HiMiniChevronLeft, HiMiniChevronRight } from "react-icons/hi2";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import SelectedIndicator from "../assets/images/elements/selected-indicator.svg";

const AvatarSelector = ({ avatarsList, selectedAvatarIndex, onSelect }) => {
    const [selectedAvatar, setSelectedAvatar] = useState(
        selectedAvatarIndex | 1
    );
    const [showGradientEnd, setShowGradientEnd] = useState(true);
    const [showGradientStart, setShowGradientStart] = useState(false);
    const containerRef = useRef(null);

    const isLoading = !avatarsList || avatarsList.length === 0;

    useEffect(() => {
        const handleScroll = () => {
            const container = containerRef.current;

            const isAtEnd =
                container.scrollLeft + container.offsetWidth >=
                container.scrollWidth - 20;
            const isAtStart = container.scrollLeft > 25;

            setShowGradientEnd(!isAtEnd);
            setShowGradientStart(isAtStart);
        };

        const container = containerRef.current;
        if (container) {
            container.addEventListener("scroll", handleScroll);
            return () => container.removeEventListener("scroll", handleScroll);
        }
    }, []);

    const scrollContainer = (direction) => {
        const container = containerRef.current;
        if (!container) return;

        const scrollAmount = 300;
        container.scrollBy({
            left: direction === "left" ? -scrollAmount : scrollAmount,
            behavior: "smooth",
        });
    };

    const handleAvatarClick = (avatarId) => {
        setSelectedAvatar(avatarId);
        onSelect?.(avatarId);
    };

    return (
        <div className="relative">
            <div className="flex justify-between">
                <span className="text-darkGray text-sm">Escolha um avatar</span>
                <div className="flex justify-between gap-1 max-sm:hidden">
                    <HiMiniChevronLeft
                        className="w-5 h-5 cursor-pointer hover:scale-125 transition-all ease-out"
                        onClick={() => scrollContainer("left")}
                    />
                    <HiMiniChevronRight
                        className="w-5 h-5 cursor-pointer hover:scale-125 transition-all ease-out"
                        onClick={() => scrollContainer("right")}
                    />
                </div>
            </div>
            <div
                ref={containerRef}
                className="flex overflow-x-scroll whitespace-nowrap mt-1 h-[70px] overflow-y-hidden scrollbar-hide"
            >
                {isLoading ? (
                    <SkeletonTheme baseColor="#EFEAFA" highlightColor="#E7E1F6">
                        {Array.from({ length: 50 }).map((_, index) => (
                            <Skeleton
                                key={index}
                                circle
                                width={64}
                                height={64}
                                style={{ marginRight: "12px" }}
                            />
                        ))}
                    </SkeletonTheme>
                ) : (
                    avatarsList.map((avatar) => (
                        <span
                            key={avatar.id}
                            onClick={() => handleAvatarClick(avatar.id)}
                            className="w-16 h-16 flex-none mr-3 cursor-pointer relative"
                        >
                            <img
                                className="h-full w-full rounded-full bg-skeletonLoadingBase object-cover"
                                src={avatar.path_256px}
                                alt={`Avatar ${avatar.id}`}
                            />
                            {selectedAvatar === avatar.id && (
                                <img
                                    src={SelectedIndicator}
                                    alt="Selected"
                                    className="absolute w-16 h-16 top-0 left-0 pointer-events-none"
                                />
                            )}
                        </span>
                    ))
                )}
            </div>
            {showGradientEnd && (
                <div className="absolute top-4 right-0 h-full w-[20%] pointer-events-none bg-gradient-to-r from-transparent to-white" />
            )}
            {showGradientStart && (
                <div className="absolute top-4 left-0 h-full w-[10%] pointer-events-none bg-gradient-to-l from-transparent to-white" />
            )}
        </div>
    );
};
export default AvatarSelector;
