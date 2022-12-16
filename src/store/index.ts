import { configureStore } from '@reduxjs/toolkit'
// ...
import counterReducer from './modules/reducer'
import accountReducer from './modules/account'
const store = configureStore({
  reducer: {
    counter: counterReducer,
    account: accountReducer
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export default store;
