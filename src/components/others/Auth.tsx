import { useAppSelector } from "@/redux/hooks/hooks";
import { Navigate, useLocation } from "react-router-dom";

interface Props {
	children: JSX.Element;
}
export default function Auth(props: Props) {
	const location = useLocation();
	const isAuthenticated = useAppSelector(
		(state) => state.account.isAuthenticated
	);
	if (!isAuthenticated && location.pathname !== "/") {
		return <Navigate to={"/"} />;
	}
	return <>{props.children}</>;
}
