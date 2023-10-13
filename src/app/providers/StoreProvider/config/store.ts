import { configureStore, ReducersMapObject } from "@reduxjs/toolkit"
import { userReducer } from "entites/User"
import { loginReducer } from "features/AuthByUsername"
import { counterReducer } from "../../../../entites/Counter"
import { StateSchema } from "./StateSchema"

export function createReduxStore (initialState?: StateSchema) {

  const rootReducer: ReducersMapObject<StateSchema> = {
    counter: counterReducer,
    user: userReducer,
    loginForm: loginReducer
  }

  return configureStore<StateSchema>({
    reducer: rootReducer,
    devTools: __IS_DEV__,
    preloadedState: initialState
  })
}
export const store = configureStore({
  reducer: {},
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch