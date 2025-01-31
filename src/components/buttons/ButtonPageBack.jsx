import { HiArrowSmallLeft } from "react-icons/hi2";
import { Link } from "react-router";

function ButtonPageBack({ to, replace, children, altColor, absolute }) {
	return (
		<Link
			to={to}
			replace={replace}
			className={` flex items-center font-medium text-darkPurple rounded-lg gap-1 w-fit ${
				altColor ? "text-white border border-white p-2" : "text-darkPurple p-0"
			}  ${absolute && "absolute top-8 left-14 max-sm:left-4"}`}
		>
			<HiArrowSmallLeft size={24} className="group-hover:translate-x-[-10px]" />
			{children}
		</Link>
	);
}
export default ButtonPageBack;
