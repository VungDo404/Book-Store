import { Layout } from "antd";
import FooterComponent from "../Footer/footer";
import HeaderComponent from "../Header/header";
import { Outlet } from "react-router-dom";
import style from 'styles/book-index.module.scss'
export default function Index() {

	return (
		<Layout style={{ minHeight: "100vh" }}>
			<HeaderComponent  />
			<Layout className={style.index}>
				<Outlet />
			</Layout>
			<FooterComponent />
		</Layout>
	);
}
