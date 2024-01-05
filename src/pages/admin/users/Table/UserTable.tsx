import { Button, Col, Space, Table } from "antd";
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
import { TableParams, userType } from "../interface";
import Action from "./Body/Action";

interface propsType {
	showDrawer: () => void;
	setCurrentRecord: React.Dispatch<React.SetStateAction<userType>>;
	data: userType[];
	loading: boolean;
	tableParams: TableParams;
	setSort: React.Dispatch<React.SetStateAction<string>>;
	setCurrent: React.Dispatch<React.SetStateAction<number>>;
	setPageSize: React.Dispatch<React.SetStateAction<number>>;
	refresh: () => void;
}

export default function UserTable(props: propsType) {
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

	const {
		showDrawer,
		setCurrentRecord,
		data,
		loading,
		tableParams,
		setSort,
		setCurrent,
		setPageSize,
		refresh,
	} = props;

	const columns: ColumnsType<userType> = [
		{
			title: "id",
			dataIndex: "_id",
			render: (text) => <a>{text}</a>,
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
	const onChange = (
		pagination: TablePaginationConfig,
		filters: Record<string, FilterValue | null>,
		sorter: SorterResult<userType>
	) => {
		if (sorter) {
			const sortValue: string =
				sorter.order === "ascend"
					? `${sorter.field}`
					: `-${sorter.field}`;
			setSort(sortValue);
		}
		setCurrent(pagination.current as number);
		setPageSize(pagination.pageSize as number);
	};
	return (
		<Col md={{ offset: 0, span: 23 }}>
			<Table
				columns={columns}
				dataSource={data}
				// @ts-ignore
				onChange={onChange}
				loading={loading}
				pagination={tableParams.pagination}
				bordered
				title={() => (
					<div style={{ display: "flex" }}>
						<span>Header</span>
						<Space style={{ marginLeft: "auto" }}>
							<Button
								type="primary"
								icon={<ImportOutlined />}
								size={"middle"}
							>
								Import
							</Button>
							<Button
								type="primary"
								icon={<ExportOutlined />}
								size={"middle"}
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
								onClick={() => refresh()}
							/>
						</Space>
					</div>
				)}
			/>
			<AddUser
				isModalOpen={isModalOpen}
				refresh={refresh}
				setIsModalOpen={setIsModalOpen}
			/>
		</Col>
	);
}
