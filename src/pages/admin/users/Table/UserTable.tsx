import { Button, Col, Form, Input, Space, Table, Tooltip, message } from "antd";
import type { TablePaginationConfig } from "antd/es/table";
import {
	ExportOutlined,
	ImportOutlined,
	ReloadOutlined,
	UserAddOutlined,
} from "@ant-design/icons";
import type { FilterValue, SorterResult } from "antd/es/table/interface";
import { useState } from "react";
import AddUser from "./Header/AddUser";
import { formUpdate, userType } from "../interface";
import Action from "./Body/Action";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import { fetchUser, handleUpdateUser, refresh } from "@/redux/slices/Admin/user.reducer";
import Import from "./Header/Import";
import * as xlsx from "xlsx";
import { unwrapResult } from "@reduxjs/toolkit";

interface propsType {
	showDrawer: () => void;
	setCurrentRecord: React.Dispatch<React.SetStateAction<userType>>;
	loading: boolean;
}
interface EditableCellProps {
	editing: boolean;
	dataIndex: string;
	title: any;
	record: userType;
	index: number;
	children: React.ReactNode;
}
const EditableCell: React.FC<EditableCellProps> = ({
	editing,
	dataIndex,
	title,
	record,
	index,
	children,
	...restProps
}) => {
	return (
		<td {...restProps}>
			{editing ? (
				<Form.Item
					name={dataIndex}
					style={{ margin: 0 }}
					rules={[
						{
							required: true,
							message: `Please Input ${title}!`,
						},
					]}
				>
					<Input />
				</Form.Item>
			) : (
				children
			)}
		</td>
	);
};
export default function UserTable(props: propsType) {
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
	const [isModalImport, setIsModalImport] = useState<boolean>(false);
	const [editingKey, setEditingKey] = useState<string>("");
	const [messageApi, contextHolder] = message.useMessage();
	const dispatch = useAppDispatch();
	const data = useAppSelector((state) => state.userData.data);
	const tableParams = useAppSelector((state) => state.userData.tableParams);
	const [form] = Form.useForm();
	const { showDrawer, setCurrentRecord, loading } = props;
	const paginationConfig = {
		...tableParams.pagination,
		showSizeChanger: true,
		showTotal: (total: number, range: [number, number]) =>
			`${range[0]}-${range[1]} of ${total} items`,
	};
	const isEditing = (record: userType) => record._id === editingKey;
	const edit = (record: userType) => {
		form.setFieldsValue({ name: "", age: "", address: "", ...record });
		setEditingKey(record._id);
	};
	const columns = [
		{
			title: "id",
			dataIndex: "_id",
			render: (text: any) => (
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
			editable: true,
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
			editable: true,
		},
		{
			title: "Action",
			key: "action",
			render: (text: any, record: userType) => (
				<Action
					record={record}
					isEditing={isEditing}
					edit={edit}
					editingKey={editingKey}
					cancelEdit={cancelEdit}
					save={save}
				/>
			),
			width: "10%",
		},
	];
	const showModal = () => {
		setIsModalOpen(true);
	};
	const showModalImport = () => {
		setIsModalImport(true);
	};
	const save = async (_id: string) => {
		try {
			const row = (await form.validateFields()) as formUpdate;
			await dispatch(
				handleUpdateUser({ _id, ...row})
			).then(unwrapResult);
			messageApi.success("Update user successfully");
			setEditingKey("");
		} catch (error: any) {
			console.log(error);
			if(error?.message && Array.isArray(error.message)){
				messageApi.error(error?.message[0]);
			}else messageApi.error(error?.message);
		}
	};
	const cancelEdit = () => {
		setEditingKey("");
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
	const mergedColumns = columns.map((col) => {
		if (!col.editable) {
			return col;
		}
		return {
			...col,
			onCell: (record: userType) => ({
				dataIndex: col.dataIndex,
				title: col.title,
				editing: isEditing(record),
			}),
		};
	});
	return (
		<Col md={{ offset: 0, span: 23 }}>
			{contextHolder}
			<Form form={form} component={false}>
				<Table
					columns={mergedColumns}
					dataSource={data}
					// @ts-ignore
					onChange={onChange}
					loading={loading}
					pagination={paginationConfig}
					bordered
					components={{
						body: {
							cell: EditableCell,
						},
					}}
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
			</Form>
		</Col>
	);
}
