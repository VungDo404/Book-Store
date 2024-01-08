import { InboxOutlined } from "@ant-design/icons";
import { Col, Modal, Row, Table, UploadProps, message } from "antd";
import Dragger from "antd/es/upload/Dragger";
import type { ColumnsType } from "antd/es/table";
import * as xlsx from "xlsx";
import { useState, useEffect } from "react";
import { interface_register_request } from "@/pages/register/register";
import { addNewUsers } from "@/redux/slices/Admin/user.reducer";
import { unwrapResult } from "@reduxjs/toolkit";
import { useAppDispatch } from "@/redux/hooks/hooks";

interface propsType {
	isModalImport: boolean;
	setIsModalImport: React.Dispatch<React.SetStateAction<boolean>>;
}
interface importType extends Omit<interface_register_request, "password"> {}
export default function Import(props: propsType) {
	const { isModalImport, setIsModalImport } = props;
	const [messageApi, contextHolder] = message.useMessage();
	const [isImport, setIsImport] = useState<boolean>(true);
	const [data, setData] = useState<importType[]>([]);
	const dispatch = useAppDispatch();
	const handleOk = async () => {
		
		try {
			const users: interface_register_request[] = data.map((user) => {
				return {
					...(user as importType),
					password: import.meta.env.VITE_DEFAULT_PASSWORD_USER,
					phone: `${(user as importType).phone}`,
				};
			});
			const res = await dispatch(addNewUsers(users)).then(unwrapResult);
			const meta = res.data; 
			messageApi.open({
				type: "success",
				content: `Count success: ${meta.countSuccess}, count error: ${meta.countError}`,
			});
		} catch (error: unknown) {
			console.log(error);
			messageApi.open({
				type: "error",
				content: <div>Something went wrong</div>,
			});
		}
		setIsModalImport(false);
		setData([]);
		setIsImport(true);
	};
	const handleCancel = () => {
		setIsModalImport(false);
		setData([]);
		setIsImport(true);
	};
	const dummyRequest = (option: any) => {
		const { onSuccess } = option;
		setTimeout(() => {
			onSuccess("ok");
		}, 1000);
	};
	const columns: ColumnsType<importType> = [
		{
			title: "Name",
			dataIndex: "fullName",
			key: "fullName",
		},
		{
			title: "Email",
			dataIndex: "email",
			key: "email",
		},
		{
			title: "Phone",
			dataIndex: "phone",
			key: "phone",
		},
	];

	const paginationConfig = {
		showTotal: (total: number, range: [number, number]) =>
			`${range[0]}-${range[1]} of ${total} items`,
		pageSize: 6,
	};
	const config: UploadProps = {
		name: "file",
		multiple: false,
		accept: ".csv,.xlsx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document",
		customRequest: dummyRequest,
		onChange(info) {
			const { status } = info.file;
			if (status === "done") {
				const file = info.fileList[0].originFileObj;
				const reader: any = new FileReader();
				reader.onload = async (e: any) => {
					const dataFile = new Uint8Array(e?.target?.result);
					const workbook = xlsx.read(dataFile, { type: "array" });
					const sheetName = workbook.SheetNames[0];
					const worksheet = workbook.Sheets[sheetName];
					const json = xlsx.utils.sheet_to_json(worksheet, {
						header: ["fullName", "email", "phone"],
						range: 1,
					});
					setData(json as importType[]);
				};
				reader.readAsArrayBuffer(file);
				setIsImport(false);
			}
			if (status === "error") {
				message.error(`${info.file.name} file upload failed.`);
			}
		},
		onDrop(e) {
			console.log("Dropped files", e.dataTransfer.files);
		},
	};
	return (
		<Modal
			title="Import users"
			open={isModalImport}
			onOk={handleOk}
			onCancel={handleCancel}
			centered={true}
			okText={"Import"}
			width={"50vw"}
			maskClosable={false}
			destroyOnClose={true}
			okButtonProps={{ disabled: isImport }}
		>
			{contextHolder}
			<Row gutter={[0, 36]}>
				<Col span={24}>
					<Dragger {...config}>
						<p className="ant-upload-drag-icon">
							<InboxOutlined />
						</p>
						<p className="ant-upload-text">
							Click or drag file to this area to upload
						</p>
						<p className="ant-upload-hint">
							Support for a single or bulk upload. Strictly
							prohibited from uploading banned files.
						</p>
					</Dragger>
				</Col>
				<Col span={24}>
					<Table
						bordered
						columns={columns}
						dataSource={data}
						pagination={paginationConfig}
					/>
				</Col>
			</Row>
		</Modal>
	);
}
