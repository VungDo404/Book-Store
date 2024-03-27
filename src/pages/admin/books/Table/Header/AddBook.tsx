import {
	Col,
	Form,
	Input,
	InputNumber,
	Modal,
	Row,
	Select,
	UploadFile,
	message,
} from "antd";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import { unwrapResult } from "@reduxjs/toolkit";
import { addNewBook } from "@/redux/slices/book.reducer";
import { postBookRequest } from "../../../../../interface/book";
import UpSertImage from "./UpsertImage";
import { useState } from "react";

interface propsType {
	isModalOpen: boolean;
	setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

interface formField extends Omit<postBookRequest, "slider" | "thumbnail"> {}
export default function AddBook(props: propsType) {
	const { isModalOpen, setIsModalOpen } = props;
	const [form] = Form.useForm();
	const dispatch = useAppDispatch();
	const [messageApi, contextHolder] = message.useMessage();
	const category = useAppSelector((state) => state.bookData.category);
	const [fileListThumbnail, setFileListThumbnail] = useState<UploadFile[]>(
		[]
	);
	const [fileListSlider, setFileListSlider] = useState<UploadFile[]>([]);
	const handleSubmit = async (values: formField) => {
		try {
			if (fileListThumbnail.length === 0 || fileListSlider.length === 0) {
				messageApi.error({
					content: <div>Slider and Thumbnail is required!</div>,
				});
				return;
			}
			await dispatch(
				addNewBook({
					...values,
					thumbnail: fileListThumbnail[0].name,
					slider: fileListSlider.map((slider) => {
						return `${slider.name}`;
					}),
				})
			).then(unwrapResult);
			messageApi.success("Create book successfully!");
			setFileListThumbnail([]); 
			setFileListSlider([]);
		} catch (error: unknown) {
			messageApi.error({
				content: <div>{(error as any).message[0]}</div>,
			});
		}
		setIsModalOpen(false);
	};
	const handleCancel = () => {
		setIsModalOpen(false);
		setFileListThumbnail([]); 
		setFileListSlider([]);
	};

	return (
		<Modal
			title="Add a new book"
			open={isModalOpen}
			onOk={form.submit}
			onCancel={handleCancel}
			centered={true}
			okText={"Add"}
			width={"55vw"}
			maskClosable={false}
			afterClose={() => form.resetFields()}
			destroyOnClose={true}
		>
			{contextHolder}
			<Row>
				<Form
					form={form}
					name="basic"
					layout={"vertical"}
					onFinish={handleSubmit}
					style={{ width: "100%" }}
					autoComplete="off"
				>
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
										message:
											"Please input the author name!",
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
										message:
											"Please input type of the book!",
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
										message:
											"Please input the books quantity!",
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
										message:
											"Please input number of sold books!",
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
				</Form>
			</Row>
			<UpSertImage
				fileListSlider={fileListSlider}
				fileListThumbnail={fileListThumbnail}
				setFileListSlider={setFileListSlider}
				setFileListThumbnail={setFileListThumbnail}
			/>
		</Modal>
	);
}
