import { Layout } from "antd";

const { Footer } = Layout;

export default function FooterComponent() {
	return (
		<Footer
			style={{
				textAlign: "center",
				backgroundColor: "rgb(249, 250, 255)",
			}}
		>
			Author Do Thanh Vung
		</Footer>
	);
}
