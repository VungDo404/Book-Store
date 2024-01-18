import { Col, Divider, Drawer, Modal, Row, UploadFile } from "antd";
import moment from "moment";
import { bookType } from "../../interface";
import { useEffect, useState } from "react";
import Upload, { RcFile } from "antd/es/upload";

interface DescriptionItemProps {
	title: string;
	content: React.ReactNode;
}
interface propsType {
	currentRecord: bookType;
	onClose: () => void;
	open: boolean;
}
export default function BookDetail(props: propsType) {
	const { currentRecord, onClose, open } = props;
	const [previewOpen, setPreviewOpen] = useState<boolean>(false);
	const [previewImage, setPreviewImage] = useState<string>("");
	const [previewTitle, setPreviewTitle] = useState<string>("");
	const getPreviewImage = () => {
		const preview: string[] = [
			currentRecord.thumbnail,
			...currentRecord.slider,
		];
		return preview.map((imgName, index) => {
			return {
				uid: `${index}`,
				name: imgName,
				url: `${import.meta.env.VITE_API_URL}/images/book/${imgName}`,
			};
		});
	};

	const [fileList, setFileList] = useState<UploadFile[]>([]);
	const getBase64 = (file: RcFile): Promise<string> =>
		new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onload = () => resolve(reader.result as string);
			reader.onerror = (error) => reject(error);
		});
	const handlePreview = async (file: UploadFile) => {
		if (!file.url && !file.preview) {
			file.preview = await getBase64(file.originFileObj as RcFile);
		}
		setPreviewImage(file.url || (file.preview as string));
		setPreviewOpen(true);
		setPreviewTitle(
			file.name || file.url!.substring(file.url!.lastIndexOf("/") + 1)
		);
	};

	const handleCancel = () => setPreviewOpen(false);
	const DescriptionItem = ({ title, content }: DescriptionItemProps) => (
		<div className="site-description-item-profile-wrapper">
			<p className="site-description-item-profile-p-label">{title}:</p>
			{content}
		</div>
	);
	const price = () => {
		const format = new Intl.NumberFormat("vi-VN", {
			style: "currency",
			currency: "VND",
		}).format(currentRecord.price);
		return <>{format}</>;
	};
	useEffect(() => {
		const preview = getPreviewImage();
		setFileList(preview);
	}, [currentRecord]);
	return (
		<Drawer
			title="Book information"
			placement="right"
			onClose={onClose}
			open={open}
			width={640}
		>
			<p className="site-description-item-profile-p">Book Description</p>
			<Row>
				<Col span={12}>
					<DescriptionItem
						title="Full Name"
						content={currentRecord.mainText}
					/>
				</Col>
				<Col span={12}>
					<DescriptionItem
						title="Author"
						content={currentRecord.author}
					/>
				</Col>
			</Row>
			<Row>
				<Col span={12}>
					<DescriptionItem
						title="Category"
						content={currentRecord.category}
					/>
				</Col>
				<Col span={12}>
					<DescriptionItem title="Price" content={price()} />
				</Col>
			</Row>
			<Row>
				<Col span={12}>
					<DescriptionItem
						title="Quantity"
						content={currentRecord.quantity}
					/>
				</Col>
				<Col span={12}>
					<DescriptionItem
						title="Already sold"
						content={currentRecord.sold}
					/>
				</Col>
			</Row>
			<Divider />
			<p className="site-description-item-profile-p">Other</p>

			<Row>
				<Col span={12}>
					<DescriptionItem
						title="Created Date"
						content={moment(
							currentRecord?.createdAt,
							"YYYY-MM-DDTHH:mm:ss.SSSZ"
						).format("YYYY-MM-DD HH:mm:ss")}
					/>
				</Col>
				<Col span={12}>
					<DescriptionItem
						title="Updated Date"
						content={moment(
							currentRecord?.updatedAt,
							"YYYY-MM-DDTHH:mm:ss.SSSZ"
						).format("YYYY-MM-DD HH:mm:ss")}
					/>
				</Col>
			</Row>
			<Divider orientation="left" plain>
				Preview book's images
			</Divider>
			<Upload
				listType="picture-card"
				fileList={fileList}
				onPreview={handlePreview}
				showUploadList={{ showRemoveIcon: false }}
				
			></Upload>
			<Modal
				open={previewOpen}
				title={previewTitle}
				footer={null}
				onCancel={handleCancel}
			>
				<img
					alt="example"
					style={{ width: "100%" }}
					src={previewImage}
				/>
			</Modal>
		</Drawer>
	);
}
