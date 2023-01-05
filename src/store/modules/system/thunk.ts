
import { createAsyncThunk } from '@reduxjs/toolkit'
import { getMenuList } from '@/services/system'
import { EStoreNamespace } from '@/store/constants';

const getMenuListActionType = EStoreNamespace.SYSTEM + '/getMenus';

// 加载菜单
export const getMenuListAction = createAsyncThunk(getMenuListActionType, async () => await getMenuList());


