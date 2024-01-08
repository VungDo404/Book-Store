import type { TablePaginationConfig } from "antd/es/table";
import type { FilterValue } from "antd/es/table/interface";


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
	pagination: TablePaginationConfig;
	sortField?: string;
	sortOrder?: string;
	filters?: Record<string, FilterValue>;
	search?: Search
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

export interface putUserType{
	statusCode: number,
    message: string,
    data: {
        acknowledged: boolean,
        modifiedCount: number,
        upsertedId: null,
        upsertedCount: number,
        matchedCount: number
    },
    author: string
}
export interface deleteUserType{ 
	statusCode: number,
    message: string,
    data: {
        acknowledged: boolean,
        deletedCount: number
    },
    author: string
}
export interface postUsersType{
	statusCode: number,
    message: string,
    data: {
        countSuccess: number,
        countError: number,
        message: null
    },
    author: string
}