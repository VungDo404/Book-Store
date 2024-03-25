import InputQuantity from "@/components/others/InputQuantity";
import { bookType } from "@/interface/book";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import { handleCreateCart } from "@/redux/slices/cart.reducer";
import {
	Button,
	Col,
	Divider,
	Rate,
	Row,
	Skeleton,
	Space,
	Tag,
	message,
} from "antd";
import { useState } from "react";
import { useTranslation } from "react-i18next";
interface propsType {
	loading: boolean;
	data: bookType;
}
export default function RightDetail(props: propsType) {
	const { loading, data } = props;
	const { t } = useTranslation();
	const [quantity, setQuantity] = useState<number>(1);
	const [messageApi, contextHolder] = message.useMessage();
	const cart = useAppSelector((state) => state.cart.data);
	const currentItem = cart.filter((value) => value._id === data._id);
	const availableQuantity =
		currentItem.length > 0 ? currentItem[0].quantity : 0;
	const maxQuantity = data.quantity - availableQuantity;
	const dispatch = useAppDispatch();
	const handleAddCart = () => {
		if (maxQuantity !== 0) {
			dispatch(handleCreateCart({ book: data._id, quantity }));
			messageApi.success(t("detail.successMessage"));
		} else messageApi.error(t("detail.errorMessage"));
	};
	const onChange = (value: number) => {
		if (value && value !== maxQuantity && value > 0) {
			if (value <= maxQuantity) setQuantity(value);
			else setQuantity(maxQuantity);
		}
	};

	const handleIncrease = () => {
		if (quantity < maxQuantity) {
			setQuantity(quantity + 1);
		}
	};

	const handleDecrease = () => {
		if (quantity > 1) {
			setQuantity(quantity - 1);
		}
	};
	return (
		<Col lg={14} xs={24} style={{ padding: "0 20px" }}>
			{contextHolder}
			<Space direction="vertical" size="middle" style={{ width: "100%" }}>
				<Skeleton
					active={true}
					loading={loading}
					paragraph={{ rows: 3 }}
				>
					<Row style={{ display: "flex", gap: "10px" }}>
						<Col span={24}>
							<Tag
								color="#2db7f5"
								style={{ fontSize: "0.8rem", padding: "0 4px" }}
							>
								{t("detail.right.preferred")}
							</Tag>
							<h1 className="title">{data.mainText}</h1>
						</Col>
						<Col
							sm={{ order: 2 }}
							xs={{ order: 2 }}
							md={{ order: 2 }}
							lg={{ order: 1 }}
						>
							<Row>
								<Col>
									<span
										style={{
											fontSize: "1.1rem",
											borderBottom: "1px solid #108ee9",
											color: "#108ee9",
										}}
									>
										5.0
									</span>
									<Rate
										disabled
										value={5}
										style={{
											fontSize: "1rem",
											marginLeft: 5,
											color: "#108ee9",
										}}
									/>
									<Divider
										type="vertical"
										orientationMargin={0}
									/>
								</Col>
								<Col className="none">
									<Space>
										<span
											style={{
												borderBottom:
													"1px solid #108ee9",
												fontSize: "1.1rem",
											}}
										>
											114
										</span>
										<span
											style={{
												fontSize: "1rem",
											}}
										>
											{t("detail.right.rating")}
										</span>
									</Space>
									<Divider
										type="vertical"
										orientationMargin={0}
									/>
								</Col>
								<Col>
									<Space>
										<span style={{ fontSize: "1.1rem" }}>
											{data.sold}
										</span>
										<span style={{ fontSize: "1rem" }}>
											{t("detail.right.sold")}
										</span>
									</Space>
								</Col>
							</Row>
						</Col>
						<Col
							style={{
								marginLeft: "auto",
								color: "#a9bac1",
								cursor: "pointer",
							}}
							className="none"
							md={{ order: 2 }}
							lg={{ order: 1 }}
						>
							<span>
								<span style={{ fontSize: "1.1rem" }}></span>
								<span style={{ fontSize: "1rem" }}>
									{t("detail.right.report")}
								</span>
							</span>
						</Col>
						<Col
							sm={{ order: 1 }}
							xs={{ order: 1 }}
							md={{ order: 1 }}
							span={24}
							className="price"
						>
							<sup>đ</sup>
							<span>
								{new Intl.NumberFormat("en-DE").format(
									data.price
								)}
							</span>
						</Col>
					</Row>
				</Skeleton>
				<Skeleton
					active={true}
					loading={loading}
					paragraph={{ rows: 3 }}
				>
					<Row style={{ padding: "0 10px" }}>
						<Col span={5} className="none">
							{t("detail.right.shipping.title")}
						</Col>
						<Col span={8}>
							<Space direction="vertical">
								<Row className="none">
									{t("detail.right.shipping.to")}
								</Row>
								<Row>{t("detail.right.shipping.fee")}</Row>
							</Space>
						</Col>
						<Col span={8}>
							<Space direction="vertical">
								<Row className="none">Quận 1, Sài Gòn</Row>
								<Row>
									<sup>đ</sup>
									<span>90.000</span>
								</Row>
							</Space>
						</Col>
					</Row>
					<Row
						style={{ padding: "5px 10px", margin: "10px 0" }}
						className="none"
						align={"middle"}
					>
						<Col span={5}>{t("detail.right.quantity")}</Col>
						<Col span={13}>
							<Row align={"middle"} gutter={8}>
								<Col span={10}>
									<InputQuantity
										quantity={quantity}
										onChange={onChange}
										handleDecrease={handleDecrease}
										handleIncrease={handleIncrease}
									/>
								</Col>
								<Col span={11}>
									<span>
										{data.quantity}{" "}
										{t("detail.right.available")}
									</span>
								</Col>
							</Row>
						</Col>
					</Row>
				</Skeleton>

				<Row style={{ padding: "0 10px" }} gutter={8}>
					{loading ? (
						<Space>
							<Skeleton.Button active={true} size={"large"} />
							<Skeleton.Button active={true} size={"large"} />
						</Space>
					) : (
						<>
							<Col lg={8} sm={12} xs={24}>
								<Button
									type="primary"
									ghost
									size="large"
									onClick={handleAddCart}
									block={true}
								>
									{t("detail.right.add")}
								</Button>
							</Col>
							<Col lg={8} sm={12} xs={24}>
								<Button
									type="primary"
									size="large"
									block={true}
								>
									{t("detail.right.buy")}
								</Button>
							</Col>
						</>
					)}
				</Row>
			</Space>
		</Col>
	);
}
