// import { IUserInfo } from '@/model/common';
import { EStoreNamespace } from '@/store/constants';
import { treeDataTranslate } from '@/utils/table';
import { createSlice } from '@reduxjs/toolkit'
import { getMenuInfoAction, getMenuListAction, getRoleInfoAction, getRoleListAction, getSelectMenuListAction, updateMenuAction, updateRoleAction } from './thunk'
// Define a type for the slice state

export interface SystemState {
  roleList: any[];
  originalSelectMenuList: IMenu[];
  menuList: IMenus[];
  menuInfo: IMenu;
  roleInfo: IRole;
  selectMenuList: IMenus[];
}

// Define the initial state using that type
const initialState: SystemState = {
  roleList: [],
  originalSelectMenuList: [],
  menuList: [],
  selectMenuList: [],
  roleInfo: {
    roleId: -1,
    remark: '',
    menuIdList: [],
    roleName: ''
  },
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
    // 更新角色
    builder.addCase(updateRoleAction.fulfilled, (state, action) => {
      const data = action.payload;
      return data;
    })
    // 角色信息
    builder.addCase(getRoleInfoAction.fulfilled, (state, action) => {
      const data = action.payload;
      state.roleInfo = data as IRole;
      // state.token = action.payload;
    })
    // 查询角色列表
    builder.addCase(getRoleListAction.fulfilled, (state, action) => {
      state.roleList = action.payload.list;
      console.log("🚀 ~ file: slice.ts:73 ~ builder.addCase ~ getRoleListAction", action.payload)
      // state.token = action.payload;
    })
  }
})

// Action creators are generated for each case reducer function
export const { setMenus } = systemSlice.actions

export default systemSlice.reducer
