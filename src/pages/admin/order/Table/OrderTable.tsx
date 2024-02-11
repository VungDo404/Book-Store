import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import { ExportOutlined, ReloadOutlined, UserAddOutlined } from "@ant-design/icons";
import { Button, Col, Space, Table } from "antd";
import moment from "moment";
import { useEffect } from "react";

interface Props{
    loading: boolean
}
export default function OrderTable(props: Props){
    const { loading } = props; 
    const data = useAppSelector(state => state.order.data); 
    const tableParams = useAppSelector((state) => state.order.tableParams);
    console.log(tableParams)
    const paginationConfig = {
		...tableParams.pagination,
		showSizeChanger: true,
		showTotal: (total: number, range: [number, number]) =>
			`${range[0]}-${range[1]} of ${total} items`,
	};
    const dispatch = useAppDispatch(); 
    const columns = [
		{
			title: "id",
			dataIndex: "_id",
			
		},
		{
			title: "User Name",
			dataIndex: "name",
			filterSearch: false,
			sorter: true,
		},
		{
			title: "Total Price",
			dataIndex: "totalPrice",
			sorter: true,
		},
		{
			title: "Order placed",
			dataIndex: "createdAt",
			sorter: true,
            render: (value: string) => (
				<>
					{moment(value, "YYYY-MM-DDTHH:mm:ss.SSSZ").format(
						"YYYY-MM-DD HH:mm:ss"
					)}
				</>
			),
		},
	];
    useEffect(()=> {

    })
    return (<Col md={{ offset: 0, span: 23 }}>
        <Table
            columns={columns}
            dataSource={data}
            // @ts-ignore
            // onChange={onChange}
            loading={loading}
            pagination={paginationConfig}
            bordered
            title={() => (
                <div style={{ display: "flex" }}>
                    <span>Header</span>
                    <Space style={{ marginLeft: "auto" }}>
                        <Button
                            type="primary"
                            icon={<ExportOutlined />}
                            size={"middle"}
                            // onClick={exportCSV}
                        >
                            Export
                        </Button>
                        <ReloadOutlined
                            style={{ cursor: "pointer" }}
                            // onClick={() => dispatch(refresh())}
                        />
                    </Space>
                </div>
            )}
        />
    </Col>);
}