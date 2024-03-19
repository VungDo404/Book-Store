import {
	ApiResponse,
	DeleteResponse,
	PaginationMeta,
	SharedTableParams,
	UpdateResponse,
} from "./shared";

export interface userType {
	_id: string;
	fullName: string;
	email: string;
	phone: string;
	role: string;
	avatar: string;
	deleted: boolean;
	createdAt: string;
	updatedAt: string;
	__v: number;
}
export interface interface_get_users_with_paginate extends ApiResponse {
	data: {
		meta: PaginationMeta;
		result: userType[];
	};
}
export interface TableParams extends SharedTableParams {
	search?: Search;
}
export interface Search
	extends Partial<Pick<userType, "fullName" | "email" | "phone">> {}

export interface postUserType extends ApiResponse {
	data: Pick<userType, "_id" | "fullName" | "email">;
}

export interface putUserType extends UpdateResponse {}

export interface deleteUserType extends DeleteResponse {}

export interface postUsersType extends ApiResponse {
	data: {
		countSuccess: number;
		countError: number;
		countBook: number;
		message: null;
	};
}
export interface formUpdate extends Pick<userType, "fullName" | "phone"> {
	email?: string;
}
export interface putUserRequest
	extends Pick<userType, "fullName" | "phone" | "_id" | "avatar"> {}

export interface newPasswordRequest {
	email: string;
	oldpass: string;
	newpass: string;
}
export interface newPasswordResponse extends ApiResponse {
	data: string;
}
