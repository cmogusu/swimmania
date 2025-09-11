import { FiLoader } from "react-icons/fi";
import "./style.css";

export const Loading = () => (
	<span className="animate__animated animate__rotateIn inline-block animate__infinite">
		<FiLoader />
	</span>
);
