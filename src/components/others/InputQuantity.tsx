import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Input, Space } from "antd";

interface Props {
	quantity: number;
	onChange: (value: number) => void;
	handleIncrease: () => void;
	handleDecrease: () => void;
}
export default function InputQuantity(props: Props) {
	const { quantity, onChange, handleDecrease, handleIncrease } = props;
	const exceptThisSymbols = ["e", "E", "+", "-", "."];

	return (
		<Space.Compact style={{ width: "100%" }}>
			<Button onClick={handleDecrease} style={{ width: "20%" }}>
				<span style={{ display: "flex", justifyContent: "center" }}>
					<MinusOutlined />
				</span>
			</Button>
			<Input
				onKeyDown={(e) =>
					exceptThisSymbols.includes(e.key) && e.preventDefault()
				}
				onChange={(e) => onChange(+e.target.value)}
				value={quantity}
				style={{ textAlign: "center" }}
			/>
			<Button onClick={handleIncrease} style={{ width: "20%" }}>
				<span style={{ display: "flex", justifyContent: "center" }}>
					<PlusOutlined />
				</span>
			</Button>
		</Space.Compact>
	);
}
