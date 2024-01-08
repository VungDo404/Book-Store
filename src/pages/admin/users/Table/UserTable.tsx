import { Button, Col, Space, Table, Tooltip } from "antd";
import type { ColumnsType, TablePaginationConfig } from "antd/es/table";
import {
	ExportOutlined,
	ImportOutlined,
	ReloadOutlined,
	UserAddOutlined,
} from "@ant-design/icons";
import type { FilterValue, SorterResult } from "antd/es/table/interface";
import { useState } from "react";
import AddUser from "./Header/AddUser";
import { userType } from "../interface";
import Action from "./Body/Action";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import { fetchUser, refresh } from "@/redux/slices/Admin/user.reducer";
import Import from "./Header/Import";
import * as xlsx from "xlsx";

interface propsType {
	showDrawer: () => void;
	setCurrentRecord: React.Dispatch<React.SetStateAction<userType>>;
	loading: boolean;
}

export default function UserTable(props: propsType) {
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
	const [isModalImport, setIsModalImport] = useState<boolean>(false);
	const dispatch = useAppDispatch();
	const data = useAppSelector((state) => state.userData.data);
	const tableParams = useAppSelector((state) => state.userData.tableParams);
	const { showDrawer, setCurrentRecord, loading } = props;
	const paginationConfig = {
		...tableParams.pagination,
		showSizeChanger: true,
		showTotal: (total: number, range: [number, number]) =>
			`${range[0]}-${range[1]} of ${total} items`,
	};
	const columns: ColumnsType<userType> = [
		{
			title: "id",
			dataIndex: "_id",
			render: (text) => (
				<Tooltip title="View detail">
					<a>{text}</a>
				</Tooltip>
			),
			onCell: (record: userType) => {
				return {
					onClick: () => {
						setCurrentRecord(record);
						showDrawer();
					},
				};
			},
		},
		{
			title: "Name",
			dataIndex: "fullName",
			filterSearch: false,
			sorter: true,
			width: "20%",
		},
		{
			title: "Email",
			dataIndex: "email",
			sorter: true,
		},
		{
			title: "Phone number",
			dataIndex: "phone",
			sorter: true,
			width: "20%",
		},
		{
			title: "Action",
			key: "action",
			render: (text, record) => <Action record={record} />,
			width: "10%",
		},
	];
	const showModal = () => {
		setIsModalOpen(true);
	};
	const showModalImport = () => {
		setIsModalImport(true);
	};
	const exportCSV = () => {
		const wb = xlsx.utils.book_new();
		const ws = xlsx.utils.json_to_sheet(data);
		xlsx.utils.book_append_sheet(wb, ws, "Data_User");
		xlsx.writeFile(wb, "Data_User.csv");
	};
	const onChange = (
		pagination: TablePaginationConfig,
		filters: Record<string, FilterValue | null>,
		sorter: SorterResult<userType>
	) => {
		dispatch(
			fetchUser({
				current: pagination.current,
				pageSize: pagination.pageSize,
				sortField: sorter.field as string,
				sortOrder: sorter.order as string,
			})
		);
	};
	return (
		<Col md={{ offset: 0, span: 23 }}>
			<Table
				columns={columns}
				dataSource={data}
				// @ts-ignore
				onChange={onChange}
				loading={loading}
				pagination={paginationConfig}
				bordered
				title={() => (
					<div style={{ display: "flex" }}>
						<span>Header</span>
						<Space style={{ marginLeft: "auto" }}>
							<Button
								type="primary"
								icon={<ImportOutlined />}
								size={"middle"}
								onClick={() => showModalImport()}
							>
								Import
							</Button>
							<Button
								type="primary"
								icon={<ExportOutlined />}
								size={"middle"}
								onClick={exportCSV}
							>
								Export
							</Button>
							<Button
								type="primary"
								icon={<UserAddOutlined />}
								size={"middle"}
								onClick={() => showModal()}
							>
								Add new
							</Button>
							<ReloadOutlined
								style={{ cursor: "pointer" }}
								onClick={() => dispatch(refresh())}
							/>
						</Space>
					</div>
				)}
			/>
			<AddUser
				isModalOpen={isModalOpen}
				setIsModalOpen={setIsModalOpen}
			/>
			<Import
				isModalImport={isModalImport}
				setIsModalImport={setIsModalImport}
			/>
		</Col>
	);
}
