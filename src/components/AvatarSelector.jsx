const AvatarSelector = ({ avatarsList, onSelected }) => {
    return (
        <div>
            <span className="text-darkGray text-sm">Escolha um avatar</span>
            <div className="overflow-x-scroll whitespace-nowrap mt-1">
                {avatarsList.map((avatar) => {
                    return (
                        <button key={avatar.id} onClick={onSelected}>
                            <img
                                className="w-16 mr-3"
                                src={avatar.path_256px}
                                alt={`Avatar ${avatar.id}`}
                            />
                        </button>
                    );
                })}
            </div>
        </div>
    );
};
export default AvatarSelector;
