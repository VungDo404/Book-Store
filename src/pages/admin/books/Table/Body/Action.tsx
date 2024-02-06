import { Form, Modal, Popconfirm, Space, Tooltip, UploadFile, message } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useAppDispatch } from "@/redux/hooks/hooks";
import { unwrapResult } from "@reduxjs/toolkit";
import { bookType } from "../../../../../interface/book";
import {
	handleDeleteBook,
	handleUpdateBook,
} from "@/redux/slices/book.reducer";
import { useEffect, useState } from "react";
import UpdateContent from "./UpdateContent";
import UpSertImage from "../Header/UpsertImage";
import { v4 as uuidv4 } from "uuid";

interface propsType {
	record: bookType;
}
interface formUpdate extends Omit<bookType, "slider" | "thumbnail" | "_id"> {}
export default function Action(props: propsType) {
	const { record } = props;
	const [messageApi, contextHolder] = message.useMessage();
	const [updateModal, setUpdateModal] = useState<boolean>(false);
	const [fileListThumbnail, setFileListThumbnail] = useState<UploadFile[]>(
		[]
	);
	const [fileListSlider, setFileListSlider] = useState<UploadFile[]>([]);
	const [form] = Form.useForm();
	const dispatch = useAppDispatch();
	const cancel = (e?: React.MouseEvent<HTMLElement>) => {
		console.log(e);
	};
	const handleCancel = () => {
		setUpdateModal(false);
	};
	const confirm = async (
		e: React.MouseEvent<HTMLElement> | undefined,
		_id: string
	) => {
		try {
			await dispatch(handleDeleteBook(_id)).then(unwrapResult);
			messageApi.success("Delete user successfully");
		} catch (error: any) {
			console.log(error);
			messageApi.error(error?.message);
		}
	};
	const handleSubmit = async (book: formUpdate) => {
		try {
			if (fileListThumbnail.length === 0 || fileListSlider.length === 0) {
				messageApi.error('Slider and Thumbnail is required!');
				return;
			}
			const res = await dispatch(
				handleUpdateBook({
					...book,
					id: record._id,
					thumbnail: fileListThumbnail[0].name,
					slider: fileListSlider.map((slider) => {
						return `${slider.name}`;
					}),
				})
			).then(unwrapResult);
			messageApi.success("Update book successfully");
		} catch (error: any) {
			console.log(error);
			if (error?.message && Array.isArray(error.message)) {
				messageApi.error(error?.message[0]);
			} else messageApi.error(error?.message);
		}
		setUpdateModal(false);
	};
	const fields = [
		{
			name: ["mainText"],
			value: record.mainText,
		},
		{
			name: ["author"],
			value: record.author,
		},
		{
			name: ["price"],
			value: record.price,
		},
		{
			name: ["category"],
			value: record.category,
		},
		{
			name: ["quantity"],
			value: record.quantity,
		},
		{
			name: ["sold"],
			value: record.sold,
		},
	];
	useEffect(() => {
		if (record.thumbnail) {
			setFileListThumbnail([
				{
					uid: uuidv4(),
					name: record.thumbnail,
					url: `${import.meta.env.VITE_API_URL}/images/book/${
						record.thumbnail
					}`,
				},
			]);
		}
		const sliders = record.slider; 
		if (sliders.length > 0) {
			const listSlider = sliders.map((slider) => ({
				uid: uuidv4(),
				name: slider,
				url: `${import.meta.env.VITE_API_URL}/images/book/${
					slider
				}`,
			}));
			setFileListSlider(listSlider);
		}
	}, [record]);
	return (
		<Space size="middle">
			{contextHolder}
			<Popconfirm
				title="Delete the book"
				description="Are you sure to delete this book?"
				onConfirm={(e) => confirm(e, record._id)}
				onCancel={cancel}
				okText="Yes"
				cancelText="No"
				placement="leftBottom"
			>
				<Tooltip title="Delete">
					<DeleteOutlined style={{ cursor: "pointer" }} />
				</Tooltip>
			</Popconfirm>
			<Tooltip title="Update">
				<EditOutlined
					style={{ cursor: "pointer" }}
					onClick={() => setUpdateModal(true)}
				/>
			</Tooltip>
			<Modal
				title="Update the book"
				open={updateModal}
				onOk={form.submit}
				onCancel={handleCancel}
				centered={true}
				okText={"Update"}
				width={"55vw"}
				afterClose={() => form.resetFields()}
				destroyOnClose={true}
			>
				<Form
					form={form}
					labelCol={{ span: 24 }}
					style={{ width: "100%" }}
					onFinish={handleSubmit}
					autoComplete="off"
					fields={fields}
				>
					<UpdateContent />
				</Form>
				<UpSertImage
					fileListSlider={fileListSlider}
					fileListThumbnail={fileListThumbnail}
					setFileListSlider={setFileListSlider}
					setFileListThumbnail={setFileListThumbnail}
				/>
			</Modal>
		</Space>
	);
}
