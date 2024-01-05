import { Form, Input, Modal } from "antd";
import { interface_register_request } from "@/pages/register/register";

interface propsType {
	isModalOpen: boolean;
	handleSubmit: (values: any) => Promise<void>;
	handleCancel: () => void;
}

export default function AddUser(props: propsType) {
	const { isModalOpen, handleSubmit, handleCancel } = props;
	const [form] = Form.useForm();

	return (
		<Modal
			title="Add a new user"
			open={isModalOpen}
			onOk={form.submit}
			onCancel={handleCancel}
			centered={true}
			okText={"Add"}
            afterClose={() => form.resetFields()}
		>
			<Form
				form={form}
				name="basic"
				labelCol={{ span: 24 }}
				style={{ maxWidth: 600 }}
				onFinish={handleSubmit}
				autoComplete="off"
			>
				<Form.Item<interface_register_request>
					label="Username"
					name="fullName"
					rules={[
						{
							required: true,
							message: "Please input your username!",
						},
					]}
				>
					<Input />
				</Form.Item>

				<Form.Item<interface_register_request>
					label="Email"
					name="email"
					rules={[
						{
							
                            type:'email',
							message: "Please input a valid email!",
						},
                        {
                            required: true,
                            message: "Please input your email!",
                        }
					]}
				>
					<Input />
				</Form.Item>

				<Form.Item<interface_register_request>
					label="Phone"
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

				<Form.Item<interface_register_request>
					label="Password"
					name="password"
					rules={[
						{
							required: true,
							message: "Please input your password!",
						},
					]}
				>
					<Input.Password />
				</Form.Item>
			</Form>
		</Modal>
	);
}
