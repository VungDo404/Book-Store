import { getUsersWithPaginate } from "@/services/user";
import { Row } from "antd";
import type { TablePaginationConfig } from "antd/es/table";
import { useEffect, useState } from "react";
import "styles/ManageUser.scss";
import SearchUser from "./Search/SearchUserTable";
import UserTable from "./Table/UserTable";
import type { FilterValue } from "antd/es/table/interface";
import UserDetail from "./Table/UserDetail";

export interface userType {
	_id: string;
	fullName: string;
	email: string;
	phone: string;
	role: string;
	avatar: string;
	isActive: boolean;
	createdAt: string;
	updatedAt: string;
	__v: number;
}
export interface interface_get_users_with_paginate {
	statusCode: number;
	message: string;
	author: string;
	data: {
		meta: {
			current: number;
			pageSize: number;
			pages: number;
			total: number;
		};
		result: userType[];
	};
}
export interface TableParams {
	pagination?: TablePaginationConfig;
	sortField?: string;
	sortOrder?: string;
	filters?: Record<string, FilterValue>;
}
export interface Search {
	fullName?: string;
	email?: string;
	phone?: string;
}

export interface postUserType {
	statusCode: number;
	message: string;
	data: {
		email: string;
		phone: string;
		fullName: string;
		role: string;
		avatar: string;
		isActive: boolean;
		createdAt: string;
		updatedAt: string;
		_id: string;
		__v: number;
	};
	author: string;
}
export default function MangeUser() {
	const [loading, setLoading] = useState(false);
	const initSearch: Search = {
		fullName: "",
		email: "",
		phone: "",
	};
	const initRecord: userType = {
		_id: "",
		fullName: "",
		email: "",
		phone: "",
		role: "",
		avatar: "",
		isActive: false,
		createdAt: "",
		updatedAt: "",
		__v: 0,
	};
	const [current, setCurrent] = useState<number>(1);
	const [pageSize, setPageSize] = useState<number>(10);
	const [search, setSearch] = useState<Search>(initSearch);
	const [open, setOpen] = useState<boolean>(false);
	const [sort, setSort] = useState<string>("");
	const [currentRecord, setCurrentRecord] = useState<userType>(initRecord);
	const [tableParams, setTableParams] = useState<TableParams>({
		pagination: {
			current: 1,
			pageSize: 10,
		},
	});
	const [data, setData] = useState<userType[]>([]);
	const showDrawer = () => {
		setOpen(true);
	};
	const onClose = () => {
		setOpen(false);
	};
    const refresh = () => {
        setCurrent(1); 
        setPageSize(10); 
        setSearch(initSearch);
        setSort('');
        setCurrentRecord(initRecord); 
    }
	const fetchUsers = async () => {
		setLoading(true);
		const res = (
			await getUsersWithPaginate(current, pageSize, search, sort)
		).data;
		if (res.statusCode === 200) {
			setCurrent(res.data.meta.current);
			setPageSize(res.data.meta.pageSize);
			setTableParams({
				pagination: {
					...res.data.meta,
					showSizeChanger: true,
					showTotal: (total, range) => {
						return `${range[0]}-${range[1]} of ${total} items`;
					},
				},
			});
			setData([...res.data.result]);
		}
		setLoading(false);
	};
	useEffect(() => {
		fetchUsers();
	}, [current, pageSize, search, sort]);
	return (
		<>
			<Row justify="space-around">
				<SearchUser setSearch={setSearch} fetchUsers={fetchUsers} />
				<UserTable
					showDrawer={showDrawer}
					setCurrentRecord={setCurrentRecord}
					data={data}
					loading={loading}
					tableParams={tableParams}
					setCurrent={setCurrent}
					setSort={setSort}
					setPageSize={setPageSize}
                    refresh={refresh}
				/>
			</Row>
			<UserDetail
				currentRecord={currentRecord}
				onClose={onClose}
				open={open}
			/>
		</>
	);
}
