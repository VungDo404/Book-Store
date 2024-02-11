import { Row } from "antd";
import OrderTable from "./Table/OrderTable";
import { useEffect, useState } from "react";
import { handleGetOrderAdmin } from "@/redux/slices/order.reducer";
import { useAppDispatch } from "@/redux/hooks/hooks";

export default function AdminOrder(){
    const [loading, setLoading] = useState<boolean>(true); 
    const dispatch = useAppDispatch(); 
    const fetchOrders = async () => {
		setLoading(true);
		await dispatch(handleGetOrderAdmin({ current: 1, pageSize: 10 }));
		setLoading(false);
	};
	useEffect(() => {
		fetchOrders();
	}, []);
    return (
        <> 
            <Row justify="space-around">
				<OrderTable
					loading={loading}
				/>
			</Row>
        </>
    );
}