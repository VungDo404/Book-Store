import InputQuantity from "@/components/InputQuantity";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import { deleteOrderAction, setQuantity } from "@/redux/slices/orderReducer";
import { DeleteOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Col, Empty, Row, Tooltip } from "antd";
import { Content } from "antd/es/layout/layout";

export default function LeftOrder() {
	const order = useAppSelector((state) => state.order.carts);
	const dispatch = useAppDispatch();
	const onChange = (value: number, _id: string) => {
		dispatch(setQuantity({ _id, quantity: value }));
	};
	const onDelete = (_id: string) => {
		dispatch(deleteOrderAction(_id));
	};
	return (
		<Content>
			<Row gutter={[0, 16]}>
				<Row
					className="header-left-order"
					justify={"space-between"}
					align={"middle"}
				>
					<Col span={10}>Product</Col>
					<Col span={3}>Unit price</Col>
					<Col
						span={4}
						style={{
							display: "flex",
							justifyContent: "center",
						}}
					>
						Quantity
					</Col>
					<Col span={3}>Total Price</Col>
					<Col>Action</Col>
				</Row>
				{order.length > 0 ? (
					order.map((ord, index) => (
						<Row
							className="left-order"
							justify={"space-between"}
							align={"middle"}
							key={`${index}`}
						>
							<Col
								span={10}
								style={{
									display: "flex",
									gap: "10px",
								}}
							>
								<Col>
									<Avatar
										shape="square"
										size={"large"}
										icon={<UserOutlined />}
										src={`${
											import.meta.env.VITE_API_URL
										}/images/book/${ord.detail.thumbnail}`}
									/>
								</Col>
								<Col className="main-text">
									{ord.detail.mainText}
								</Col>
							</Col>
							<Col span={3} style={{ fontWeight: "bold" }}>
								<sup>đ</sup>
								<span>
									{new Intl.NumberFormat("en-DE").format(
										ord.detail.price
									)}
								</span>
							</Col>
							<Col span={4}>
								<InputQuantity
									quantity={ord.quantity}
									handleIncrease={() =>
										onChange(
											ord.quantity + 1,
											ord.detail._id
										)
									}
									handleDecrease={() =>
										onChange(
											ord.quantity - 1,
											ord.detail._id
										)
									}
									onChange={(value: number) =>
										onChange(value, ord.detail._id)
									}
								/>
							</Col>
							<Col
								span={3}
								style={{
									color: "#197893",
									fontWeight: "bold",
								}}
							>
								<sup>đ</sup>
								<span>
									{new Intl.NumberFormat("en-DE").format(
										ord.detail.price * ord.quantity
									)}
								</span>
							</Col>
							<Col>
								<Tooltip title="Delete">
									<DeleteOutlined
										style={{
											cursor: "pointer",
										}}
										onClick={() => onDelete(ord.detail._id)}
									/>
								</Tooltip>
							</Col>
						</Row>
					))
				) : (
					<Row
						className="left-order"
						justify={"center"}
						style={{ height: "auto" }}
					>
						<Empty description={"No item found"} />
					</Row>
				)}
			</Row>
		</Content>
	);
}
