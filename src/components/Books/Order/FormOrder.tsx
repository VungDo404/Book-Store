import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import { handleDeleteCarts } from "@/redux/slices/cart.reducer";
import { addNewOrder } from "@/redux/slices/order.reducer";
import { Button, Col, Divider, Form, Input, Radio, Row, Space } from "antd";
import { useTranslation } from "react-i18next";

type FieldType = {
	username: string;
	phone: string;
	address: string;
	payment: string;
};
interface Props {
	setSuccess: React.Dispatch<React.SetStateAction<boolean>>;
	setOrderId: React.Dispatch<React.SetStateAction<string>>;
}
export default function FormOrder(props: Props) {
	const { setSuccess, setOrderId } = props;
	const { t } = useTranslation();
	const dispatch = useAppDispatch();
	const cart = useAppSelector((state) => state.cart.data);
	const selectedCart = cart.filter((each) => each.isSelected);
	const user = useAppSelector((state) => state.account.user);
	const totalPayment = selectedCart.reduce(
		(total, value) => total + value.quantity * value.book.price,
		0
	);
	const onFinish = async (values: FieldType) => {
		setSuccess(false);
		const detail = [];
		if (selectedCart.length > 0) {
			for (const each of selectedCart) {
				detail.push({
					bookName: each.book.mainText,
					quantity: each.quantity,
					_id: each.book._id,
				});
			}
			dispatch(handleDeleteCarts(selectedCart.map((each) => each._id)));
			const res = await dispatch(
				addNewOrder({
					name: values.username,
					address: values.address,
					phone: values.phone,
					type: values.payment,
					totalPrice: totalPayment,
					detail,
				})
			);
			if (addNewOrder.fulfilled.match(res)) {
				setOrderId(res.payload.data);
				setSuccess(true);
			}
		}
	};
	const onFinishFailed = (errorInfo: any) => {
		console.log("Failed:", errorInfo);
	};
	return (
		<Form
			name="order-detail"
			wrapperCol={{ span: 24 }}
			onFinish={onFinish}
			onFinishFailed={onFinishFailed}
			autoComplete="off"
			layout="vertical"
			initialValues={{
				username: user.fullName,
				phone: user.phone,
				payment: "COD",
			}}
		>
			<Row style={{ padding: "10px" }}>
				<Col span={24}>
					<Form.Item<FieldType>
						label={t("order.form.username.label")}
						name="username"
						rules={[
							{
								required: true,
								message: t("order.form.username.required"),
							},
						]}
					>
						<Input />
					</Form.Item>
				</Col>
				<Col span={24}>
					<Form.Item<FieldType>
						label={t("order.form.phone.label")}
						name="phone"
						rules={[
							{
								required: true,
								message: t("order.form.phone.required"),
							},
						]}
					>
						<Input />
					</Form.Item>
				</Col>
				<Col span={24}>
					<Form.Item<FieldType>
						label={t("order.form.address.label")}
						name="address"
						rules={[
							{
								required: true,
								message: t("order.form.address.required"),
							},
						]}
					>
						<Input.TextArea />
					</Form.Item>
				</Col>
				<Col span={24}>
					<Form.Item<FieldType>
						label={t("order.form.payment.label")}
						name="payment"
					>
						<Radio.Group defaultValue={1}>
							<Space direction="vertical">
								<Radio value={"COD"}>
									{t("order.form.payment.cash")}
								</Radio>
								<Radio value={"ONLINEBANKING"}>
									{t("order.form.payment.banking")}
								</Radio>
							</Space>
						</Radio.Group>
					</Form.Item>
				</Col>
				<Divider style={{ marginTop: "0" }} />
				<Col
					span={24}
					style={{
						display: "flex",
						marginBottom: "10px",
						fontWeight: "bold",
						fontSize: "1.2rem",
					}}
				>
					<span>{t("order.form.total")}</span>
					<span style={{ marginLeft: "auto" }}>
						<sup>đ</sup>
						<span>
							{new Intl.NumberFormat("en-DE").format(
								totalPayment
							)}
						</span>
					</span>
				</Col>
				<Col span={24}>
					<Form.Item>
						<Button
							type="primary"
							htmlType="submit"
							block
							size="large"
						>
							{t("order.form.button")}
						</Button>
					</Form.Item>
				</Col>
			</Row>
		</Form>
	);
}
