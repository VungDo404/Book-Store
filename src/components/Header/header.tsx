import {
	ShoppingCartOutlined,
	BookTwoTone,
	UserOutlined,
} from "@ant-design/icons";
import {
	Menu,
	Input,
	Typography,
	Col,
	MenuProps,
	Dropdown,
	Avatar,
	Badge,
	Popover,
	Row,
	Divider,
	Button,
	Empty,
} from "antd";
import { Link, useNavigate } from "react-router-dom";
import "@/styles/header.scss";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import { itemsNotAuth } from "@/pages/admin/Header/AdminHeader";
import { handleLogout } from "@/redux/slices/accountReducer";

const { Text } = Typography;
const { Search } = Input;

const onSearch: any = (
	value: string,
	_e: React.SyntheticEvent,
	info: any
) => {};

export default function HeaderComponent() {
	const isAuthenticated = useAppSelector(
		(state) => state.account.isAuthenticated
	);
	const role = useAppSelector((state) => state.account.user.role);
	const dispatch = useAppDispatch();
	const order = useAppSelector((state) => state.order.carts);
	const previewCart = order.slice(0, 5);
	const navigate = useNavigate();
	const itemsAuthUser: MenuProps["items"] = [
		{
			label: (
				<Text>
					<Link to="/login" className="nav-text">
						Account
					</Link>
				</Text>
			),
			key: "0",
		},
		{
			label: <Text>Logout</Text>,
			key: "1",
			onClick: () => {
				dispatch(handleLogout());
				navigate("/");
			},
		},
	];
	const content = (
		<Row style={{ width: "400px" }} gutter={[0, 8]}>
			{previewCart.length > 0 ? (
				previewCart.map((ord, index) => (
					<Row className="line" key={`order-${index}`}>
						<Col>
							<Avatar
								shape="square"
								icon={<UserOutlined />}
								src={`${
									import.meta.env.VITE_API_URL
								}/images/book/${ord.detail.thumbnail}`}
							/>
						</Col>
						<Col
							span={15}
							style={{
								textOverflow: "ellipsis",
								whiteSpace: "nowrap",
								overflow: "hidden",
							}}
						>
							{ord.detail.mainText}
						</Col>
						<Col style={{ marginLeft: "auto", color: "#197893" }}>
							<sup>đ</sup>
							<span>
								{new Intl.NumberFormat("en-DE").format(
									ord.detail.price
								)}
							</span>
						</Col>
					</Row>
				))
			) : (
				<Empty style={{ width: "100%" }} />
			)}
			<Divider />
			<Col span={24} style={{ display: "flex" }}>
				{order.length > 5 && (
					<span>{order.length - 5} More Products In Cart</span>
				)}
				<Button
					style={{ marginLeft: "auto" }}
					type="primary"
					onClick={() => navigate("/book/order")}
				>
					View My Shopping Cart
				</Button>
			</Col>
		</Row>
	);
	const itemsAuthAdmin: MenuProps["items"] = [
		{
			label: (
				<Text>
					<Link to="/admin" className="nav-text">
						Admin
					</Link>
				</Text>
			),
			key: "0",
		},
		{
			label: <Text>Logout</Text>,
			key: "1",
			onClick: () => {
				dispatch(handleLogout());
				navigate("/");
			},
		},
	];
	const items = isAuthenticated
		? role === "ADMIN"
			? itemsAuthAdmin
			: itemsAuthUser
		: itemsNotAuth;
	const avatarName =
		useAppSelector((state) => state.account.user.avatar) ?? "";
	const avatarPath = `${
		import.meta.env.VITE_API_URL
	}/images/avatar/${avatarName}`;
	return (
		<Menu theme="light" style={{ width: "100%" }}>
			<Col className="header-container">
				<Col xs={{ offset: 1, span: 8 }} md={{ offset: 1, span: 4 }}>
					<div className="book" onClick={() => navigate("/")}>
						<span>
							<BookTwoTone style={{ fontSize: "200%" }} />
							&#160;THE BOOK
						</span>
					</div>
				</Col>
				<Col
					xs={{ offset: 0, span: 12 }}
					sm={{ offset: 0, span: 13 }}
					md={{ offset: 0, span: 10 }}
				>
					<Search
						size={"large"}
						placeholder="input search text"
						onSearch={onSearch}
					/>
				</Col>
				<Col
					xs={{ offset: 10, span: 13 }}
					sm={{ offset: 10, span: 10 }}
					md={{ offset: 3, span: 6 }}
				>
					<div className="icon">
						<Popover
							placement="bottomRight"
							content={content}
							title="Recently Added Products"
						>
							<Badge count={order.length}>
								<Avatar
									icon={<ShoppingCartOutlined />}
									style={{
										fontSize: "200%",
										color: "rgb(37, 172, 172)",
										backgroundColor: "rgb(249, 250, 255)",
										cursor: "pointer",
									}}
									onClick={() => navigate("/book/order")}
								/>
							</Badge>
						</Popover>

						<Dropdown menu={{ items }} trigger={["click"]}>
							<a onClick={(e) => e.preventDefault()}>
								<div className="account">
									<span>
										<Avatar
											src={avatarPath}
											icon={<UserOutlined />}
										/>
									</span>
								</div>
							</a>
						</Dropdown>
					</div>
				</Col>
			</Col>
		</Menu>
	);
}
