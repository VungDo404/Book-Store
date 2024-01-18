import {
	SearchBookType,
	deleteBookResponse,
	getCategoryResponse,
	interface_get_books_with_paginate,
	postBookRequest,
	postBookResponse,
	postUploadResponse,
	putBookRequest,
	putBookResponse,
} from "@/pages/admin/books/interface";
import { ax } from "@/utils/axios";

const getBooksWithPaginate = (
	current: number,
	pageSize: number,
	sort: string,
	search?: SearchBookType
) => {
	const { author = "", mainText = "", category = "" } = search ?? {};
	return ax.get<interface_get_books_with_paginate>(
		`/book?current=${current}&pageSize=${pageSize}&author=/${author}/i&mainText=/${mainText}/i&category=/${category}/i&sort=${sort}`
	);
};
const deleteBook = (id: string) => {
	return ax.delete<deleteBookResponse>(`/book/${id}`);
};
const postBook = (Book: postBookRequest) => {
	return ax.post<postBookResponse>("/book", Book);
};
const putBook = (id: string, Book: putBookRequest) => {
	return ax.put<putBookResponse>(`/book/${id}`, Book);
};
const getCategory = () => {
	return ax.get<getCategoryResponse>("/database/category");
};
const uploadImageBook = (file: File) => {
	let data = new FormData();
	data.append("fileImg", file);
	return ax.post<postUploadResponse>("/file/upload", data, {
		headers: {
			"upload-type": "book",
			"Content-Type": "multipart/form-data",
		},
	});
};
export {
	getBooksWithPaginate,
	deleteBook,
	postBook,
	putBook,
	getCategory,
	uploadImageBook,
};
