import { Content } from "antd/es/layout/layout";
import { useLocation } from "react-router-dom";

export default function Detail() {
	const { search } = useLocation();
	const query = new URLSearchParams(search);
	const id = query.get("id");
	return (
		<Content
			style={{
				backgroundColor: "white",
				padding: "10px",
			}}
		>
			Detail
		</Content>
	);
}
