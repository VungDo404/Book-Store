import {
	Category,
	PriceRange,
	bookType,
	postBookRequest,
	putBookRequest,
} from "@/interface/book";
import { SearchBookType, TableParams } from "@/interface/book";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import {
	deleteBook,
	getBookByID,
	getBooksWithPaginate,
	getCategory,
	postBook,
	putBook,
	uploadImageBook,
} from "@/services/book";

// Define a type for the slice state

// Define the initial state using that type
interface stateType {
	data: bookType[];
	tableParams: TableParams;
	category: Category[];
}
interface fetchBook {
	search?: SearchBookType;
	current?: number;
	pageSize?: number;
	sortField?: string;
	sortOrder?: string;
}
const initialState: stateType = {
	data: [],
	tableParams: {
		pagination: {
			current: +import.meta.env.VITE_INIT_PAGE,
			pageSize: +import.meta.env.VITE_INIT_PAGE_SIZE,
		},
		sortField: "",
		sortOrder: "",
		search: {},
	},
	category: [],
};
function constructQueryString(key: string, value: string | PriceRange) {
	switch (key) {
		case "category":
			return `&${key}=${value}`;
		case "price":
			const greater =
				(value as PriceRange).min &&
				`&price>=${(value as PriceRange).min}`;
			const less =
				(value as PriceRange).max &&
				`&price<=${(value as PriceRange).max}`;
			return [greater, less].filter(Boolean).join("");
		default:
			return `&${key}=/${value}/i`;
	}
}
export const fetchBook = createAsyncThunk(
	"fetchBook",
	async (fetch: fetchBook, { getState, dispatch }) => {
		dispatch(tableParams(fetch));
		const { bookData } = getState() as { bookData: stateType };
		const { current = 1, pageSize = 10 } = bookData.tableParams.pagination;
		const { sortField, sortOrder, search } = bookData.tableParams;
		const sort =
			sortField &&
			(sortOrder === "ascend" ? `${sortField}` : `-${sortField}`);
		const sortQuery = sort ? `&sort=${sort}` : "";
		const searchQuery = Object.entries(search ?? {})
			.filter(([key, value]) => value)
			.map(([key, value]) => constructQueryString(key, value as string))
			.join("");
		const q = [sortQuery, searchQuery].filter(Boolean).join("");
		const response = await getBooksWithPaginate(current, pageSize, q);
		return response.data;
	}
);
export const refresh = createAsyncThunk("refresh", async () => {
	const response = await getBooksWithPaginate(
		+import.meta.env.VITE_INIT_PAGE,
		+import.meta.env.VITE_INIT_PAGE_SIZE,
		""
	);
	return response.data;
});
export const addNewBook = createAsyncThunk(
	"postBook",
	async (values: postBookRequest, { dispatch }) => {
		const response = await postBook(values);
		await dispatch(refresh());
		return response.data;
	}
);

export const handleUpdateBook = createAsyncThunk(
	"updateBook",
	async (values: putBookRequest & { id: string }, { dispatch }) => {
		const { id, ...updateBook } = values;
		const response = await putBook(id, updateBook);
		await dispatch(fetchBook({}));
		return response.data;
	}
);
export const handleDeleteBook = createAsyncThunk(
	"deleteBook",
	async (id: string, { dispatch }) => {
		const response = await deleteBook(id);
		await dispatch(fetchBook({}));
		return response.data;
	}
);
export const handleGetCategory = createAsyncThunk(
	"getCategory",
	async (_: void) => {
		const response = await getCategory();
		return response.data;
	}
);
export const handleGetBookByID = createAsyncThunk(
	"getBookByID",
	async (id: string) => {
		const response = await getBookByID(id);
		return response.data;
	}
);
export const handlePostUpload = createAsyncThunk(
	"postUpload",
	async (file: File) => {
		const response = await uploadImageBook(file);
		return response.data;
	}
);
export const manageBookSlice = createSlice({
	name: "manageBook",
	initialState,
	reducers: {
		tableParams: (state, action: PayloadAction<fetchBook>) => {
			const payload = action.payload;
			state.tableParams = {
				...state.tableParams,
				pagination: {
					...state.tableParams.pagination,
					current:
						payload.current ?? state.tableParams.pagination.current,
					pageSize:
						payload.pageSize ??
						state.tableParams.pagination.pageSize,
				},
				sortOrder:
					payload.sortField || payload.sortOrder
						? payload.sortOrder ?? ""
						: state.tableParams.sortOrder,
				sortField:
					payload.sortField || payload.sortOrder
						? payload.sortOrder
							? payload.sortField
							: ""
						: state.tableParams.sortField,
				search: {
					...state.tableParams.search,
					...(payload.search ?? {}),
				},
			};
		},
	},
	extraReducers: (builder) => {
		builder.addCase(fetchBook.fulfilled, (state, { payload }) => {
			state.data = payload.data.result;
			state.tableParams.pagination = payload.data.meta;
		});
		builder.addCase(refresh.fulfilled, (state, { payload }) => {
			state.data = payload.data.result;
			state.tableParams.pagination = payload.data.meta;
			state.tableParams.sortField = "";
			state.tableParams.sortOrder = "";
			state.tableParams.search = {};
		});
		builder.addCase(handleGetCategory.fulfilled, (state, { payload }) => {
			state.category = payload.data.map((value) => ({
				value,
				label: value,
			}));
		});
	},
});

export const { tableParams } = manageBookSlice.actions;

export default manageBookSlice.reducer;
