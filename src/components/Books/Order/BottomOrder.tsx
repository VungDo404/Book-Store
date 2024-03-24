import { Button, Checkbox, CheckboxProps, Col, Modal, Row } from "antd";
import { useState } from "react";
import FormOrder from "./FormOrder";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import { setSelectedAction } from "@/redux/slices/cart.reducer";

interface Props {
	setSuccess: React.Dispatch<React.SetStateAction<boolean>>;
	setOrderId: React.Dispatch<React.SetStateAction<string>>;
}
export default function BottomOrder(props: Props) {
	const { setSuccess, setOrderId } = props;
	const dispatch = useAppDispatch();
	const selectedCart = useAppSelector(state => state.cart.data).filter(each => each.isSelected); 
	const [isModalOpen, setIsModalOpen] = useState(false);
	const onChange: CheckboxProps["onChange"] = (e) => {
		dispatch(setSelectedAction(e.target.checked));
	};
	const showModal = () => {
		setIsModalOpen(true);
	};

	const handleCancel = () => {
		setIsModalOpen(false);
	};
	return (
		<Row className="bottom-order-container" >
			<Col className="left-bottom-order">
				<Checkbox onChange={onChange}>Select all</Checkbox>
			</Col>
			<Col className="right-bottom-order">
				<span>Total ({selectedCart.length} items)</span>
				<Button type="primary" onClick={showModal}>
					Check out
				</Button>
				<Modal
					title="Placed Order"
					open={isModalOpen}
					onCancel={handleCancel}
                    footer={null}
				>
					<FormOrder
						setOrderId={setOrderId}
						setSuccess={setSuccess}
					/>
				</Modal>
			</Col>
		</Row>
	);
}
