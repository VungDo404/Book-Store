import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import { handleLogout } from "@/redux/slices/accountReducer";
import { UserOutlined } from "@ant-design/icons";
import { Avatar, Divider, Dropdown, MenuProps, Space, Typography } from "antd";
import { Link } from "react-router-dom";

interface Items {
	[key: string]: MenuProps["items"];
}
export default function HeaderAvatar() {
	const role = useAppSelector((state) => state.account.user.role);
	const { Text } = Typography;
	const dispatch = useAppDispatch();
	const USER = [
		{
			label: <Link to="/account">Account</Link>,
			key: "account",
		},
		{
			label: <Text>Logout</Text>,
			key: "logout",
			onClick: async () => {
				await dispatch(handleLogout());
			},
		},
	];
	const items: Items = {
		ADMIN: [
			{
				label: <Link to="/admin">Admin</Link>,
				key: "admin",
			},
			...USER,
		],
		USER,
	};
	const avatarName =
		useAppSelector((state) => state.account.user.avatar) ?? "";
	const avatarPath = `${
		import.meta.env.VITE_API_URL
	}/images/avatar/${avatarName}`;

	return (
		<>
			{role === "" ? (
				<Space>
					<Link to="/register">Register</Link>
					<Divider type="vertical" />
					<Link to="/login">Login</Link>
				</Space>
			) : (
				<Dropdown
					menu={{
						items: items[role],
					}}
					trigger={["click"]}
					placement="topRight"
					arrow={{ pointAtCenter: true }}
				>
					<a onClick={(e) => e.preventDefault()}>
						<span>
							<Avatar icon={<UserOutlined />} src={avatarPath} />
						</span>
					</a>
				</Dropdown>
			)}
		</>
	);
}
