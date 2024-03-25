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
import { useTranslation } from "react-i18next";
import { useState } from "react";

const { Search } = Input;

export default function HeaderComponent() {
	const { t, i18n } = useTranslation();
	const cart = useAppSelector((state) => state.cart.data);
	const isAuthenticated = useAppSelector(
		(state) => state.account.isAuthenticated
	);
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const [currentLocale, setCurrentLocale] = useState<string>(localStorage.getItem("i18nextLng") ?? 'en')
	const onSearch: any = (value: string, _e: React.SyntheticEvent) => {
		dispatch(fetchBook({ search: { mainText: value }, current: 1 }));
	};
	const onClick: MenuProps['onClick'] = ({ key }) => {
		i18n.changeLanguage(key)
		setCurrentLocale(key); 
	  };
	const locale:  {[key: string]: string} = {
		"vi": "Vietnamese", 
		"en": "English"
	}
	const items: MenuProps["items"] = [
		{
			key: "en",
			label: (
				<a>
					English
				</a>
			),
		},
		{
			key: "vi",
			label: (
				<a>
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
						<span className="follow">{t("header.upper.left")}</span>
						&#160;
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
							<Dropdown menu={{ items, onClick }} placement="bottom" arrow>
								<a
									onClick={(e) => e.preventDefault()}
									style={{ color: "black" }}
								>
									<Space>
										<GlobalOutlined />
										{locale[currentLocale]}
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
							placeholder={t("header.lower.search")}
							onSearch={onSearch}
						/>
					</Col>
					<Col span={1}>
						<div className="icon">
							<Popover
								placement="bottomRight"
								content={<PreviewCart />}
								title={t("header.lower.cart.header")}
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
