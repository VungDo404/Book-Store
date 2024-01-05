import { Button, Col, Form, Input, Row, Space, theme } from "antd";
import { Search } from "../ManageUser";
interface propsType {
	setSearch: React.Dispatch<React.SetStateAction<Search>>;
	fetchUsers: () => Promise<void>;
}
export default function SearchUser(props: propsType) {
	const { setSearch, fetchUsers } = props;
	const { token } = theme.useToken();
	const [form] = Form.useForm();
	const formStyle: React.CSSProperties = {
		borderRadius: token.borderRadiusLG,
		padding: 24,
	};
	const onFinish = (values: Search) => {
		setSearch(values);
	};
	return (
		<Col md={{ offset: 0, span: 24 }}>
			<Form
				form={form}
				name="advanced_search"
				style={formStyle}
				onFinish={onFinish}
			>
				<Row gutter={24}>
					<Col span={8} key={1}>
						<Form.Item name={`fullName`} label={`Name`}>
							<Input placeholder="Name" />
						</Form.Item>
					</Col>
					<Col span={8} key={2}>
						<Form.Item name={`email`} label={`Email`}>
							<Input placeholder="Email" />
						</Form.Item>
					</Col>
					<Col span={8} key={3}>
						<Form.Item name={`phone`} label={`Phone number`}>
							<Input placeholder="Phone number" />
						</Form.Item>
					</Col>
				</Row>
				<div style={{ textAlign: "right" }}>
					<Space size="small">
						<Button type="primary" htmlType="submit">
							Search
						</Button>
						<Button
							onClick={() => {
								form.resetFields();
								fetchUsers();
							}}
						>
							Clear
						</Button>
					</Space>
				</div>
			</Form>
		</Col>
	);
}
