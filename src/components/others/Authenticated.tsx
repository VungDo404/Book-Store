import { useAppSelector } from "@/redux/hooks/hooks";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

interface Props {
	children: JSX.Element;
}
export default function Authenticated(props: Props) {
	const location = useLocation();
	const navigate = useNavigate();
	const isAuthenticated = useAppSelector(
		(state) => state.account.isAuthenticated
	);
	const onAccount = () => {
		if (
			isAuthenticated &&
			["/register", "/login"].includes(location.pathname)
		) {
			navigate("/");
		}
	};
	useEffect(() => {
		onAccount();
	}, []);

	return <>{props.children}</>;
}
