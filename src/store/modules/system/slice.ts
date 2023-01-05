// import { IUserInfo } from '@/model/common';
import { EStoreNamespace } from '@/store/constants';
import { treeDataTranslate } from '@/utils/table';
import { createSlice } from '@reduxjs/toolkit'
import { getMenuListAction } from './thunk'
// Define a type for the slice state

export interface SystemState {
  menuList: any[];
}

// Define the initial state using that type
const initialState: SystemState = {
  menuList: []
}
export const systemSlice = createSlice({
  name: EStoreNamespace.SYSTEM,
  initialState,
  reducers: {
    setMenus: (state, action) => {
      // this.token = value
      state.menuList = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getMenuListAction.fulfilled, (state, action) => {
      const list = action.payload;
      const data = treeDataTranslate(list, 'menuId')
      state.menuList = data;
      // state.token = action.payload;
    })
  }
})

// Action creators are generated for each case reducer function
export const { setMenus } = systemSlice.actions

export default systemSlice.reducer
