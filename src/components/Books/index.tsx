import { Breadcrumb, Layout } from "antd";
import FooterComponent from "../Footer/footer";
import HeaderComponent from "../Header/header";
import { Outlet } from "react-router-dom";

export default function Index() {
	return (
		<Layout style={{ minHeight: "100vh" }}>
			<HeaderComponent />
			<Layout style={{ padding: "0 50px", width: "80%", margin: "auto"  }}>
				<Breadcrumb style={{ margin: "16px 0" }}>
					<Breadcrumb.Item href="/">Home</Breadcrumb.Item>
					<Breadcrumb.Item>App</Breadcrumb.Item>
				</Breadcrumb>
				<Outlet />
			</Layout>
			<FooterComponent />
		</Layout>
	);
}
