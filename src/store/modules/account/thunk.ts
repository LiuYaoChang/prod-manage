
import { createAsyncThunk } from '@reduxjs/toolkit'
import { login, getAccountInfo } from '@/services/account'
import { EStoreNamespace } from '@/store/constants';

const loginActionType = EStoreNamespace.ACCOUNT + '/login';
const getUserInfoActionType = EStoreNamespace.ACCOUNT + '/getUserInfo';

export const loginAction = createAsyncThunk(loginActionType, async (params: ILoginForm) => await login(params));
export const getUserInfoAction = createAsyncThunk(getUserInfoActionType, async (params: { token: string }) => await getAccountInfo(params));

