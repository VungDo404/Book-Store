import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import { handleLogout } from "@/redux/slices/accountReducer";
import { clearCart } from "@/redux/slices/cart.reducer";
import { UserOutlined } from "@ant-design/icons";
import { Avatar, Divider, Dropdown, MenuProps, Space, Typography } from "antd";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

interface Items {
	[key: string]: MenuProps["items"];
}
export default function HeaderAvatar() {
	const { t } = useTranslation();
	const { Text } = Typography;
	const dispatch = useAppDispatch();
	const user = useAppSelector((state) => state.account.user);
	const USER = [
		{
			label: <Link to="/account/profile">{t("header.upper.right.avatarDropdown.account")}</Link>,
			key: "account",
		},
		{
			label: <Text>{t("header.upper.right.avatarDropdown.logout")}</Text>,
			key: "logout",
			onClick: async () => {
				await dispatch(handleLogout());
				dispatch(clearCart()); 
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
	const avatarPath = `${
		import.meta.env.VITE_API_URL
	}/images/avatar/${user.avatar ?? ""}`;
	return (
		<>
			{user.role === "" ? (
				<Space>
					<Link to="/register">{t("header.upper.right.avatarDropdown.register")}</Link>
					<Divider type="vertical" />
					<Link to="/login">{t("header.upper.right.avatarDropdown.login")}</Link>
				</Space>
			) : (
				<Dropdown
					menu={{
						items: items[user.role],
					}}
					trigger={["click"]}
					placement="topRight"
					arrow={{ pointAtCenter: true }}
				>
					<a onClick={(e) => e.preventDefault()}>
						<span>
							<Space>
								<Avatar
									icon={<UserOutlined />}
									src={avatarPath}
								/>
								<span>{user.fullName}</span>
							</Space>
						</span>
					</a>
				</Dropdown>
			)}
		</>
	);
}
