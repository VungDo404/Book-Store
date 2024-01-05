import { Form, Input, Modal, message } from "antd";
import { interface_register_request } from "@/pages/register/register";
import { postUser } from "@/services/user";

interface propsType {
	isModalOpen: boolean;
	refresh: () => void;
	setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function AddUser(props: propsType) {
	const { isModalOpen, refresh, setIsModalOpen } = props;
	const [form] = Form.useForm();
	const [messageApi, contextHolder] = message.useMessage();
	const handleSubmit = async (values: interface_register_request) => {
		try {
			const res = (await postUser(values)).data;
			messageApi.open({
				type: "success",
				content: "Create user successfully!",
			});
			refresh();
		} catch (error: unknown) {
			messageApi.open({
				type: "error",
				content: <div>{(error as any).message[0]}</div>,
			});
		}
		setIsModalOpen(false);
	};
	const handleCancel = () => {
		setIsModalOpen(false);
	};
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
			{contextHolder}
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
							type: "email",
							message: "Please input a valid email!",
						},
						{
							required: true,
							message: "Please input your email!",
						},
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
