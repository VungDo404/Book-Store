import {
	SearchOrderType,
	TableParams,
	Order,
	postOrderRequest,
} from "@/interface/order";
import { getOrder, getOrderAdmin, postOrder } from "@/services/order";
import {
	PayloadAction,
	createAsyncThunk,
	createSlice,
	current,
} from "@reduxjs/toolkit";

// Define a type for the slice state
interface orderState {
	data: Order[];
	tableParams: TableParams;
}
interface fetchOrder {
	search?: SearchOrderType;
	current?: number;
	pageSize?: number;
	sortField?: string;
	sortOrder?: string;
}

// Define the initial state using that type
const initialState: orderState = {
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
};
export const addNewOrder = createAsyncThunk(
	"postOrder",
	async (values: postOrderRequest) => {
		const response = await postOrder(values);
		return response.data;
	}
);
export const handleGetOrder = createAsyncThunk(
	"getOrder",
	async (_: void, { rejectWithValue }) => {
		try {
			const response = await getOrder();
			return response.data;
		} catch (err) {
			return rejectWithValue(err);
		}
	}
);
function constructQueryString(key: string, value: string) {
	switch (key) {
		case "category":
			return `&${key}=${value}`;
		default:
			return `&${key}=/${value}/i`;
	}
}
export const handleGetOrderAdmin = createAsyncThunk(
	"handleGetOrderAdmin",
	async (fetch: fetchOrder, { getState, dispatch }) => {
		dispatch(tableParams(fetch));
		const { order } = getState() as any;
		// console.log(order)
		const { current = 1, pageSize = 10 } = order.tableParams.pagination;
		// console.log(current, pageSize)
		// const { sortField, sortOrder, search } = order.tableParams;
		// const sort =
		// 	sortField &&
		// 	(sortOrder === "ascend" ? `${sortField}` : `-${sortField}`);
		// const sortQuery = sort ? `&sort=${sort}` : "";
		// const searchQuery = Object.entries(search ?? {})
		// 	.filter(([key, value]) => value)
		// 	.map(([key, value]) => constructQueryString(key, value as string))
		// 	.join("");
		// const q = [sortQuery].filter(Boolean).join("");
		const response = await getOrderAdmin(current, pageSize, "");
		return response.data;
	}
);
export const orderSlice = createSlice({
	name: "order",
	initialState,
	reducers: {
		tableParams: (state, action: PayloadAction<fetchOrder>) => {
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
		builder.addCase(handleGetOrderAdmin.fulfilled, (state, { payload }) => {
			state.data = payload.data.result;
			state.tableParams.pagination = payload.data.meta;
		});
		builder.addCase(handleGetOrderAdmin.rejected, (state, { payload }) => {
			console.log(payload);
			console.log(current(state));
		});
	},
});

export const { tableParams } = orderSlice.actions;

export default orderSlice.reducer;
