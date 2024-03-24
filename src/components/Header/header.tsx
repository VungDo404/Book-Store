import {
	ShoppingCartOutlined,
	BookTwoTone,
	GlobalOutlined,
	FacebookFilled,
	DownOutlined,
} from "@ant-design/icons";
import {
	Input,
	Col,
	Avatar,
	Badge,
	Popover,
	Row,
	Dropdown,
	Space,
	MenuProps,
} from "antd";
import { useNavigate } from "react-router-dom";
import "@/styles/header.scss";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import PreviewCart from "./PreviewCart";
import HeaderAvatar from "../others/HeaderAvatar";
import { fetchBook } from "@/redux/slices/book.reducer";
import { Header } from "antd/es/layout/layout";

const { Search } = Input;

export default function HeaderComponent() {
	const cart = useAppSelector((state) => state.cart.data);
	const isAuthenticated = useAppSelector(
		(state) => state.account.isAuthenticated
	);
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const onSearch: any = (value: string, _e: React.SyntheticEvent) => {
		dispatch(fetchBook({ search: { mainText: value }, current: 1 }));
	};
	const items: MenuProps["items"] = [
		{
			key: "en",
			label: (
				<a target="_blank" rel="noopener noreferrer">
					English
				</a>
			),
		},
		{
			key: "ve",
			label: (
				<a target="_blank" rel="noopener noreferrer">
					Vietnamese
				</a>
			),
		},
	];
	return (
		<Header className="header-container">
			<Row className="wrapper">
				<Col span={24} className="upper">
					<Col className="left-upper-header">
						<span className="follow">Follow us on</span>&#160;
						<span className="facebook-logo">
							<FacebookFilled />
						</span>
					</Col>
					<Col
						style={{
							marginLeft: "auto",
							display: "flex",
							gap: "10px",
						}}
					>
						<span style={{ fontSize: "13px" }}>
							<Dropdown menu={{ items }}>
								<a
									onClick={(e) => e.preventDefault()}
									style={{ color: "black" }}
								>
									<Space>
										<GlobalOutlined />
										English
										<DownOutlined />
									</Space>
								</a>
							</Dropdown>
						</span>
						<HeaderAvatar />
					</Col>
				</Col>
				<Col span={24} className="lower">
					<Col>
						<div
							style={{ cursor: "pointer" }}
							onClick={() => navigate("/")}
						>
							<BookTwoTone className="logo" />
							<span className="name">&#160;THE BOOK</span>
						</div>
					</Col>
					<Col
						xs={18}
						sm={19}
						md={17}
						lg={18}
						xl={14}
						style={{ display: "flex", margin: "auto" }}
					>
						<Search
							size={"large"}
							placeholder="input search text"
							onSearch={onSearch}
						/>
					</Col>
					<Col span={1}>
						<div className="icon">
							<Popover
								placement="bottomRight"
								content={<PreviewCart />}
								title="Recently Added Products"
							>
								<Badge
									count={isAuthenticated ? cart.length : 0}
								>
									<Avatar
										icon={<ShoppingCartOutlined />}
										style={{
											fontSize: "200%",
											color: "rgb(37, 172, 172)",
											backgroundColor:
												"rgb(249, 250, 255)",
											cursor: "pointer",
										}}
										onClick={() => navigate("/book/order")}
									/>
								</Badge>
							</Popover>
						</div>
					</Col>
				</Col>
			</Row>
		</Header>
	);
}
