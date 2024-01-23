import { PriceRange } from "@/pages/admin/books/interface";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import { fetchBook, refresh } from "@/redux/slices/Admin/book.reducer";
import {
	ClearOutlined,
	FilterOutlined,
	MinusOutlined,
} from "@ant-design/icons";
import {
	Button,
	Checkbox,
	Col,
	Divider,
	Form,
	InputNumber,
	Rate,
	Row,
	Space,
	Tooltip,
} from "antd";
import { CheckboxValueType } from "antd/es/checkbox/Group";
import Sider from "antd/es/layout/Sider";
import Title from "antd/es/typography/Title";
import { useState } from "react";
interface propsType {
	setSpinning: React.Dispatch<React.SetStateAction<boolean>>;
}
export default function LeftContent(props: propsType) {
	const { setSpinning } = props;
	const [form] = Form.useForm();
	const [checkedList, setCheckedList] = useState<CheckboxValueType[]>([]);
	const dispatch = useAppDispatch();
	const category = useAppSelector((state) => state.bookData.category);
	const onFinish = (values: PriceRange) => {
		setSpinning(true);
		dispatch(
			fetchBook({
				current: import.meta.env.VITE_INIT_PAGE,
				pageSize: import.meta.env.VITE_INIT_PAGE_SIZE,
				search: { price: values },
			})
		);
		setSpinning(false);
	};

	const onFinishFailed = (errorInfo: any) => {
		console.log("Failed:", errorInfo);
	};
	const onChange = (checkedValues: CheckboxValueType[]) => {
		setSpinning(true);
		setCheckedList(checkedValues);
		const query = checkedValues.join(",");
		dispatch(
			fetchBook({
				current: import.meta.env.VITE_INIT_PAGE,
				pageSize: import.meta.env.VITE_INIT_PAGE_SIZE,
				search: { category: query },
			})
		);
		setTimeout(() => {
			setSpinning(false);
		}, 200);
	};
	const clear = () => {
		setCheckedList([]);
		dispatch(refresh());
		form.resetFields();
	};
	return (
		<Sider
			style={{ backgroundColor: "white", height: "fit-content" }}
			breakpoint="lg"
			collapsedWidth={0}
			trigger={null}
		>
			<Row>
				<Col>
					<Title level={5}>
						<FilterOutlined /> SEARCH FILTER
					</Title>
				</Col>
				<Col style={{ cursor: "pointer" }} offset={6}>
					<Tooltip title="Clear filters">
						<ClearOutlined onClick={clear} />
					</Tooltip>
				</Col>
			</Row>
			<Col offset={1}>
				<Checkbox.Group onChange={onChange} value={checkedList}>
					<Space direction="vertical">
						<span>By category</span>
						<Space direction="vertical">
							{category.length > 0 &&
								category.map((value) => (
									<Checkbox
										value={value.value}
										key={value.value}
									>
										{value.label}
									</Checkbox>
								))}
						</Space>
					</Space>
				</Checkbox.Group>
			</Col>
			<Divider />
			<Col offset={1}>
				<Space direction="vertical">
					<span>Price Range</span>
					<Form
						name="basic"
						onFinish={onFinish}
						onFinishFailed={onFinishFailed}
						autoComplete="off"
						form={form}
					>
						<Row justify="space-around">
							<Col span={9}>
								<Form.Item<PriceRange> name="min">
									<InputNumber
										style={{ width: "100%" }}
										min={0}
										formatter={(value) =>
											value
												? ` ${value}`.replace(
														/\B(?=(\d{3})+(?!\d))/g,
														","
												  )
												: ""
										}
										placeholder="₫ Min"
									/>
								</Form.Item>
							</Col>
							<Col span={2}>
								<MinusOutlined />
							</Col>
							<Col span={9}>
								<Form.Item<PriceRange> name="max">
									<InputNumber
										style={{ width: "100%" }}
										formatter={(value) =>
											value
												? ` ${value}`.replace(
														/\B(?=(\d{3})+(?!\d))/g,
														","
												  )
												: ""
										}
										placeholder="₫ Max"
									/>
								</Form.Item>
							</Col>
							<Col span={22}>
								<Form.Item>
									<Button
										type="primary"
										htmlType="submit"
										block
									>
										Apply
									</Button>
								</Form.Item>
							</Col>
						</Row>
					</Form>
				</Space>
			</Col>
			<Col offset={1}>
				<Space direction="vertical">
					<span>Rating</span>
					<Space direction="vertical">
						<Space>
							<Rate disabled value={5} style={{ fontSize: 14 }} />
						</Space>
						<Space>
							<Rate disabled value={4} style={{ fontSize: 14 }} />
							<span>& more</span>
						</Space>
						<Space>
							<Rate disabled value={3} style={{ fontSize: 14 }} />
							<span>& more</span>
						</Space>
						<Space>
							<Rate disabled value={2} style={{ fontSize: 14 }} />
							<span>& more</span>
						</Space>
						<Space>
							<Rate disabled value={1} style={{ fontSize: 14 }} />
							<span>& more</span>
						</Space>
					</Space>
				</Space>
			</Col>
			<Divider />
		</Sider>
	);
}
