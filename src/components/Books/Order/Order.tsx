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
	return (
		<Layout style={{ padding: "20px 0" }}>
			{success ? (
				<>
					<Result
						status="success"
						title="Successfully Purchased!"
						subTitle="Order number: 2017182818828182881"
						extra={[
							<Button href="/" key="buy">Buy Again</Button>,
						]}
					/>
				</>
			) : (
				<>
					<LeftOrder/>
					<RightOrder setSuccess={setSuccess}/>
				</>
			)}
		</Layout>
	);
}
