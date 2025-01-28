import { HiMiniChevronLeft } from "react-icons/hi2";
import { Link } from "react-router";

function ButtonPageBack({ to, replace, children }) {
    return (
        <Link
            to={to}
            replace={replace}
            className="flex text-darkPurple items-center font-medium p-2 absolute top-8 left-14 max-sm:left-4"
        >
            <HiMiniChevronLeft size={24} />
            {children}
        </Link>
    );
}
export default ButtonPageBack;
