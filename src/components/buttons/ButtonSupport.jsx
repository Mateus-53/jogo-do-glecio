import { ImSpinner8 } from "react-icons/im";

const ButtonSupport = ({ children, type, disabled, isLoading, onClick }) => {
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled || isLoading}
            className={`p-3 h-12 w-full border-2 text-darkGray border-darkGray/90 rounded-lg font-medium flex items-center justify-center gap-2 ${
                disabled
                    ? "opacity-70 cursor-not-allowed"
                    : isLoading
                    ? "opacity-70 cursor-wait"
                    : ""
            }`}
        >
            {isLoading ? (
                <div className="flex items-center justify-center h-full">
                    <ImSpinner8 className="animate-spin" size={18} />
                </div>
            ) : (
                children
            )}
        </button>
    );
};
export default ButtonSupport;
