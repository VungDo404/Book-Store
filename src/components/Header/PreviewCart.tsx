import { useAppSelector } from "@/redux/hooks/hooks";
import { UserOutlined } from "@ant-design/icons";
import { Avatar, Button, Col, Divider, Empty, Row } from "antd";
import { useNavigate } from "react-router-dom";

export default function PreviewCart(){
    const order = useAppSelector((state) => state.order.carts);
	const previewCart = order.slice(0, 5);
	const navigate = useNavigate();
    return (
        <Row style={{ width: "400px" }} gutter={[0, 8]}>
			{previewCart.length > 0 ? (
				previewCart.map((ord, index) => (
					<Row className="line" key={`order-${index}`}>
						<Col>
							<Avatar
								shape="square"
								icon={<UserOutlined />}
								src={`${
									import.meta.env.VITE_API_URL
								}/images/book/${ord.detail.thumbnail}`}
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
							{ord.detail.mainText}
						</Col>
						<Col style={{ marginLeft: "auto", color: "#197893" }}>
							<sup>đ</sup>
							<span>
								{new Intl.NumberFormat("en-DE").format(
									ord.detail.price
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
				{order.length > 5 && (
					<span>{order.length - 5} More Products In Cart</span>
				)}
				<Button
					style={{ marginLeft: "auto" }}
					type="primary"
					onClick={() => navigate("/book/order")}
				>
					View My Shopping Cart
				</Button>
			</Col>
		</Row>
    );
}