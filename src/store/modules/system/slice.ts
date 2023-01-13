// import { IUserInfo } from '@/model/common';
import { EStoreNamespace } from '@/store/constants';
import { treeDataTranslate } from '@/utils/table';
import { createSlice } from '@reduxjs/toolkit'
import { getMenuInfoAction, getMenuListAction, getSelectMenuListAction, updateMenuAction } from './thunk'
// Define a type for the slice state

export interface SystemState {
  originalSelectMenuList: IMenu[];
  menuList: IMenus[];
  menuInfo: IMenu;
  selectMenuList: IMenus[];
}

// Define the initial state using that type
const initialState: SystemState = {
  originalSelectMenuList: [],
  menuList: [],
  selectMenuList: [],
  menuInfo: {
    menuId: -1,
    parentId: -1,
    parentName: '',
    name: '',
    url: '',
    perms: '',
    type: 0,
    icon: '',
    orderNum: 0,
    open: false
  }
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
      state.menuList = data as IMenus[];
      // state.token = action.payload;
    })
    builder.addCase(getSelectMenuListAction.fulfilled, (state, action) => {
      const list = action.payload;
      console.log("🚀 ~ file: slice.ts:49 ~ builder.addCase ~ list", list)
      state.originalSelectMenuList = list;
      const data = treeDataTranslate(list, 'menuId')
      state.selectMenuList = data as IMenus[];
      // state.token = action.payload;
    })
    builder.addCase(getMenuInfoAction.fulfilled, (state, action) => {
      const data = action.payload;
      state.menuInfo = data as IMenu;
      // state.token = action.payload;
    })
    // 更新菜单
    builder.addCase(updateMenuAction.fulfilled, (state, action) => {
      const data = action.payload;
      return data;
      // state.token = action.payload;
    })
  }
})

// Action creators are generated for each case reducer function
export const { setMenus } = systemSlice.actions

export default systemSlice.reducer
