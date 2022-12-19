import { configureStore } from '@reduxjs/toolkit'
// ...
import counterReducer from './modules/reducer'
import accountReducer, { AccountState } from './modules/account'
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
// import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
const persistConfig = {
  key: 'root',
  storage: storage,
  stateReconciler: autoMergeLevel2 // 查看 'Merge Process' 部分的具体情况
};

const accountPersistReducer = persistReducer<AccountState>(persistConfig, accountReducer);
const store = configureStore({
  reducer: {
    counter: counterReducer,
    account: accountPersistReducer
  },
})
export let persistore = persistStore(store)
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
export default store;
