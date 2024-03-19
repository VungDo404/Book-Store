import {
	Button,
	Layout,
	Result,
} from "antd";
import { useState } from "react";
import "styles/Order.scss";
import RightOrder from "./RightOrder";
import LeftOrder from "./LeftOrder";

export default function Order() {
	const [success, setSuccess] = useState<boolean>(false);
	const [orderId, setOrderId] = useState<string>(''); 
	return (
		<Layout style={{ padding: "20px 0" }}>
			{success ? (
				<>
					<Result
						status="success"
						title="Successfully Purchased!"
						subTitle={`Order number: ${orderId}`} 
						extra={[
							<Button href="/" key="buy">Buy Again</Button>,
						]}
					/>
				</>
			) : (
				<>
					<LeftOrder/>
					<RightOrder setSuccess={setSuccess} setOrderId={setOrderId} />
				</>
			)}
		</Layout>
	);
}
