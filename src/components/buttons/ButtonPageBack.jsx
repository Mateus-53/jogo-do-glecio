import { HiArrowSmallLeft } from "react-icons/hi2";
import { Link } from "react-router";

function ButtonPageBack({ to, replace, children, altColor, absolute }) {
	return (
		<Link
			to={to}
			replace={replace}
			className={` flex items-center p-2 font-medium text-darkPurple border rounded-lg gap-1 w-fit ${
				altColor
					? "text-white border-white"
					: "text-darkPurple border-darkPurple"
			}  ${absolute && "absolute top-8 left-14 max-sm:left-4"}`}
		>
			<HiArrowSmallLeft size={24} className="group-hover:translate-x-[-10px]" />
			{children}
		</Link>
	);
}
export default ButtonPageBack;
