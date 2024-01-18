import { useEffect, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Col, Modal, Row, Upload, UploadFile, UploadProps } from "antd";
import { useAppDispatch } from "@/redux/hooks/hooks";
import { handlePostUpload } from "@/redux/slices/Admin/book.reducer";
import { unwrapResult } from "@reduxjs/toolkit";
import { UploadRequestOption } from "rc-upload/lib/interface";
import { RcFile } from "antd/es/upload";

interface Props {
	fileListThumbnail: UploadFile<any>[];
	setFileListThumbnail: React.Dispatch<React.SetStateAction<UploadFile[]>>;
	fileListSlider: UploadFile<any>[];
	setFileListSlider: React.Dispatch<React.SetStateAction<UploadFile<any>[]>>;
}
export default function UpSertImage(props: Props) {
	const {
		fileListThumbnail,
		setFileListThumbnail,
		fileListSlider,
		setFileListSlider,
	} = props;
	const [previewOpen, setPreviewOpen] = useState(false);
	const [previewImage, setPreviewImage] = useState("");
	const [previewTitle, setPreviewTitle] = useState("");
	const dispatch = useAppDispatch();

	const cancel = () => setPreviewOpen(false);
	const getBase64 = (file: any): Promise<string> =>
		new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onload = () => resolve(reader.result as string);
			reader.onerror = (error) => reject(error);
		});
	const handlePreview = async (file: UploadFile) => {
		if (!file.url && !file.preview) {
			file.preview = await getBase64(file.originFileObj);
		}
		setPreviewImage(file.url || (file.preview as string));
		setPreviewOpen(true);
		setPreviewTitle(
			file.name || file.url!.substring(file.url!.lastIndexOf("/") + 1)
		);
	};
	const handleRequestThumbnail = async (
		options: UploadRequestOption<any>
	) => {
		const { onSuccess, file } = options;
		const res = await dispatch(handlePostUpload(file as File)).then(
			unwrapResult
		);
		if (res.statusCode === 201) {
			setFileListThumbnail([
				{
					name: res.data.fileUploaded,
					uid: (file as RcFile).uid,
					url: `${import.meta.env.VITE_API_URL}/images/book/${
						res.data.fileUploaded
					}`,
				},
			]);
		}
		setTimeout(() => {
			onSuccess?.("ok");
		}, 500);
	};
	const handleRequestSlider = async (options: UploadRequestOption<any>) => {
		const { onSuccess, file } = options;
		const res = await dispatch(handlePostUpload(file as File)).then(
			unwrapResult
		);
		if (res.statusCode === 201) {
			setFileListSlider((state) => [
				...state,
				{
					name: res.data.fileUploaded,
					uid: (file as RcFile).uid,
					url: `${import.meta.env.VITE_API_URL}/images/book/${
						res.data.fileUploaded
					}`,
				},
			]);
		}
		setTimeout(() => {
			onSuccess?.("ok");
			console.log(fileListSlider);
		}, 500);
	};
	const handleChangeSlider: UploadProps["onChange"] = async ({
		fileList: newFileList,
	}) => {
		if (newFileList.length === 0) setFileListSlider([]);
	};
	const handleRemoveSlider = (file: UploadFile<any>) => {
		const newSliders = fileListSlider.filter((f) => file.uid !== f.uid);
		setFileListSlider(newSliders);
	};
	const handleChangeThumbnail: UploadProps["onChange"] = async ({
		fileList: newFileList,
	}) => {
		if (newFileList.length === 0) setFileListThumbnail([]);
	};
	const uploadButton = (
		<button style={{ border: 0, background: "none" }} type="button">
			<PlusOutlined />
			<div style={{ marginTop: 8 }}>Upload</div>
		</button>
	);
	useEffect(() => {}, []);
	return (
		<Row justify="space-around">
			<Col span={11}>
				<label>Thumbnail</label>
				<Upload
					listType="picture-card"
					fileList={fileListThumbnail}
					onPreview={handlePreview}
					onChange={handleChangeThumbnail}
					customRequest={(options) => handleRequestThumbnail(options)}
					multiple={false}
					maxCount={1}
				>
					{fileListThumbnail.length >= 8 ? null : uploadButton}
				</Upload>
			</Col>
			<Col span={11}>
				<label>Slider</label>
				<Upload
					listType="picture-card"
					fileList={fileListSlider}
					onPreview={handlePreview}
					multiple
					onChange={handleChangeSlider}
					customRequest={(options) => handleRequestSlider(options)}
					onRemove={(file) => handleRemoveSlider(file)}
					maxCount={8}
				>
					{fileListSlider.length >= 8 ? null : uploadButton}
				</Upload>
			</Col>
			<Modal
				open={previewOpen}
				title={previewTitle}
				footer={null}
				onCancel={cancel}
			>
				<img
					alt="example"
					style={{ width: "100%" }}
					src={previewImage}
				/>
			</Modal>
		</Row>
	);
}
