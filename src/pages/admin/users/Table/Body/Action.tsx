import { Form, Input, Modal, Popconfirm, Space, message } from "antd";
import { userType } from "../../interface";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useState } from "react";
import { deleteUser } from "@/services/user";

interface propsType {
	record: userType;
}
interface formUpdate {
    email?: string, 
	phone: string;
	fullName: string;
}

export default function Action(props: propsType) {
	const { record } = props;
	const [messageApi, contextHolder] = message.useMessage();
	const [form] = Form.useForm();
	const [updateModal, setUpdateModal] = useState<boolean>(false);
	const cancel = (e?: React.MouseEvent<HTMLElement>) => {
		console.log(e);
	};
	const confirm = async (
		e: React.MouseEvent<HTMLElement> | undefined,
		_id: string
	) => {
		const res = await deleteUser(_id); 
        
		messageApi.success("Click on Yes");
	};
	const handleCancel = () => {
		setUpdateModal(false);
	};
	const handleSubmit = (values: formUpdate) => {
        delete values.email; 
		
        setUpdateModal(false);
	};
    const fields = [
        {
            name: ["fullName"],
            value: record.fullName,
        },
        {
            name: ["email"],
            value: record.email,
        },
        {
            name: ["phone"],
            value: record.phone,
        },
    ] 
	return (
		<Space size="middle">
			{contextHolder}
			<Popconfirm
				title="Delete the user"
				description="Are you sure to delete this user?"
				onConfirm={(e) => confirm(e, record._id)}
				onCancel={cancel}
				okText="Yes"
				cancelText="No"
				placement="leftBottom"
			>
				<DeleteOutlined style={{ cursor: "pointer" }} />
			</Popconfirm>

			<EditOutlined
				style={{ cursor: "pointer" }}
				onClick={() => setUpdateModal(true)}
			/>
			<Modal
				title="Update the user"
				open={updateModal}
				onOk={form.submit}
				onCancel={handleCancel}
				centered={true}
				okText={"Update"}
				afterClose={() => form.resetFields()}
			>
				<Form
					form={form}
					labelCol={{ span: 24 }}
					style={{ maxWidth: 600 }}
					onFinish={handleSubmit}
					autoComplete="off"
					fields={fields}
				>
					<Form.Item
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

					<Form.Item label="Email" name="email">
						<Input disabled />
					</Form.Item>

					<Form.Item
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
				</Form>
			</Modal>
		</Space>
	);
}
