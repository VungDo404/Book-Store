import {
	Cart,
	PostCartRequest,
	PutCartRequest,
	SelectedPayload,
} from "@/interface/cart";
import {
	deleteCart,
	deleteCarts,
	getCartsOfUser,
	postCart,
	putCart,
} from "@/services/cart";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface CartState {
	data: Cart[];
}

const initialState: CartState = {
	data: [],
};

export const handleCreateCart = createAsyncThunk(
	"handleCreateCart",
	async (Cart: PostCartRequest, { dispatch }) => {
		const response = await postCart(Cart);
		await dispatch(handleGetCartsOfUser());
		return response.data;
	}
);
export const handleGetCartsOfUser = createAsyncThunk(
	"handleGetCartsOfUser",
	async (_: void) => {
		const response = await getCartsOfUser();
		return response.data;
	}
);
export const handlePutCart = createAsyncThunk(
	"handlePutCart",
	async (Cart: PutCartRequest & { _id: string, index: number}) => {
		const { _id, ...rest } = Cart;
		await putCart(_id, rest);
		return Cart;
	}
);

export const handleDeleteCart = createAsyncThunk(
	"handleDeleteCart",
	async (id: string, { dispatch }) => {
		const response = await deleteCart(id);
		await dispatch(handleGetCartsOfUser());
		return response.data;
	}
);
export const handleDeleteCarts = createAsyncThunk(
	"handleDeleteCarts",
	async (id: string[], { dispatch }) => {
		const response = await deleteCarts(id);
		await dispatch(handleGetCartsOfUser());
		return response.data;
	}
);
export const cartSlice = createSlice({
	name: "account",
	// `createSlice` will infer the state type from the `initialState` argument
	initialState,
	reducers: {
		clearCart: (state) => {
			state.data = [];
		},
		selectedAction: (state, action: PayloadAction<SelectedPayload>) => {
			const { index, checked } = action.payload;
			state.data[index].isSelected = checked;
		},
	},
	extraReducers: (builder) => {
		// Add reducers for additional action types here, and handle loading state as needed
		builder.addCase(
			handleGetCartsOfUser.fulfilled,
			(state, { payload }) => {
				state.data = payload.data.map((each) => ({
					...each,
					isSelected: false,
				}));
			}
		);
		builder.addCase(
			handlePutCart.fulfilled,
			(state, { payload }) => {
				const {index, quantity} = payload; 
				state.data[index].quantity = quantity; 
			}
		);
	},
});

export const { clearCart, selectedAction } = cartSlice.actions;

export default cartSlice.reducer;
