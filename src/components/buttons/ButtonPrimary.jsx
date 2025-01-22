import { ImSpinner8 } from "react-icons/im";

const ButtonPrimary = (props) => {
    return (
        <button
            type={props.type}
            onClick={props.onClick}
            disabled={props.disabled || props.isLoading}
            className={`relative block w-full p-[2px] rounded-md bg-gradient-to-b from-purple to-darkPurple ${
                props.disabled
                    ? "opacity-70 cursor-not-allowed"
                    : props.isLoading
                    ? "opacity-70 cursor-wait"
                    : ""
            }`}
        >
            <div className="p-3 h-12 text-white w-full rounded-md bg-gradient-to-b from-darkPurple to-purpleSecondary font-semibold">
                {props.isLoading ? (
                    <div className="flex justify-center items-center h-full">
                        <ImSpinner8 className="animate-spin" size={18} />
                    </div>
                ) : (
                    props.children
                )}
            </div>
        </button>
    );
};
export default ButtonPrimary;
