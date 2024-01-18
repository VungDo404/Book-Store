import {
	Category,
	bookType,
	postBookRequest,
	putBookRequest,
} from "@/pages/admin/books/interface";
import { SearchBookType, TableParams } from "@/pages/admin/books/interface";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "Redux/store/store";
import {
	deleteBook,
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
			current: 1,
			pageSize: 10,
		},
		sortField: "",
		sortOrder: "",
		search: {},
	},
	category: [],
};

export const fetchBook = createAsyncThunk(
	"fetchBook",
	async (fetch: fetchBook, { getState, dispatch }) => {
		dispatch(tableParams(fetch));
		const { bookData } = getState() as { bookData: stateType };
		const { current = 1, pageSize = 10 } = bookData.tableParams.pagination;
		const { sortField, sortOrder, search } = bookData.tableParams;
		const sort =
			sortField !== ""
				? sortOrder === "ascend"
					? `${sortField}`
					: `-${sortField}`
				: "";
		const response = await getBooksWithPaginate(
			current,
			pageSize,
			sort,
			search
		);
		return response.data;
	}
);
export const refresh = createAsyncThunk("refresh", async () => {
	const response = await getBooksWithPaginate(1, 10, "", {});
	return response.data;
});
export const addNewBook = createAsyncThunk(
	"postBook",
	async (values: postBookRequest, { dispatch, rejectWithValue }) => {
		try {
			const response = await postBook(values);
			await dispatch(refresh());
			return response.data;
		} catch (err) {
			return rejectWithValue(err);
		}
	}
);

export const handleUpdateBook = createAsyncThunk(
	"updateBook",
	async (values: putBookRequest & { id: string }, { dispatch, rejectWithValue }) => {
		try {
			const { id, ...updateBook } = values;
			const response = await putBook(id, updateBook);
			await dispatch(fetchBook({}));
			return response.data;
		} catch (err) {
			return rejectWithValue(err);
		}
	}
);
export const handleDeleteBook = createAsyncThunk(
	"deleteBook",
	async (id: string, { dispatch, rejectWithValue }) => {
		try {
			const response = await deleteBook(id);
			await dispatch(fetchBook({}));
			return response.data;
		} catch (err) {
			return rejectWithValue(err);
		}
	}
);
export const handleGetCategory = createAsyncThunk(
	"getCategory",
	async (_: void, { rejectWithValue }) => {
		try {
			const response = await getCategory();
			return response.data;
		} catch (err) {
			return rejectWithValue(err);
		}
	}
);
export const handlePostUpload = createAsyncThunk(
	"postUpload",
	async (file: File, { rejectWithValue }) => {
		try {
			const response = await uploadImageBook(file);
			return response.data;
		} catch (err) {
			return rejectWithValue(err);
		}
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
				search: payload.search ?? state.tableParams.search,
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

// Other code such as selectors can use the imported `RootState` type
export const account = (state: RootState) => state.account;

export default manageBookSlice.reducer;
