import {
	ApiResponse,
	DeleteResponse,
	PaginationMeta,
	SharedTableParams,
	UpdateResponse,
} from "./shared";

export interface bookType {
	_id: string;
	thumbnail: string;
	slider: string[];
	mainText: string;
	author: string;
	price: number;
	sold: number;
	quantity: number;
	category: string;
	createdAt: string;
	updatedAt: string;
	__v: number;
}

export interface interface_get_books_with_paginate extends ApiResponse {
	data: {
		meta: PaginationMeta;
		result: bookType[];
	};
}

export interface TableParams extends SharedTableParams {
	search?: SearchBookType;
}

export interface PriceRange {
	min?: number;
	max?: number;
}

export interface SearchBookType
	extends Partial<Pick<bookType, "mainText" | "category" | "author">> {
	[key: string]: string | undefined | PriceRange;
	price?: PriceRange;
}

export interface postBookResponse extends ApiResponse {
	data: bookType;
}

export interface getBookIDResponse extends postBookResponse {}

export interface postBookRequest
	extends Omit<bookType, "_id" | "__v" | "updatedAt" | "createdAt"> {}

export interface putBookResponse extends UpdateResponse {}

export interface putBookRequest extends postBookRequest {}

export interface deleteBookResponse extends DeleteResponse {}

export interface getCategoryResponse extends ApiResponse {
	data: string[];
}
export interface postUploadResponse extends ApiResponse {
	data: {
		fileUploaded: string;
	};
}
export interface Category {
	value: string;
	label: string;
}
