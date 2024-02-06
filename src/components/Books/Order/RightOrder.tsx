import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import { addNewOrder, deleteAllOrder } from "@/redux/slices/orderReducer";
import { Button, Col, Divider, Form, Input, Radio, Row, Space } from "antd";
import Sider from "antd/es/layout/Sider";

type FieldType = {
	username: string;
	phone: string;
	address: string;
	payment: string;
};
interface Props {
	setSuccess: React.Dispatch<React.SetStateAction<boolean>>;
}
export default function RightOrder(props: Props) {
	const { setSuccess } = props;
	const dispatch = useAppDispatch();
	const order = useAppSelector((state) => state.order.carts);
	const user = useAppSelector((state) => state.account.user);
	const totalPayment = order.reduce(
		(total, ord) => total + ord.quantity * ord.detail.price,
		0
	);
	const onFinish = async (values: FieldType) => {
		if (order.length > 0) {
			const res = await dispatch(
				addNewOrder({
					name: values.username,
					phone: values.phone,
					address: values.address,
					totalPrice: totalPayment,
					detail: order.map((ord) => ({
						bookName: ord.detail.mainText,
						_id: ord.detail._id,
						quantity: ord.quantity,
					})),
				})
			);
			if (addNewOrder.rejected.match(res)) {
				console.log(res.error.message)
			} else if (addNewOrder.fulfilled.match(res)) {
				setSuccess(true);
				dispatch(deleteAllOrder());
			}
		}
	};
	const onFinishFailed = (errorInfo: any) => {
		console.log("Failed:", errorInfo);
	};
	return (
		<Sider
			style={{
				backgroundColor: "white",
				height: "fit-content",
				marginLeft: "10px",
				padding: "10px",
			}}
			width={"25vw"}
		>
			<Form
				name="basic"
				wrapperCol={{ span: 24 }}
				onFinish={onFinish}
				onFinishFailed={onFinishFailed}
				autoComplete="off"
				layout="vertical"
				initialValues={{
					username: user.fullName,
					phone: user.phone,
					payment: 1,
				}}
			>
				<Row>
					<Col span={24}>
						<Form.Item<FieldType>
							label="Username"
							name="username"
							rules={[
								{
									required: true,
									message: "Please input your username!",
								},
							]}
						>
							<Input />
						</Form.Item>
					</Col>
					<Col span={24}>
						<Form.Item<FieldType>
							label="Phone number"
							name="phone"
							rules={[
								{
									required: true,
									message: "Please input your phone number!",
								},
							]}
						>
							<Input />
						</Form.Item>
					</Col>
					<Col span={24}>
						<Form.Item<FieldType>
							label="Delivery  address"
							name="address"
							rules={[
								{
									required: true,
									message: "Please input your address!",
								},
							]}
						>
							<Input.TextArea />
						</Form.Item>
					</Col>
					<Col span={24}>
						<Form.Item<FieldType>
							label="Payment method"
							name="payment"
						>
							<Radio.Group defaultValue={1}>
								<Space direction="vertical">
									<Radio value={1}>Cash on Delivery</Radio>
									<Radio value={2}>PayPal</Radio>
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
						<span>Total payment</span>
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
								Place order
							</Button>
						</Form.Item>
					</Col>
				</Row>
			</Form>
		</Sider>
	);
}
