
import { createAsyncThunk } from '@reduxjs/toolkit'
import { login, getAccountInfo, getAccountMenus } from '@/services/account'
import { getMenuList } from '@/services/system'
import { EStoreNamespace } from '@/store/constants';

const loginActionType = EStoreNamespace.ACCOUNT + '/login';
const getUserInfoActionType = EStoreNamespace.ACCOUNT + '/getUserInfo';
const getUserMenusActionType = EStoreNamespace.ACCOUNT + '/getUserMenus';
const getMenuListActionType = EStoreNamespace.ACCOUNT + '/getMenus';

export const loginAction = createAsyncThunk(loginActionType, async (params: ILoginForm) => await login(params));
export const getUserInfoAction = createAsyncThunk(getUserInfoActionType, async (params: { token: string }) => await getAccountInfo(params));
// 加载授权菜单
export const getAccountMenusAction = createAsyncThunk(getUserMenusActionType, async (params: { token: string }) => await getAccountMenus(params));
// 加载菜单
export const getMenuListAction = createAsyncThunk(getMenuListActionType, async (params: { token: string }) => await getMenuList());


