import { PriceRange } from "@/interface/book";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import { fetchBook, refresh } from "@/redux/slices/book.reducer";
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
import Title from "antd/es/typography/Title";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import "styles/LeftContent.scss";

interface propsType {
	setSpinning: React.Dispatch<React.SetStateAction<boolean>>;
}
export default function LeftContent(props: propsType) {
	const { setSpinning } = props;
	const { t } = useTranslation();
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
		<Row>
			<Col className="search-title" span={24}>
				<Col style={{ display: "flex", alignItems: "end" }}>
					<Title level={5}>
						<FilterOutlined
							style={{ color: "blue", fontSize: "1rem" }}
						/>{" "}
						{t("main.left.header.title")}
					</Title>
				</Col>
				<Col
					style={{
						cursor: "pointer",
					}}
				>
					<Tooltip title={t("main.left.header.clear")}>
						<Title level={5}>
							<ClearOutlined
								onClick={clear}
								style={{ fontSize: "1rem" }}
							/>{" "}
						</Title>
					</Tooltip>
				</Col>
			</Col>
			<Col offset={1}>
				<Checkbox.Group onChange={onChange} value={checkedList}>
					<Space direction="vertical">
						<span>{t("main.left.category")}</span>
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
					<span>{t("main.left.priceRange.title")}</span>
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
										placeholder={t(
											"main.left.priceRange.min"
										)}
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
										placeholder={t(
											"main.left.priceRange.max"
										)}
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
										{t("main.left.apply")}
									</Button>
								</Form.Item>
							</Col>
						</Row>
					</Form>
				</Space>
			</Col>
			<Col offset={1}>
				<Space direction="vertical">
					<span>{t("main.left.rating.title")}</span>
					<Space direction="vertical">
						<Space>
							<Rate disabled value={5} style={{ fontSize: 14 }} />
						</Space>
						<Space>
							<Rate disabled value={4} style={{ fontSize: 14 }} />
							<span>{t("main.left.rating.more")}</span>
						</Space>
						<Space>
							<Rate disabled value={3} style={{ fontSize: 14 }} />
							<span>{t("main.left.rating.more")}</span>
						</Space>
						<Space>
							<Rate disabled value={2} style={{ fontSize: 14 }} />
							<span>{t("main.left.rating.more")}</span>
						</Space>
						<Space>
							<Rate disabled value={1} style={{ fontSize: 14 }} />
							<span>{t("main.left.rating.more")}</span>
						</Space>
					</Space>
				</Space>
			</Col>
			<Divider />
		</Row>
	);
}
