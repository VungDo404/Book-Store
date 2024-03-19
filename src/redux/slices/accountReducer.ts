import { accountState, interface_user } from "@/interface/account";
import { logout, account } from "@/services/auth";
import { dashBoard } from "@/services/other";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

const initialState: accountState = {
	isAuthenticated: false,
	user: {
		email: "",
		phone: "",
		fullName: "",
		role: "",
		avatar: "",
		_id: "",
	},
};

export const handleLogout = createAsyncThunk(
	"handleLogout",
	async (_: void) => {
		const response = await logout();
		return response.data;
	}
);
export const handleAccount = createAsyncThunk(
	"handleAccount",
	async (_: void) => {
		const response = await account();
		return response.data;
	}
);
export const handleGetDashBoard = createAsyncThunk(
	"handleGetDashBoard",
	async (_: void) => {
		const response = await dashBoard();
		return response.data;
	}
);
export const accountSlice = createSlice({
	name: "account",
	// `createSlice` will infer the state type from the `initialState` argument
	initialState,
	reducers: {
		userAction: (state, action: PayloadAction<interface_user>) => {
			state.isAuthenticated = true;
			state.user = { ...state.user, ...action.payload };
		},
	},
	extraReducers: (builder) => {
		// Add reducers for additional action types here, and handle loading state as needed
		builder.addCase(handleLogout.fulfilled, (state) => {
			localStorage.removeItem("access_token");
			state.isAuthenticated = false;
			state.user = initialState.user;
		});
		builder.addCase(handleAccount.fulfilled, (state, { payload }) => {
			state.isAuthenticated = true;
			state.user = payload.data.user;
		});
	},
});

export const { userAction } = accountSlice.actions;

export default accountSlice.reducer;
