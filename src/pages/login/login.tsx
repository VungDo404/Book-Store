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
import { userAction } from "@/redux/slices/accountReducer";
import {
	interface_login_request,
	interface_login_response,
} from "@/interface/account";
import { handleGetCartsOfUser } from "@/redux/slices/cart.reducer";
import { GoogleCircleFilled, GoogleOutlined } from "@ant-design/icons";

export default function Login() {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const { Title, Text } = Typography;

	const onFinish = async (values: interface_login_request) => {
		try {
			const result: interface_login_response = (await login(values)).data;
			if (result.statusCode === 201) {
				localStorage.setItem("access_token", result.data.access_token);

				dispatch(userAction(result.data.user));
				dispatch(handleGetCartsOfUser());
				message.success({
					content: "Login successfully",
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
				<Title level={3}>LOGIN</Title>
				<Col span={24}>
					<Form.Item<interface_login_request>
						label="Email"
						name="email"
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
					<Form.Item<interface_login_request>
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
								Submit
							</Button>
						</Form.Item>
					</Col>
				</Col>
				<Divider>OR</Divider>
				<Col
					style={{
						display: "flex",
						justifyContent: "center",
						marginBottom: "10px",
					}}
				>
					<Tooltip title="Sign in with Google account">
                    
						<GoogleCircleFilled className="google-icon"/>
					</Tooltip>
				</Col>
				<Text>
					Don't have an account yet?
					<Link to="/register" style={{ fontStyle: "italic" }}>
						Create one
					</Link>
				</Text>
			</Form>
		</div>
	);
}
