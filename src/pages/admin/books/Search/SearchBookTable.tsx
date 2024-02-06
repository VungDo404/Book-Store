import { Button, Col, Form, Input, Row, Space, theme } from "antd";
import { useAppDispatch } from "@/redux/hooks/hooks";
import { fetchBook } from "@/redux/slices/book.reducer";
import { SearchBookType } from "../../../../interface/book";

interface propsType {
	fetchBooks: () => Promise<void>;
}
export default function SearchBook(props: propsType) {
	const { fetchBooks } = props;
	const { token } = theme.useToken();
	const dispatch = useAppDispatch();
	const [form] = Form.useForm();
	const formStyle: React.CSSProperties = {
		borderRadius: token.borderRadiusLG,
		padding: 24,
	};
	const onFinish = (values: SearchBookType) => {
		dispatch(fetchBook({ search: values }));
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
						<Form.Item name={`mainText`} label={`Name`}>
							<Input placeholder="Name" />
						</Form.Item>
					</Col>
					<Col span={8} key={2}>
						<Form.Item name={`author`} label={`Author`}>
							<Input placeholder="Author" />
						</Form.Item>
					</Col>
					<Col span={8} key={3}>
						<Form.Item name={`category`} label={`Category`}>
							<Input placeholder="Category" />
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
								fetchBooks();
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
