
import { createAsyncThunk } from '@reduxjs/toolkit'
import { login } from '@/services/account'
import { EStoreNamespace } from '@/store/constants';

const loginActionType = EStoreNamespace.ACCOUNT + '/login';

export const loginAction = createAsyncThunk(loginActionType, async (params: ILoginForm) => await login(params));

