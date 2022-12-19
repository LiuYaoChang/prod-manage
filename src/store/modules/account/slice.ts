import { EStoreNamespace } from '@/store/constants';
import { createSlice } from '@reduxjs/toolkit'
import { loginAction } from './thunk'
// Define a type for the slice state
export interface AccountState {
  token: string;
  value: number
}

// Define the initial state using that type
const initialState: AccountState = {
  token: '',
  value: 0,
}
export const accountSlice = createSlice({
  name: EStoreNamespace.ACCOUNT,
  initialState,
  reducers: {
    increment: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value += 1
    },
    decrement: (state) => {
      state.value -= 1
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload
    },

  },
  extraReducers: (builder) => {
    builder.addCase(loginAction.fulfilled, (state, action) => {
      state.token = action.payload.token;
      // state.token = action.payload;
    })
  }
})

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount } = accountSlice.actions

export default accountSlice.reducer
