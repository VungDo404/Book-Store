import { Button, Layout, Result } from "antd";
import { useState } from "react";
import "styles/Order.scss";
import LeftOrder from "./LeftOrder";
import Sider from "antd/es/layout/Sider";
import FormOrder from "./FormOrder";

export default function Order() {
	const [success, setSuccess] = useState<boolean>(false);
	const [orderId, setOrderId] = useState<string>("");
	return (
		<Layout style={{ padding: "20px 0" }}>
			{success ? (
				<>
					<Result
						status="success"
						title="Successfully Purchased!"
						subTitle={`Order number: ${orderId}`}
						extra={[
							<Button href="/" key="buy">
								Buy Again
							</Button>,
						]}
					/>
				</>
			) : (
				<Layout style={{ padding: "20px 0" }}>
					<LeftOrder
						setOrderId={setOrderId}
						setSuccess={setSuccess}
					/>
					<Sider
						breakpoint="lg"
						collapsedWidth={0}
						trigger={null}
						width={"20vw"}
						style={{
							backgroundColor: "white",
							height: "fit-content",
							marginLeft: "10px",
							position: "sticky",
							top: "1rem",
						}}
					>
						<FormOrder
							setOrderId={setOrderId}
							setSuccess={setSuccess}
						/>
					</Sider>
				</Layout>
			)}
		</Layout>
	);
}
