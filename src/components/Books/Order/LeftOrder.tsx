import InputQuantity from "@/components/others/InputQuantity";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import {
	handleDeleteCart,
	handlePutCart,
	selectedAction,
} from "@/redux/slices/cart.reducer";
import { DeleteOutlined } from "@ant-design/icons";
import { Avatar, Col, Empty, Row, Tooltip } from "antd";
import Checkbox, { CheckboxChangeEvent } from "antd/es/checkbox";
import { Content } from "antd/es/layout/layout";
import BottomOrder from "./BottomOrder";
import { useTranslation } from "react-i18next";
interface Props {
	setSuccess: React.Dispatch<React.SetStateAction<boolean>>;
	setOrderId: React.Dispatch<React.SetStateAction<string>>;
}
export default function LeftOrder(props: Props) {
	const { setSuccess, setOrderId } = props;
	const { t } = useTranslation();
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
				<Row className="header-left-order" align={"middle"}>
					<Col lg={8} xl={7} offset={1}>
					{t("order.list.header.product")}
					</Col>
					<Col lg={13} xl={16} style={{display:'flex'}}>
						<Col
							lg={{ span: 6, offset: 0 }}
							xl={{ span: 4, offset: 3 }}
						>
							{t("order.list.header.unit")}
						</Col >
						<Col
							lg={{ span: 5, offset: 3 }}
							xl={{ span: 5, offset: 2 }}
							style={{
								display: "flex",
								justifyContent: "center",
							}}
						>
							{t("order.list.header.quantity")}
						</Col>
						<Col
							lg={{ span: 6, offset: 5 }}
							xl={{ span: 4, offset: 2 }}
						>
							{t("order.list.header.total")}
						</Col>
					</Col>
				</Row>
				{cart.length > 0 ? (
					cart.map((value, index) => (
						<Row className="left-order" key={`${index}`}>
							<Col style={{ display: "flex", margin: "auto 0" }}>
								<Checkbox
									onChange={(e) => onChangeCheckBox(e, index)}
									style={{ margin: "auto 0" }}
									checked={value.isSelected}
								/>
								<Col>
									<Avatar
										shape="square"
										size={{
											xs: 50,
											sm: 60,
											md: 64,
											lg: 59,
											xl: 50,
											xxl: 53,
										}}
										src={`${
											import.meta.env.VITE_API_URL
										}/images/book/${value.book.thumbnail}`}
									/>
								</Col>
							</Col>
							<Col
								xs={18}
								sm={19}
								md={15}
								lg={19}
								xl={21}
								xxl={22}
								className="right-part"
							>
								<Col
									xs={24}
									sm={24}
									md={24}
									lg={7}
									xl={8}
									className="main-text"
								>
									{value.book.mainText}
								</Col>
								<Col
									xs={24}
									sm={24}
									md={24}
									lg={20}
									xl={16}
									className="price-info"
								>
									<Col
										xs={24}
										sm={24}
										md={24}
										lg={4}
										xl={4}
										className="order-price"
									>
										<sup>đ</sup>
										<span>
											{new Intl.NumberFormat(
												"en-DE"
											).format(value.book.price)}
										</span>
									</Col>
									<Col
										xs={12}
										sm={6}
										md={6}
										lg={8}
										xl={8}
										xxl={6}
										className="quantity"
									>
										<InputQuantity
											quantity={value.quantity}
											handleIncrease={() =>
												onChange(
													value.quantity + 1,
													value._id,
													index
												)
											}
											handleDecrease={() =>
												onChange(
													value.quantity - 1,
													value._id,
													index
												)
											}
											onChange={(quantity: number) =>
												onChange(
													quantity,
													value._id,
													index
												)
											}
										/>
									</Col>
									<Col
										xs={24}
										sm={24}
										md={24}
										lg={4}
										xl={4}
										className="total"
									>
										<sup>đ</sup>
										<span>
											{new Intl.NumberFormat(
												"en-DE"
											).format(
												value.book.price *
													value.quantity
											)}
										</span>
									</Col>
									<Col lg={2} xl={1} className="delete">
										<Tooltip title="Delete">
											<DeleteOutlined
												style={{
													cursor: "pointer",
												}}
												onClick={() =>
													onDelete(value._id)
												}
											/>
										</Tooltip>
									</Col>
								</Col>
							</Col>
						</Row>
					))
				) : (
					<Row
						className="left-order"
						justify={"center"}
						style={{ height: "auto" }}
					>
						<Empty description={t("footer.info")} />
					</Row>
				)}
				<BottomOrder setOrderId={setOrderId} setSuccess={setSuccess} />
			</Row>
		</Content>
	);
}
