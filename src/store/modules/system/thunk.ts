
import { createAsyncThunk } from '@reduxjs/toolkit'
import { getMenuList, getSelectMenuList, getMenuInfo, updateMenu } from '@/services/system'
import { EStoreNamespace } from '@/store/constants';

const getMenuListActionType = EStoreNamespace.SYSTEM + '/getMenus';
const getSelectMenuListActionType = EStoreNamespace.SYSTEM + '/getSelectMenus';
const getMenuInfoActionType = EStoreNamespace.SYSTEM + '/getMenuInfo';
const updateMenuActionType = EStoreNamespace.SYSTEM + '/updateMenu';

// 加载菜单
export const getMenuListAction = createAsyncThunk(getMenuListActionType, async () => await getMenuList());
export const getSelectMenuListAction = createAsyncThunk(getSelectMenuListActionType, async () => await getSelectMenuList());
export const getMenuInfoAction = createAsyncThunk(getMenuInfoActionType, async (id: number) => await getMenuInfo(id));
export const updateMenuAction = createAsyncThunk(updateMenuActionType, async (data: IMenuParams) => await updateMenu(data));


