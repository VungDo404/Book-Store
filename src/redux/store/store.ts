import { combineReducers, configureStore } from "@reduxjs/toolkit";
import accountReducer from "@/redux/slices/accountReducer";
import userReducer from "@/redux/slices/user.reducer";
import bookReducer from "../slices/book.reducer";
import orderReducer from "../slices/order.reducer";
import cartReducer from "../slices/cart.reducer";

const rootReducer = combineReducers({
	account: accountReducer,
	userData: userReducer,
	bookData: bookReducer,
	order: orderReducer,
	cart: cartReducer
});


export const store = configureStore({
	reducer: rootReducer,
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
