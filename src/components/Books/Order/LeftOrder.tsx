import InputQuantity from "@/components/others/InputQuantity";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import {
	handleDeleteCart,
	handlePutCart,
	selectedAction,
} from "@/redux/slices/cart.reducer";
import { DeleteOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Col, Empty, Row, Tooltip } from "antd";
import Checkbox, { CheckboxChangeEvent } from "antd/es/checkbox";
import { Content } from "antd/es/layout/layout";

export default function LeftOrder() {
	const cart = useAppSelector((state) => state.cart.data);
	const dispatch = useAppDispatch();
	const onChange = async (value: number, _id: string, index: number) => {
		await dispatch(handlePutCart({ _id, quantity: value, index }));
	};
	const onChangeCheckBox = (e: CheckboxChangeEvent, index: number) => {
		dispatch(selectedAction({ index, checked: e.target.checked }));
	};

	const onDelete = (_id: string) => {
		dispatch(handleDeleteCart(_id));
	};
	return (
		<Content>
			<Row gutter={[0, 16]}>
				<Row
					className="header-left-order"
					justify={"space-between"}
					align={"middle"}
				>
					<Col span={10} offset={2}>
						Product
					</Col>
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
				{cart.length > 0 ? (
					cart.map((value, index) => (
						<Row
							className="left-order"
							justify={"space-between"}
							align={"middle"}
							key={`${index}`}
						>
							<Col
								span={12}
								style={{
									display: "flex",
									gap: "10px",
								}}
							>
								<Checkbox
									onChange={(e) => onChangeCheckBox(e, index)}
									style={{ margin: "auto 0" }}
									checked={value.isSelected}
								/>
								<Col>
									<Avatar
										shape="square"
										size={"large"}
										icon={<UserOutlined />}
										src={`${
											import.meta.env.VITE_API_URL
										}/images/book/${value.book.thumbnail}`}
									/>
								</Col>
								<Col className="main-text">
									{value.book.mainText}
								</Col>
							</Col>
							<Col span={3} style={{ fontWeight: "bold" }}>
								<sup>đ</sup>
								<span>
									{new Intl.NumberFormat("en-DE").format(
										value.book.price
									)}
								</span>
							</Col>
							<Col span={4}>
								<InputQuantity
									quantity={value.quantity}
									handleIncrease={() =>
										onChange(value.quantity + 1, value._id, index)
									}
									handleDecrease={() =>
										onChange(value.quantity - 1, value._id, index)
									}
									onChange={(quantity: number) =>
										onChange(quantity, value._id, index)
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
										value.book.price * value.quantity
									)}
								</span>
							</Col>
							<Col>
								<Tooltip title="Delete">
									<DeleteOutlined
										style={{
											cursor: "pointer",
										}}
										onClick={() => onDelete(value._id)}
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
