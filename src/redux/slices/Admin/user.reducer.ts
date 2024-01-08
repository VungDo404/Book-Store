import { updateUser } from "@/pages/admin/users/Table/Body/Action";
import {
	Search,
	TableParams,
	interface_get_users_with_paginate,
	userType,
} from "@/pages/admin/users/interface";
import { interface_register_request } from "@/pages/register/register";
import { deleteUser, getUsersWithPaginate, postUser, postUsers, putUser } from "@/services/user";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "Redux/store/store";

// Define a type for the slice state

// Define the initial state using that type
interface stateType {
	data: userType[];
	tableParams: TableParams;
}
interface fetchUser {
	search?: Search;
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
};

export const fetchUser = createAsyncThunk(
	"fetchUser",
	async (fetch: fetchUser, { getState, dispatch }) => {
		dispatch(tableParams(fetch));
		const { userData } = getState() as { userData: stateType };
		const { current = 1, pageSize = 10 } = userData.tableParams.pagination;
		const { sortField, sortOrder, search } = userData.tableParams;
		const sort =
			sortField !== ""
				? sortOrder === "ascend"
					? `${sortField}`
					: `-${sortField}`
				: "";
		const response = await getUsersWithPaginate(
			current,
			pageSize,
			sort,
			search
		);
		return response.data;
	}
);
export const refresh = createAsyncThunk("refresh", async () => {
	const response = await getUsersWithPaginate(1, 10, "", {});
	return response.data;
});
export const addNewUser = createAsyncThunk(
	"postUser",
	async (values: interface_register_request, { dispatch, rejectWithValue }) => {
		try {
			const response = await postUser(values);
			await dispatch(refresh());
			return response.data;
		} catch (err) {
			return rejectWithValue(err);
		}
	}
);
export const addNewUsers = createAsyncThunk(
	"postUsers",
	async (values: interface_register_request[], { dispatch, rejectWithValue }) => {
		try {
			const response = await postUsers(values);
			await dispatch(refresh());
			return response.data;
		} catch (err) {
			return rejectWithValue(err);
		}
	}
);
export const handleUpdateUser = createAsyncThunk(
	"updateUser",
	async (values: updateUser, { dispatch, rejectWithValue }) => {
		try {
			const response = await putUser(values);
			await dispatch(refresh());
			return response.data;
		} catch (err) {
			return rejectWithValue(err);
		}
	}
);
export const handleDeleteUser = createAsyncThunk(
	"deleteUser", 
	async (id: string, { dispatch, rejectWithValue }) => {
		try {
			const response = await deleteUser(id);
			await dispatch(refresh());
			return response.data;
		} catch (err) {
			return rejectWithValue(err);
		}
	}
);
export const manageUserSlice = createSlice({
	name: "manageUser",
	initialState,
	reducers: {
		tableParams: (state, action: PayloadAction<fetchUser>) => {
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
		builder.addCase(fetchUser.fulfilled, (state, { payload }) => {
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
	},
});

export const { tableParams } = manageUserSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const account = (state: RootState) => state.account;

export default manageUserSlice.reducer;
