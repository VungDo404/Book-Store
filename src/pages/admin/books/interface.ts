import type { TablePaginationConfig } from "antd/es/table";
import type { FilterValue } from "antd/es/table/interface";

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
export interface interface_get_books_with_paginate {
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
		result: bookType[];
	};
}
export interface TableParams {
	pagination: TablePaginationConfig;
	sortField?: string;
	sortOrder?: string;
	filters?: Record<string, FilterValue>;
	search?: SearchBookType;
}
export interface PriceRange {
	min: number | undefined;
	max: number | undefined;
}
export interface SearchBookType {
	[key: string]: string | undefined | PriceRange;
	mainText?: string;
	category?: string;
	author?: string;
	price?: PriceRange;
}
export interface postBookResponse {
	statusCode: number;
	message: string;
	data: {
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
		_id: string;
		__v: number;
	};
	author: string;
}
export interface postBookRequest {
	thumbnail: string;
	slider: string[];
	mainText: string;
	author: string;
	price: number;
	sold: number;
	quantity: number;
	category: string;
}
export interface putBookResponse {
	statusCode: number;
	message: string;
	data: {
		acknowledged: boolean;
		modifiedCount: number;
		upsertedId: null;
		upsertedCount: number;
		matchedCount: number;
	};
	author: string;
}
export interface putBookRequest {
	thumbnail: string;
	slider: string[];
	mainText: string;
	author: string;
	price: number;
	sold: number;
	quantity: number;
	category: string;
}
export interface deleteBookResponse {
	statusCode: number;
	message: string;
	data: {
		acknowledged: boolean;
		deletedCount: number;
	};
	author: string;
}
export interface formUpdate {
	email?: string;
	phone: string;
	fullName: string;
}
export interface getCategoryResponse {
	statusCode: number;
	message: string;
	data: string[];
	author: string;
}
export interface postUploadResponse {
	statusCode: number;
	message: string;
	data: {
		fileUploaded: string;
	};
	author: string;
}
export interface Category {
	value: string;
	label: string;
}
