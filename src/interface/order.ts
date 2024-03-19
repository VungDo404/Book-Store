import { ApiResponse, PaginationMeta, SharedTableParams } from "./shared";

export interface postOrderRequest {
	name: string;
	address: string;
	phone: string;
	type: string;
	totalPrice: number;
	detail: {
		bookName: string;
		quantity: number;
		_id: string;
	}[];
}

export interface postOrderResponse extends ApiResponse {
	data: string; // id 
}

export interface detailOrder  {
	bookName: string;
	quantity: number;
	_id: string;
	deleted: boolean
}

export interface Order {
	_id: string;
	name: string;
	address: string;
	phone: string;
	type: string;
	detail: detailOrder[];
	totalPrice: number;
	deleted: boolean;
	createdAt: string;
	updatedAt: string;
	__v: number;
}
export interface getOrderResponse extends ApiResponse {
	data: Order[];
}

export interface dataOrderAdminResponse extends ApiResponse {
	data: {
		meta: PaginationMeta;
		result: Order[];
	};
}
export interface SearchOrderType{

}
export interface TableParams extends SharedTableParams {
	search?: SearchOrderType;
}
