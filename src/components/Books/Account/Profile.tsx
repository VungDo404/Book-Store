import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import { handleAccount, userAction } from "@/redux/slices/accountReducer";
import {
	handleUpdateAvatar,
	handleUpdateUserByUser,
} from "@/redux/slices/user.reducer";
import { UploadOutlined, UserOutlined } from "@ant-design/icons";
import {
	Avatar,
	Button,
	Col,
	Divider,
	Form,
	Input,
	Row,
	Upload,
	UploadProps,
	message,
	notification,
} from "antd";
import { useState } from "react";

type FieldType = {
	email: string;
	username: string;
	phone: string;
};
export default function Profile() {
	const user = useAppSelector((state) => state.account.user);
	const dispatch = useAppDispatch();
	const [api, contextHolder] = notification.useNotification();
	const [avatarName, setAvatarPath] = useState<string>(user.avatar);
	const onFinish = async (values: FieldType) => {
		const info = {
			fullName: values.username,
			phone: values.phone,
			avatar: avatarName,
			_id: user._id,
		};
		const res = await dispatch(handleUpdateUserByUser(info));
		if(handleUpdateUserByUser.fulfilled.match(res)){
			api.success({message: 'Success', description:'Your account has been updated!'});
			dispatch(userAction({fullName: info.fullName, phone: info.phone, avatar: info.avatar}))
			localStorage.removeItem('access_token');
			
		}else if(handleUpdateUserByUser.rejected.match(res)) {
			api.error({message: 'Error', description:`${res.error.message}`})
		}
		
	};

	const onFinishFailed = (errorInfo: any) => {
		console.log("Failed:", errorInfo);
	};
	const dummyRequest = (option: any) => {
		const { onSuccess } = option;
		setTimeout(() => {
			onSuccess("ok");
		}, 100);
	};
	const props: UploadProps = {
		name: "file",
		async onChange(info) {
			if (info.file.status !== "uploading") {
				console.log(info.file, info.fileList);
				const res = await dispatch(
					handleUpdateAvatar(info.file.originFileObj as File)
				);
				if (handleUpdateAvatar.fulfilled.match(res)) {
					setAvatarPath(res.payload.data.fileUploaded);
				}
			}
			if (info.file.status === "done") {
				message.success(`${info.file.name} file uploaded successfully`);
			} else if (info.file.status === "error") {
				message.error(`${info.file.name} file upload failed.`);
			}
		},
		customRequest: dummyRequest,
	};
	return (
		<>
			{contextHolder}
			<h1 style={{ fontSize: "1.3rem", fontWeight: "normal" }}>
				My Profile
			</h1>
			<h2 style={{ fontSize: "1rem", fontWeight: "normal" }}>
				Manage and protect your account
			</h2>
			<Divider />
			<Row>
				<Col span={15}>
					<Form
						name="basic"
						labelCol={{ span: 8 }}
						onFinish={onFinish}
						onFinishFailed={onFinishFailed}
						autoComplete="off"
						initialValues={{
							username: user.fullName,
							phone: user.phone,
							email: user.email,
						}}
					>
						<Form.Item<FieldType> label="Email" name="email">
							<Input size="large" disabled />
						</Form.Item>

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
							<Input size="large" />
						</Form.Item>

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
							<Input size="large" />
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
				<Col offset={1} span={1}>
					<Divider type="vertical" style={{ height: "100%" }} />
				</Col>

				<Col
					span={7}
					style={{
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
						gap: "20px",
					}}
				>
					<Avatar
						size={100}
						icon={<UserOutlined />}
						src={`${
							import.meta.env.VITE_API_URL
						}/images/avatar/${avatarName}`}
					/>
					<Upload {...props}>
						<Button icon={<UploadOutlined />}>
							Click to Upload
						</Button>
					</Upload>
				</Col>
			</Row>
		</>
	);
}
