import { logout } from '@/services/auth'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from 'Redux/store/store'

// Define a type for the slice state
interface accountState {
  isAuthenticated: boolean,
  user:{
    email: string,
    phone: string,
    fullName: string,
    role: string,
    avatar: string,
    id: string
  }
  
}

// Define the initial state using that type
const initialState: accountState = {
  isAuthenticated: false,
  user: {
    email: '',
    phone: '',
    fullName: '',
    role: '',
    avatar: '',
    id: ''
  }
  
}
interface interface_user{

    email: string,
    phone: string,
    fullName: string,
    role: string,
    avatar: string,
    id: string

}
export const handleLogout = createAsyncThunk(
  'handleLogout',
  async () => {
    const response = await logout();
    return response.data
  }
)
export const accountSlice = createSlice({
  name: 'account',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    userAction: (state, action: PayloadAction<interface_user> ) => {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    logoutAction: (state) => {
      localStorage.removeItem("access_token");
      state.isAuthenticated = initialState.isAuthenticated; 
      state.user = {...initialState.user}
    }
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(handleLogout.fulfilled, (state) => {
      localStorage.removeItem("access_token");
      state.isAuthenticated = initialState.isAuthenticated; 
      state.user = {...initialState.user}
    })
  },
})

export const { userAction, logoutAction } = accountSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const account = (state: RootState) => state.account

export default accountSlice.reducer