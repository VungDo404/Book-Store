import { useAppSelector } from "@/redux/hooks/hooks";
import { Navigate, useLocation } from "react-router-dom";

interface Props {
	children: JSX.Element;
}
export default function Authenticated(props: Props) {
	const isAuthenticated = useAppSelector(
		(state) => state.account.isAuthenticated
	);
	const location = useLocation();
	if (!isAuthenticated && location.pathname !== "/") {
		return <Navigate to="/login" />;
	}
	return <>{props.children}</>;
}
