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
		id: "",
	},
};

export const handleLogout = createAsyncThunk(
	"handleLogout",
	async (_:  void, { rejectWithValue }) => {
		try {
			const response = await logout();
			return response.data;
		} catch (err) {
			console.log(err)
			return rejectWithValue(err);
		}
	}
);
export const handleAccount = createAsyncThunk(
	"handleAccount",
	async (_:  void, { rejectWithValue }) => {
		try {
			const response = await account();
			return response.data;
		} catch (err) {
			console.log(err)
			return rejectWithValue(err);
		}
	}
);
export const handleGetDashBoard = createAsyncThunk(
	"handleGetDashBoard",
	async (_:  void, { rejectWithValue }) => {
		try {
			const response = await dashBoard();
			return response.data;
		} catch (err) {
			console.log(err)
			return rejectWithValue(err);
		}
	}
);
export const accountSlice = createSlice({
	name: "account",
	// `createSlice` will infer the state type from the `initialState` argument
	initialState,
	reducers: {
		userAction: (state, action: PayloadAction<interface_user>) => {
			state.isAuthenticated = true;
			state.user = {...state.user,...action.payload};
		},
		logoutAction: (state) => {
			localStorage.removeItem("access_token");
			state.isAuthenticated = initialState.isAuthenticated;
			state.user = { ...initialState.user };
		},
	},
	extraReducers: (builder) => {
		// Add reducers for additional action types here, and handle loading state as needed
		builder.addCase(handleLogout.fulfilled, (state) => {
			localStorage.removeItem("access_token");
			state.isAuthenticated = false;
			state.user = { ...initialState.user };
		});
		builder.addCase(handleAccount.fulfilled, (state, { payload }) => {
			state.isAuthenticated = true;
			state.user = payload.data.user;
		});
	},
});

export const { userAction, logoutAction } = accountSlice.actions;

// Other code such as selectors can use the imported `RootState` type

export default accountSlice.reducer;
