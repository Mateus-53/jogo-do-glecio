import { useState } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const AvatarSelector = ({ avatarsList, selectedAvatarIndex, onSelect }) => {
    const [selectedAvatar, setSelectedAvatar] = useState(
        selectedAvatarIndex | 1
    );
    const isLoading = !avatarsList || avatarsList.length === 0;

    return (
        <div>
            <span className="text-darkGray text-sm">Escolha um avatar</span>
            <div className="flex overflow-x-scroll whitespace-nowrap mt-1 h-16 overflow-y-hidden">
                {isLoading ? (
                    <SkeletonTheme baseColor="#EFEAFA" highlightColor="#E7E1F6">
                        {Array.from({ length: 6 }).map((_, index) => (
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
                            onClick={() => onSelect?.(avatar.id)}
                            className="w-16 h-16 flex-none mr-3 cursor-pointer"
                        >
                            <img
                                className="h-full w-full rounded-full bg-skeletonLoadingBase object-cover"
                                src={avatar.path_256px}
                                alt={`Avatar ${avatar.id}`}
                            />
                        </span>
                    ))
                )}
            </div>
        </div>
    );
};
export default AvatarSelector;
