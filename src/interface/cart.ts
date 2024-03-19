import { bookType } from "./book";
import { ApiResponse } from "./shared";

export interface Cart {
	_id: string;
	quantity: number;
	book: bookType;
	isSelected: boolean;
}
export interface SelectedPayload{
	index: number; 
	checked: boolean; 
}
export interface PostCartRequest {
	quantity: number;
	book: string;
}

export interface PostCartResponse extends ApiResponse {
	data: string;
}

export interface GetAllCartResponse extends ApiResponse {
	data: Cart[];
}

export interface PutCartRequest extends Pick<PostCartRequest, "quantity"> {}
