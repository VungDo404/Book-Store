import { Form, Input, Modal, Popconfirm, Space, Tooltip, message } from "antd";
import { userType } from "../../interface";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useAppDispatch } from "@/redux/hooks/hooks";
import { unwrapResult } from "@reduxjs/toolkit";
import {
	handleDeleteUser,
	handleUpdateUser,
} from "@/redux/slices/Admin/user.reducer";

interface propsType {
	record: userType;
}
interface formUpdate {
	email?: string;
	phone: string;
	fullName: string;
}
export interface updateUser extends Omit<formUpdate, "email"> {
	_id: string;
}
export default function Action(props: propsType) {
	const { record } = props;
	const [messageApi, contextHolder] = message.useMessage();
	const dispatch = useAppDispatch();
	const [form] = Form.useForm();
	const [updateModal, setUpdateModal] = useState<boolean>(false);
	const cancel = (e?: React.MouseEvent<HTMLElement>) => {
		console.log(e);
	};
	const confirm = async (
		e: React.MouseEvent<HTMLElement> | undefined,
		_id: string
	) => {
		try {
			await dispatch(handleDeleteUser(_id)).then(unwrapResult);
			messageApi.success("Delete user successfully");
		} catch (error) {
			console.log(error);
			messageApi.error(error?.message);
		}
	};
	const handleCancel = () => {
		setUpdateModal(false);
	};
	const handleSubmit = async (values: formUpdate) => {
		delete values.email;
		try {
			await dispatch(
				handleUpdateUser({ _id: record._id, ...values })
			).then(unwrapResult);
			messageApi.success("Update user successfully");
		} catch (error) {
			console.log(error);
			messageApi.error(error?.message[0]);
		}
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
	];
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
				<Tooltip title="Delete">
					<DeleteOutlined style={{ cursor: "pointer" }} />
				</Tooltip>
			</Popconfirm>
			<Tooltip title="Update">
				<EditOutlined
					style={{ cursor: "pointer" }}
					onClick={() => setUpdateModal(true)}
				/>
			</Tooltip>
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
