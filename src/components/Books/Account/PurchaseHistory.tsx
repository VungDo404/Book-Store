import { Order, detailOrder } from "@/interface/order";
import { useAppDispatch } from "@/redux/hooks/hooks";
import { handleGetOrder } from "@/redux/slices/order.reducer";
import { CheckCircleOutlined } from "@ant-design/icons";
import type { TableColumnsType } from "antd";
import { Col, Divider, Row, Table, Tag } from "antd";
import moment from "moment";
import { useEffect, useState } from "react";
interface DataType extends Order {
	key: React.Key;
}
export default function PurchaseHistory() {
	const [order, setOrder] = useState<DataType[]>([]);
	const dispatch = useAppDispatch();

	const expandedRowRender = (record: Order, index: number) => {
		const columns: TableColumnsType<detailOrder> = [
			{
				title: "Book ID",
				dataIndex: "_id",
				key: `bookID-${index}`,
			},
			{ title: "Book Name", dataIndex: "bookName", key: `name-${index}` },
			{
				title: "Quantity",
				dataIndex: "quantity",
				key: `quantity-${index}`,
			},
		];

		return (
			<Table
				columns={columns}
				dataSource={[...record.detail]}
				pagination={false}
				key={`key-${index}`}
			/>
		);
	};

	const columns: TableColumnsType<Order> = [
		{ title: "Order ID", dataIndex: "_id", key: "orderID" },
		{
			title: "Order placed",
			dataIndex: "createdAt",
			key: "createdAt",
			render: (value: string) => (
				<>
					{moment(value, "YYYY-MM-DDTHH:mm:ss.SSSZ").format(
						"YYYY-MM-DD HH:mm:ss"
					)}
				</>
			),
		},
		{ title: "Total Payment", dataIndex: "totalPrice", key: "total" },
		{
			title: "Status",
			dataIndex: "status",
			key: "status",
			render: () => (
				<Tag color="success" icon={<CheckCircleOutlined />}>
					Success
				</Tag>
			),
		},
	];

	const getData = async () => {
		const res = await dispatch(handleGetOrder());
		if (handleGetOrder.fulfilled.match(res)) {
			const newOrder = res.payload.data.map((order, index) => ({
				...order,
				key: index,
			}));
			setOrder(newOrder);
		}
	};
	useEffect(() => {
		getData();
	}, []);
	return (
		<Row>
			<h1 style={{ fontSize: "1.3rem", fontWeight: "normal" }}>
				Purchase history
			</h1>
			<Divider />
			<Col span={24}>
				<Table
					columns={columns}
					key={`l-${order.length}`}
					expandable={{
						expandedRowRender,
					}}
					dataSource={order}
					pagination={false}
				/>
			</Col>
		</Row>
	);
}
