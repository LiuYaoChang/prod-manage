
import { createAsyncThunk } from '@reduxjs/toolkit'
import { getMenuList, getSelectMenuList, getMenuInfo, updateMenu, getRoleList, updateRole, getRoleInfo } from '@/services/system'
import { EStoreNamespace } from '@/store/constants';

const getMenuListActionType = EStoreNamespace.SYSTEM + '/getMenus';
const getSelectMenuListActionType = EStoreNamespace.SYSTEM + '/getSelectMenus';
const getMenuInfoActionType = EStoreNamespace.SYSTEM + '/getMenuInfo';
const updateMenuActionType = EStoreNamespace.SYSTEM + '/updateMenu';
const updateRoleActionType = EStoreNamespace.SYSTEM + '/updateRole';
const getRoleListActionType = EStoreNamespace.SYSTEM + '/getRoleList';
const getRoleInfoActionType = EStoreNamespace.SYSTEM + '/getRoleInfo';

// 加载菜单
export const getMenuListAction = createAsyncThunk(getMenuListActionType, async () => await getMenuList());
export const getSelectMenuListAction = createAsyncThunk(getSelectMenuListActionType, async () => await getSelectMenuList());
export const getMenuInfoAction = createAsyncThunk(getMenuInfoActionType, async (id: number) => await getMenuInfo(id));
export const updateMenuAction = createAsyncThunk(updateMenuActionType, async (data: IMenuParams) => await updateMenu(data));

// 角色
export const getRoleListAction = createAsyncThunk(getRoleListActionType, async (data: { roleName: string }) => await getRoleList(data));
export const updateRoleAction = createAsyncThunk(updateRoleActionType, async (data: IRoleParams) => await updateRole(data));
export const getRoleInfoAction = createAsyncThunk(getRoleInfoActionType, async (id: number) => await getRoleInfo(id));


