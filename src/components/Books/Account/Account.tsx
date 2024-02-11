import { ShoppingOutlined, UserOutlined } from "@ant-design/icons";
import { Layout, Menu, MenuProps } from "antd";
import Sider from "antd/es/layout/Sider";
import { Content } from "antd/es/layout/layout";
import { useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import "styles/Account.scss";
type MenuItem = Required<MenuProps>["items"][number];

export default function Account() {
	const navigate = useNavigate();
	const location = useLocation(); 
	function getItem(
		label: React.ReactNode,
		key: React.Key,
		icon?: React.ReactNode,
		children?: MenuItem[],
		type?: "group"
	): MenuItem {
		return {
			key,
			icon,
			children,
			label,
			type,
		} as MenuItem;
	}
	const getLastPathname = () => {
		const words = location.pathname.split("/");
		return words[words.length - 1];
	}
	const [selectedKeys, setSelectedKeys] = useState<string[]>([getLastPathname()]);
	const [openKeys, setOpenKeys] = useState(['profile']);
	const rootSubmenuKeys = ["profile"]; // the key of menu that has submenu inside it
	const items: MenuProps["items"] = [
		getItem(
			"My Account",
			"profile",
			<UserOutlined style={{ color: "black" }} />,
			[
				getItem(
					<Link to={"/account/profile"}>Profile</Link>,
					"profile",
					null
				),
				getItem(
					<Link to={"/account/password"}>Change Password</Link>,
					"password",
					null
				),
			]
		),
		getItem(
			<Link to={"/account/purchase"}>My Purchase</Link>,
			"purchase",
			<ShoppingOutlined />
		),
	];
	const onClick: MenuProps["onClick"] = (e) => {
		setSelectedKeys([e.keyPath[0]]);
		setOpenKeys(e.keyPath);
	};

	const onOpenChange: MenuProps["onOpenChange"] = (keys) => {
		const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
		console.log(latestOpenKey);
		setSelectedKeys(latestOpenKey ? [latestOpenKey] : []);
		if (latestOpenKey && rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
			setOpenKeys(keys);
		} else {
			setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
			if(latestOpenKey)
				navigate(`${latestOpenKey}`);
		}
	};
	return (
		<Layout style={{ padding: "20px 0", width:'85%', marginBottom:'20px'  }}>
			<Sider width={"12vw"} style={{ height: "fit-content" }}>
				<Menu
					onClick={onClick}
					onOpenChange={onOpenChange}
					defaultOpenKeys={selectedKeys}
					openKeys={openKeys}
					selectedKeys={selectedKeys}
					mode="inline"
					items={items}
                    style={{ fontSize:'1.1rem'}}
				/>
			</Sider>
			<Content style={{ backgroundColor: "white", padding: "10px" }}>
				<Outlet />
			</Content>
		</Layout>
	);
}
