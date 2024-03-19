import { updateUser } from "@/pages/admin/users/Table/Body/Action";
import {
	Search,
	deleteUserType,
	interface_get_users_with_paginate,
	newPasswordRequest,
	newPasswordResponse,
	postUserType,
	postUsersType,
	putUserRequest,
	putUserType,
} from "@/interface/user";
import { interface_register_request } from "@/pages/register/register";
import { ax } from "@/utils/axios";
import { postUploadResponse } from "@/interface/book";

const getUsersWithPaginate = (
	current: number,
	pageSize: number,
	sort: string,
	search?: Search
) => {
	const { fullName = "", email = "", phone = "" } = search ?? {};
	return ax.get<interface_get_users_with_paginate>(
		`/user?current=${current}&pageSize=${pageSize}&fullName=/${fullName}/i&email=/${email}/i&phone=/${phone}/i&sort=${sort}`
	);
};
const deleteUser = (id: string) => {
	return ax.delete<deleteUserType>(`/user/${id}`);
};
const postUser = (user: interface_register_request) => {
	return ax.post<postUserType>("/user", user);
};
const postUsers = (users: interface_register_request[]) => {
	return ax.post<postUsersType>("/user/bulk-create", users);
};
const putUser = (user: updateUser) => {
	return ax.put<putUserType>(`/user`, user);
};
const uploadImage = (file: File) => {
	let data = new FormData();
	data.append("fileImg", file);
	return ax.post<postUploadResponse>("/files/upload", data, {
		headers: {
			"upload-type": "avatar",
			"Content-Type": "multipart/form-data",
		},
	});
};
const putUserByUser = (user: putUserRequest) => {
	return ax.put<putUserType>("/user", user);
};
const newPassword = (data: newPasswordRequest) => {
	return ax.post<newPasswordResponse>("/user/change-password", data);
};

export {
	getUsersWithPaginate,
	deleteUser,
	postUser,
	putUser,
	postUsers,
	uploadImage,
	putUserByUser,
	newPassword,
};
