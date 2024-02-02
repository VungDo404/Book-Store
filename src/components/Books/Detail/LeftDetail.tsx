import { bookType } from "@/pages/admin/books/interface";
import { Col, Image, Modal, Row, Skeleton, Space } from "antd";
import { useEffect, useState } from "react";
import ImageGallery, { ReactImageGalleryItem } from "react-image-gallery";

interface propsType {
	loading: boolean;
	data: bookType;
}
export default function LeftDetail(props: propsType) {
	const { loading, data } = props;
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
	const [currentImage, setCurrentImage] = useState<number>(0);
	const [images, setImages] = useState<ReactImageGalleryItem[]>([]);
	const [showSlider, setShowSlider] = useState<boolean>(true);
	const showModal = () => {
		setIsModalOpen(true);
	};

	const handleCancel = () => {
		setIsModalOpen(false);
	};

	const onSlide = (currentIndex: number) => {
		setCurrentImage(currentIndex);
	};
	const onClick = (
		event: React.MouseEvent<HTMLDivElement>,
		index: number
	) => {
		setCurrentImage(index);
	};
	useEffect(() => {
		const imgs: string[] = [data.thumbnail, ...(data.slider ?? [])];
		setImages(
			imgs.map((img) => ({
				original: `${import.meta.env.VITE_API_URL}/images/book/${img}`,
				thumbnail: `${import.meta.env.VITE_API_URL}/images/book/${img}`
			}))
		);
	}, [data]);
	return (
		<>
			<Col lg={10} xs={24}>
				{loading ? (
					<>
						<Space direction="vertical" style={{ width: "100%" }}>
							<Col span={24}>
								<Skeleton.Input
									active={true}
									block={true}
									style={{ height: "300px" }}
								/>
							</Col>
							<Row align={"middle"} justify={"space-around"}>
								<Space>
									<Skeleton.Image active={true} />
									<Skeleton.Image active={true} />
									<Skeleton.Image active={true} />
								</Space>
							</Row>
						</Space>
					</>
				) : (
					<ImageGallery
						items={images}
						lazyLoad={true}
						showFullscreenButton={false}
						showPlayButton={false}
						disableSwipe={true}
						onClick={showModal}
						showNav={false}
						showBullets={true}
						onSlide={onSlide}
						slideOnThumbnailOver={true}
						showThumbnails={showSlider}
					/>
				)}
			</Col>
			<Modal
				title={<br />}
				open={isModalOpen}
				mask={true}
				width={"60vw"}
				onCancel={handleCancel}
				footer={null}
			>
				<Row gutter={8}>
					<Col span={16}>
						<ImageGallery
							items={images}
							lazyLoad={true}
							showFullscreenButton={false}
							showPlayButton={false}
							disableSwipe={true}
							showThumbnails={false}
							renderItem={(item) => (
								<Image
									src={images[currentImage].original}
									preview={false}
									style={{ minHeight: "70vh" }}
								/>
							)}
						/>
					</Col>
					<Col span={8}>
						<Row
							gutter={[8, 8]}
							justify={"start"}
							wrap
							className="grid"
						>
							{images.length > 0 &&
								images.map((img, index) => (
									<Col span={8} key={index}>
										<Image
											style={{ minHeight: "10vh" }}
											preview={false}
											src={img.thumbnail}
											onClick={(e) => onClick(e, index)}
										/>
									</Col>
								))}
						</Row>
					</Col>
				</Row>
			</Modal>
		</>
	);
}
