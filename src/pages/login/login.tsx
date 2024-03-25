import { login } from "@/services/auth";
import {
	Button,
	message,
	Form,
	Input,
	notification,
	Typography,
	Col,
	Divider,
	Tooltip,
} from "antd";
import "styles/login.scss";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "@/redux/hooks/hooks";
import { handleLogin } from "@/redux/slices/accountReducer";
import { interface_login_request } from "@/interface/account";
import { GoogleCircleFilled } from "@ant-design/icons";
import { useTranslation } from "react-i18next";

export default function Login() {
	const { t } = useTranslation();
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const { Title, Text } = Typography;

	const onFinish = async (values: interface_login_request) => {
		try {
			const res = await dispatch(handleLogin(values));
			if (handleLogin.fulfilled.match(res)) {
				message.success({
					content: t("login.successMessage"),
				});
				navigate("/");
			}
		} catch (error: any) {
			console.log(error);
			notification.error({
				message: error.message,
			});
		}
	};
	const onFinishFailed = (errorInfo: any) => {
		console.log("Failed:", errorInfo);
	};
	const googleLogin = async () => {
		try {
			let left = (screen.width - 484) / 2;
			let top = (screen.height - 804) / 4;
			const url = import.meta.env.VITE_GOOGLE_OAUTH_URL;
			const authWindow = await window.open(
				url,
				"",
				"resizable=yes, width=" +
					484 +
					", height=" +
					804 +
					", top=" +
					top +
					", left=" +
					left
			);
			if (authWindow) {
				authWindow.resizeTo(484, 804);
				const checkPopupWindow = setInterval(() => {
                    if (authWindow.closed) {
                        clearInterval(checkPopupWindow);
                        navigate('/');
						location.reload();
                    }
                }, 500);
			}
		} catch (error: any) {
			console.log(error);
			notification.error({
				message: error.message,
			});
		}
	};
	return (
		<div className="login-container">
			<Form
				name="login"
				initialValues={{ remember: true }}
				onFinish={onFinish}
				onFinishFailed={onFinishFailed}
				size={"large"}
				autoComplete="off"
				layout="vertical"
			>
				<Title level={3}>{t("login.header")}</Title>
				<Col span={24}>
					<Form.Item<interface_login_request>
						label="Email"
						name="email"
						rules={[
							{
								required: true,
								message: t("login.email.required"),
							},
						]}
					>
						<Input />
					</Form.Item>
				</Col>
				<Col span={24}>
					<Form.Item<interface_login_request>
						label={t("login.password.label")}
						name="password"
						rules={[
							{
								required: true,
								message: t("login.password.required"),
							},
						]}
					>
						<Input.Password />
					</Form.Item>
				</Col>
				<Col span={24}>
					<Col xs={22} md={22} lg={10} style={{ margin: "auto" }}>
						<Form.Item>
							<Button
								type="primary"
								htmlType="submit"
								ghost
								block
								style={{
									fontSize: "1.2rem",
									padding: "0.2em 0.2em",
									fontWeight: "lighter",
								}}
							>
								{t("login.button")}
							</Button>
						</Form.Item>
					</Col>
				</Col>
				<Divider>{t("login.or")}</Divider>
				<Col
					style={{
						display: "flex",
						justifyContent: "center",
						marginBottom: "10px",
					}}
				>
					<Tooltip title={t("login.google")}>
						<GoogleCircleFilled
							className="google-icon"
							onClick={() => googleLogin()}
						/>
					</Tooltip>
				</Col>
				<Text>
					{t("login.notAccount")}
					<Link to="/register" style={{ fontStyle: "italic" }}>
						{t("login.register")}
					</Link>
				</Text>
			</Form>
		</div>
	);
}
