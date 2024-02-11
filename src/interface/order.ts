import { TablePaginationConfig } from "antd";
import { bookType } from "./book";
import { FilterValue } from "antd/es/table/interface";

export interface postOrderRequest {
	name: string;
	address: string;
	phone: string;
	totalPrice: number;
	detail: {
		bookName: string;
		quantity: number;
		_id: string;
	}[];
}
export interface postOrderResponse {
	statusCode: number;
	message: string;
	data: string;
	author: string;
}
export interface Cart {
	quantity: number;
	detail: bookType;
}
export interface Quantity {
	quantity: number;
	_id: string;
}
export interface detailOrder {
	bookName: string;
	quantity: number;
	_id: string;
}
export interface dataOrder {
	_id: string;
	name: string;
	email: string;
	phone: string;
	userId: string;
	detail: detailOrder[];
	totalPrice: number;
	createdAt: string;
	updatedAt: string;
	__v: number;
}
export interface getOrderResponse {
	statusCode: number;
	message: string;
	data: dataOrder[];
	author: string;
}
export interface dataOrderAdmin {
	_id: string;
	name: string;
	address: string;
	phone: string;
	type: string;
	detail: detailOrder[];
	totalPrice: number;
	createdAt: string;
	updatedAt: string;
	__v: number;
}
export interface dataOrderAdminResponse {
	statusCode: number;
	message: string;
	data: {
		meta: {
			current: number;
			pageSize: number;
			pages: number;
			total: number;
		};
		result: dataOrderAdmin[];
	};
	author: string;
}
export interface SearchOrderType{

}
export interface TableParams {
	pagination: TablePaginationConfig;
	sortField?: string;
	sortOrder?: string;
	filters?: Record<string, FilterValue>;
	search?: SearchOrderType;
}
