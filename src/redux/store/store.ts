import { configureStore } from '@reduxjs/toolkit';
import  accountReducer  from '@/redux/slices/accountReducer';
import userReducer from "@/redux/slices/Admin/user.reducer"; 
import bookReducer from '../slices/Admin/book.reducer';
export const store = configureStore({
  reducer: {
    account: accountReducer, 
    userData: userReducer, 
    bookData: bookReducer
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch