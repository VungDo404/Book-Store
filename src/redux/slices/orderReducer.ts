import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { RootState } from "Redux/store/store";

// Define a type for the slice state
interface orderState {
	carts: {
		quantity: number;
		detail: {
			_id: string;
			name: string;
		};
	}[];
}

// Define the initial state using that type
const initialState: orderState = {
    carts: []
};

export const orderSlice = createSlice({
	name: "order",
	// `createSlice` will infer the state type from the `initialState` argument
	initialState,
	reducers: {
		
	},
});

export const {} = orderSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const order = (state: RootState) => state.account;

export default orderSlice.reducer;
