import { combineReducers, configureStore } from "@reduxjs/toolkit";
import accountReducer from "@/redux/slices/accountReducer";
import userReducer from "@/redux/slices/user.reducer";
import bookReducer from "../slices/book.reducer";
import orderReducer from "../slices/order.reducer";
import storage from "redux-persist/lib/storage";
import {
	persistReducer,
	FLUSH,
	REHYDRATE,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER,
} from "redux-persist";

const persistConfig = {
	key: "root",
	version: 1,
	storage,
	blacklist: ["account", "userData", "bookData"],
};
const rootReducer = combineReducers({
	account: accountReducer,
	userData: userReducer,
	bookData: bookReducer,
	order: orderReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [
					FLUSH,
					REHYDRATE,
					PAUSE,
					PERSIST,
					PURGE,
					REGISTER,
				],
			},
		}),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
