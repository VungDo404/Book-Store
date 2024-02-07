import { Button, Layout, MenuProps } from "antd";
import {
	MenuFoldOutlined,
	MenuUnfoldOutlined,
} from "@ant-design/icons";
import "styles/AdminHeader.scss";
import { Link } from "react-router-dom";
import HeaderAvatar from "@/components/others/HeaderAvatar";

const { Header } = Layout;
interface interface_AdminHeader_props {
	collapsed: boolean;
	setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
}

export const itemsNotAuth: MenuProps["items"] = [
	{
		label: <Link to="/login">Login</Link>,
		key: "0",
	},
	{
		label: <Link to="/register">Register</Link>,
		key: "1",
	},
];

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
