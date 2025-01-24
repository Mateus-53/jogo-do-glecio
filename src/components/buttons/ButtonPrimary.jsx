import { ImSpinner8 } from "react-icons/im";

const ButtonPrimary = ({ children, type, disabled, isLoading, onClick }) => {
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled || isLoading}
            className={`relative block w-full p-[2px] rounded-lg bg-gradient-to-b from-purple to-darkPurple ${
                disabled
                    ? "opacity-70 cursor-not-allowed"
                    : isLoading
                    ? "opacity-70 cursor-wait"
                    : ""
            }`}
        >
            <div className="p-3 h-12 text-white w-full rounded-lg bg-gradient-to-b from-darkPurple to-purpleSecondary font-semibold">
                {isLoading ? (
                    <div className="flex justify-center items-center h-full">
                        <ImSpinner8 className="animate-spin" size={18} />
                    </div>
                ) : (
                    children
                )}
            </div>
        </button>
    );
};
export default ButtonPrimary;
