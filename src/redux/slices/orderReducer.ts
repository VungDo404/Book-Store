import { Cart, Quantity, postOrderRequest } from "@/interface/order";
import { postOrder } from "@/services/order";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { RootState } from "Redux/store/store";

// Define a type for the slice state
interface orderState {
	carts: Cart[];
}

// Define the initial state using that type
const initialState: orderState = {
	carts: [],
};
export const addNewOrder = createAsyncThunk(
	"postOrder",
	async (values: postOrderRequest, { rejectWithValue }) => {
		try {
			const response = await postOrder(values);
			return response.data;
		} catch (err) {
			return rejectWithValue(err);
		}
	}
);
export const orderSlice = createSlice({
	name: "order",
	// `createSlice` will infer the state type from the `initialState` argument
	initialState,
	reducers: {
		addOrderAction: (state, action: PayloadAction<Cart>) => {
			const index = state.carts.findIndex(
				(cart) => cart.detail._id === action.payload.detail._id
			);
			if (index >= 0) {
				state.carts[index].quantity += action.payload.quantity;
			} else {
				state.carts.push(action.payload);
			}
		},
		setQuantity: (state, action: PayloadAction<Quantity>) => {
			const index = state.carts.findIndex(
				(cart) => cart.detail._id === action.payload._id
			);
			const newValue =
				action.payload.quantity > state.carts[index].detail.quantity
					? state.carts[index].detail.quantity
					: action.payload.quantity;
			if (index >= 0 && action.payload.quantity > 0) {
				state.carts[index].quantity = newValue;
			}
		},
		deleteOrderAction: (state, action: PayloadAction<string>) => {
			state.carts = state.carts.filter(
				(cart) => cart.detail._id !== action.payload
			);
		},
		deleteAllOrder: (state) => {
			state.carts = initialState.carts;
		},
	},
});

export const {
	addOrderAction,
	deleteOrderAction,
	setQuantity,
	deleteAllOrder,
} = orderSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const order = (state: RootState) => state.account;

export default orderSlice.reducer;
