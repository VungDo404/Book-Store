import { bookType } from "./book";

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
