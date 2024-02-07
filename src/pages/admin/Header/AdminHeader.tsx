import { Button, Layout } from "antd";
import {
	MenuFoldOutlined,
	MenuUnfoldOutlined,
} from "@ant-design/icons";
import "styles/AdminHeader.scss";
import HeaderAvatar from "@/components/others/HeaderAvatar";

const { Header } = Layout;
interface interface_AdminHeader_props {
	collapsed: boolean;
	setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function AdminHeader(props: interface_AdminHeader_props) {
	const { collapsed, setCollapsed } = props;

	return (
		<Header className="admin-header-container">
			<div className="header-element">
				<Button
					className="toggle"
					type="text"
					icon={
						collapsed ? (
							<MenuUnfoldOutlined />
						) : (
							<MenuFoldOutlined />
						)
					}
					onClick={() => setCollapsed(!collapsed)}
					style={{
						fontSize: "1.2rem",
					}}
				/>
			</div>
			<div>
				<HeaderAvatar />
			</div>
		</Header>
	);
}
