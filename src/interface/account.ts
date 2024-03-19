import { ApiResponse } from "./shared";

interface User {
	email: string;
	phone: string;
	fullName: string;
	role: string;
	avatar: string;
	_id: string;
}
export interface interface_account extends ApiResponse {
	data: {
		user: User;
	};
}
export interface interface_login_response extends ApiResponse {
	data: {
		access_token: string;
		user: User;
	};
}
export interface interface_login_request {
	email?: string;
	password?: string;
}
export interface dashBoardResponse extends ApiResponse {
	data: {
		countOrder: number;
		countUser: number;
		countBook: number;
	};
}
export interface accountState {
	isAuthenticated: boolean;
	user: User;
}
export interface interface_user extends Partial<User> {}
