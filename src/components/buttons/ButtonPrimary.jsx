const ButtonPrimary = (props) => {
    return (
        <button
            type={props.type}
            onClick={props.onClick}
            className="relative block w-full p-[2px] rounded-md bg-gradient-to-b from-purple to-darkPurple"
        >
            <div className="p-3 text-white w-full rounded-md bg-gradient-to-b from-darkPurple to-purpleSecondary font-semibold">
                {props.children}
            </div>
        </button>
    );
};
export default ButtonPrimary;
