import {
	ShoppingCartOutlined,
	BookTwoTone,
} from "@ant-design/icons";
import {
	Menu,
	Input,
	Col,
	Avatar,
	Badge,
	Popover,
} from "antd";
import { useNavigate } from "react-router-dom";
import "@/styles/header.scss";
import { useAppSelector } from "@/redux/hooks/hooks";
import PreviewCart from "./PreviewCart";
import HeaderAvatar from "../others/HeaderAvatar";

const { Search } = Input;

const onSearch: any = (
	value: string,
	_e: React.SyntheticEvent,
	info: any
) => {};

export default function HeaderComponent() {
	const order = useAppSelector((state) => state.order.carts);
	const navigate = useNavigate();
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
							content={<PreviewCart />}
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
						<HeaderAvatar />
					</div>
				</Col>
			</Col>
		</Menu>
	);
}
