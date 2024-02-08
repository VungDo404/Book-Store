import NotPermitted from "@/components/Results/NotPermitted";
import { useAppSelector } from "@/redux/hooks/hooks";

interface Props {
	children: JSX.Element;
}
export default function ProtectedRoute(props: Props) {
	const role = useAppSelector((state) => state.account.user.role);
	if (role !== "ADMIN") {
		return <NotPermitted />;
	}
	return <>{props.children}</>;
}
