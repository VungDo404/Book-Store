import { Button, Col, Form, Input, Space, Table, Tooltip } from "antd";
import type { TablePaginationConfig } from "antd/es/table";
import {
	ExportOutlined,
	ReloadOutlined,
	UserAddOutlined,
} from "@ant-design/icons";
import type { FilterValue, SorterResult } from "antd/es/table/interface";
import { useState } from "react";
import { bookType} from "../interface";
import Action from "./Body/Action";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import * as xlsx from "xlsx";
import AddBook from "./Header/AddBook";
import { fetchBook, refresh } from "@/redux/slices/Admin/book.reducer";

interface propsType {
	showDrawer: () => void;
	setCurrentRecord: React.Dispatch<React.SetStateAction<bookType>>;
	loading: boolean;
}
interface EditableCellProps {
	editing: boolean;
	dataIndex: string;
	title: any;
	record: bookType;
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
export default function BookTable(props: propsType) {
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
	const dispatch = useAppDispatch();
	const data = useAppSelector((state) => state.bookData.data);
	const tableParams = useAppSelector((state) => state.bookData.tableParams);
	const [form] = Form.useForm();
	const { showDrawer, setCurrentRecord, loading } = props;
	const paginationConfig = {
		...tableParams.pagination,
		showSizeChanger: true,
		showTotal: (total: number, range: [number, number]) =>
			`${range[0]}-${range[1]} of ${total} items`,
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
			onCell: (record: bookType) => {
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
			dataIndex: "mainText",
			filterSearch: false,
			sorter: true,
			width: "20%",
		},
		{
			title: "Author",
			dataIndex: "author",
			sorter: true,
		},
		{
			title: "Category",
			dataIndex: "category",
			sorter: true,
			width: "20%",
		},
		{
			title: "Action",
			key: "action",
			render: (text: any, record: bookType) => (
				<Action
					record={record}
				/>
			),
			width: "10%",
		},
	];
	const showModal = () => {
		setIsModalOpen(true);
	};
	

	const exportCSV = () => {
		const wb = xlsx.utils.book_new();
		const ws = xlsx.utils.json_to_sheet(data);
		xlsx.utils.book_append_sheet(wb, ws, "Data_Book");
		xlsx.writeFile(wb, "Data_Book.csv");
	};
	const onChange = (
		pagination: TablePaginationConfig,
		filters: Record<string, FilterValue | null>,
		sorter: SorterResult<bookType>
	) => {
		dispatch(
			fetchBook({
				current: pagination.current,
				pageSize: pagination.pageSize,
				sortField: sorter.field as string,
				sortOrder: sorter.order as string,
			})
		);
	};

	return (
		<Col md={{ offset: 0, span: 23 }}>
			<Form form={form} component={false}>
				<Table
					columns={columns}
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
				<AddBook
					isModalOpen={isModalOpen}
					setIsModalOpen={setIsModalOpen}
				/>
			</Form>
		</Col>
	);
}
