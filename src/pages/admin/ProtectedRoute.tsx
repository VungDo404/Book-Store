import NotPermitted from "@/components/Results/NotPermitted";
import { useAppSelector } from "@/redux/hooks/hooks";

interface interface_ProtectedRoute_props {
	children: JSX.Element;
}
export default function ProtectedRoute(props: interface_ProtectedRoute_props) {
	const role = useAppSelector((state) => state.account.user.role);
	if (role !== "ADMIN") {
		return <NotPermitted />;
	}
	return <>{props.children}</>;
}
