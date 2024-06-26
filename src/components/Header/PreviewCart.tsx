import { useAppSelector } from "@/redux/hooks/hooks";
import { UserOutlined } from "@ant-design/icons";
import { Avatar, Button, Col, Divider, Empty, Row } from "antd";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export default function PreviewCart(){
	const { t } = useTranslation();
    const cart = useAppSelector((state) => state.cart.data);
	const previewCart = cart.slice(0, 5);
	const navigate = useNavigate();
    return (
        <Row style={{ width: "400px" }} gutter={[0, 8]}>
			{previewCart.length > 0 ? (
				previewCart.map((value, index) => (
					<Row className="line" key={`order-${index}`}>
						<Col>
							<Avatar
								shape="square"
								icon={<UserOutlined />}
								src={`${
									import.meta.env.VITE_API_URL
								}/images/book/${value.book.thumbnail}`}
							/>
						</Col>
						<Col
							span={15}
							style={{
								textOverflow: "ellipsis",
								whiteSpace: "nowrap",
								overflow: "hidden",
							}}
						>
							{value.book.mainText}
						</Col>
						<Col style={{ marginLeft: "auto", color: "#197893" }}>
							<sup>đ</sup>
							<span>
								{new Intl.NumberFormat("en-DE").format(
									value.book.price
								)}
							</span>
						</Col>
					</Row>
				))
			) : (
				<Empty style={{ width: "100%" }} />
			)}
			<Divider />
			<Col span={24} style={{ display: "flex" }}>
				{cart.length > 5 && (
					<span>{cart.length - 5} {t("header.lower.cart.footer.left")}</span>
				)}
				<Button
					style={{ marginLeft: "auto" }}
					type="primary"
					onClick={() => navigate("/book/order")}
				>
					{t("header.lower.cart.footer.right")}
				</Button>
			</Col>
		</Row>
    );
}