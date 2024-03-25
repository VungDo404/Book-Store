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
import { useTranslation } from "react-i18next";

type FieldType = {
	email: string;
	username: string;
	phone: string;
};
export default function Profile() {
	const { t } = useTranslation();
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
		if (handleUpdateUserByUser.fulfilled.match(res)) {
			api.success({
				message: "Success",
				description: t("profile.successMessage"),
			});
			dispatch(
				userAction({
					fullName: info.fullName,
					phone: info.phone,
					avatar: info.avatar,
				})
			);
			localStorage.removeItem("access_token");
		} else if (handleUpdateUserByUser.rejected.match(res)) {
			api.error({
				message: "Error",
				description: `${res.error.message}`,
			});
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
				message.success(
					t("profile.upload.successMessage", { name: info.file.name })
				);
			} else if (info.file.status === "error") {
				message.error(
					t("profile.upload.errorMessage", { name: info.file.name })
				);
			}
		},
		customRequest: dummyRequest,
	};
	return (
		<>
			{contextHolder}
			<h1 style={{ fontSize: "1.3rem", fontWeight: "normal" }}>
				{t("profile.header.h1")}
			</h1>
			<h2 style={{ fontSize: "1rem", fontWeight: "normal" }}>
				{t("profile.header.h2")}
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
							label={t("profile.form.username.label")}
							name="username"
							rules={[
								{
									required: true,
									message: t(
										"profile.form.username.required"
									),
								},
							]}
						>
							<Input size="large" />
						</Form.Item>

						<Form.Item<FieldType>
							label={t("profile.form.phone.label")}
							name="phone"
							rules={[
								{
									required: true,
									message: t("profile.form.phone.required"),
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
								{t("profile.form.button")}
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
							{t("profile.upload.label")}
						</Button>
					</Upload>
				</Col>
			</Row>
		</>
	);
}
