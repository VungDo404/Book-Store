import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import { handleChangePassword } from "@/redux/slices/user.reducer";
import { Button, Col, Divider, Form, Input, Row, notification } from "antd";

type FieldType = {
	email: string;
	oldpass: string;
	newpass: string;
};
export default function Password() {
	const [form] = Form.useForm();
	const dispatch = useAppDispatch();
	const [api, contextHolder] = notification.useNotification();
	const user = useAppSelector((state) => state.account.user);
	const onFinish = async (values: FieldType) => {
		const res = await dispatch(handleChangePassword(values));
		if (handleChangePassword.fulfilled.match(res)) {
			api.success({
				message: "Success",
				description: "Your account has been updated!",
			});
			form.resetFields(); 
		} else if (handleChangePassword.rejected.match(res)) {
			console.log(res)
			api.error({
				message: "Error",
				description: `${(res as any).payload.message}`,
			});
		}
	};

	const onFinishFailed = (errorInfo: any) => {
		console.log("Failed:", errorInfo);
	};
	return (
		<>
			{contextHolder}
			<h1 style={{ fontSize: "1.3rem", fontWeight: "normal" }}>
				Change Password
			</h1>
			<Divider />
			<Row justify={"center"} style={{ width: "100%", display: "flex" }}>
				<Col span={13}>
					<Form
						name="basic"
						labelCol={{ span: 8 }}
						onFinish={onFinish}
						onFinishFailed={onFinishFailed}
						autoComplete="off"
						form={form}
						layout="vertical"
						initialValues={{
							email: user.email,
						}}
					>
						<Form.Item<FieldType> label="Email" name="email">
							<Input size="large" disabled />
						</Form.Item>

						<Form.Item<FieldType>
							label="Current password"
							name="oldpass"
							rules={[
								{
									required: true,
									message:
										"Please input your current password!",
								},
							]}
						>
							<Input.Password size="large" />
						</Form.Item>

						<Form.Item<FieldType>
							label="New password"
							name="newpass"
							rules={[
								{
									required: true,
									message: "Please input your new password!",
								},
							]}
						>
							<Input.Password size="large" />
						</Form.Item>

						<Form.Item wrapperCol={{ offset: 8, span: 16 }}>
							<Button
								type="primary"
								htmlType="submit"
								size="large"
							>
								Save
							</Button>
						</Form.Item>
					</Form>
				</Col>
			</Row>
		</>
	);
}
