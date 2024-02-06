import { Col, Form, Input, InputNumber, Row, Select } from "antd";
import { postBookRequest } from "../../../../../interface/book";
import { useAppSelector } from "@/redux/hooks/hooks";

export default function UpdateContent() {
    const category = useAppSelector((state) => state.bookData.category);
	return (
		<>
			<Row justify="space-around">
				<Col span={11}>
					<Form.Item<postBookRequest>
						label="Name of the book"
						name="mainText"
						rules={[
							{
								required: true,
								message: "Please input the books name!",
							},
						]}
					>
						<Input size="large" />
					</Form.Item>
				</Col>
				<Col span={11}>
					<Form.Item<postBookRequest>
						label="Author"
						name="author"
						rules={[
							{
								required: true,
								message: "Please input the author name!",
							},
						]}
					>
						<Input size="large" />
					</Form.Item>
				</Col>
			</Row>
			<Row justify="space-around">
				<Col span={5}>
					<Form.Item<postBookRequest>
						label="Price"
						name="price"
						rules={[
							{
								required: true,
								message: "Please input price!",
							},
						]}
					>
						<InputNumber
							addonAfter={"VND"}
							style={{ width: "100%" }}
							min={0}
							formatter={(value) =>
								` ${value}`.replace(
									/\B(?=(\d{3})+(?!\d))/g,
									","
								)
							}
							size="large"
						/>
					</Form.Item>
				</Col>
				<Col span={5}>
					<Form.Item<postBookRequest>
						label="Category"
						name="category"
						rules={[
							{
								required: true,
								message: "Please input type of the book!",
							},
						]}
					>
						<Select
							allowClear
							options={category}
							size="large"
							showSearch
							virtual={false}
							listHeight={250}
							listItemHeight={1}
							getPopupContainer={(trigger) =>
								trigger.parentElement
							}
						/>
					</Form.Item>
				</Col>
				<Col span={5}>
					<Form.Item<postBookRequest>
						label="Quantity"
						name="quantity"
						rules={[
							{
								required: true,
								message: "Please input the books quantity!",
							},
						]}
					>
						<InputNumber
							style={{ width: "100%" }}
							min={0}
							formatter={(value) =>
								` ${value}`.replace(
									/\B(?=(\d{3})+(?!\d))/g,
									","
								)
							}
							size="large"
						/>
					</Form.Item>
				</Col>
				<Col span={5}>
					<Form.Item<postBookRequest>
						label="Sold"
						name="sold"
						rules={[
							{
								required: true,
								message: "Please input number of sold books!",
							},
						]}
					>
						<InputNumber
							style={{ width: "100%" }}
							min={0}
							formatter={(value) =>
								` ${value}`.replace(
									/\B(?=(\d{3})+(?!\d))/g,
									","
								)
							}
							size="large"
						/>
					</Form.Item>
				</Col>
			</Row>
		</>
	);
}
