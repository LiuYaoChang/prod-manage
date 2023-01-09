import { IUserInfo } from '@/model/common';
import { EStoreNamespace } from '@/store/constants';
import { createSlice } from '@reduxjs/toolkit'
import { loginAction, getUserInfoAction, getAccountMenusAction, getMenuListAction } from './thunk'
// Define a type for the slice state

export interface AccountState {
  token: string;
  menuList: any[];
  	// 账户信息
	accountInfo: IUserInfo;
  value: number
}

// Define the initial state using that type
const initialState: AccountState = {
  token: '',
  menuList: [],
  accountInfo: { roles: [], permission: [] },
  value: 0,
}
export const accountSlice = createSlice({
  name: EStoreNamespace.ACCOUNT,
  initialState,
  reducers: {
    setToken: (state, action) => {
      // this.token = value
      state.token = action.payload;
    },
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
    builder.addCase(loginAction.rejected, (state, action) => {
      console.log("🚀 ~ file: slice.ts:51 ~ builder.addCase ~ loginAction.rejected", action)
      // state.token = action.payload.token;
      // state.token = action.payload;
    })
    builder.addCase(getUserInfoAction.fulfilled, (state, action) => {
      // state.accountInfo = action.payload;
      // state.token = action.payload;
    })
    builder.addCase(getAccountMenusAction.fulfilled, (state, action) => {
      state.menuList = action.payload;
      // state.token = action.payload;
    })
    builder.addCase(getMenuListAction.fulfilled, (state, action) => {
      state.menuList = action.payload;
      // state.token = action.payload;
    })
    builder.addCase(getAccountMenusAction.rejected, (state, action) => {
      console.log("🚀 ~ file: slice.ts:59 ~ builder.addCase ~ action", action)
      // state.menuList = action.payload;
      // state.token = action.payload;
    })
  }
})

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount, setToken } = accountSlice.actions

export default accountSlice.reducer
