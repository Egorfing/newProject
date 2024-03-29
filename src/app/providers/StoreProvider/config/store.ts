import {
  CombinedState,
  configureStore,
  Reducer,
  ReducersMapObject
} from '@reduxjs/toolkit'
import { userReducer } from '@/entities/User'
import { uiReducer } from '@/features/UI'
import { $api } from '@/shared/api/api'
import { rtkApi } from '@/shared/api/rtkApi'
import { counterReducer } from '../../../../entities/Counter'
import { createReducerManager } from './reducerManager'
import { StateSchema } from './StateSchema'

export function createReduxStore(
  initialState?: StateSchema,
  asyncReducers?: ReducersMapObject<StateSchema>
) {
  const rootReducer: ReducersMapObject<StateSchema> = {
    ...asyncReducers,
    counter: counterReducer,
    user: userReducer,
    ui: uiReducer,
    [rtkApi.reducerPath]: rtkApi.reducer
  }

  const reducerManager = createReducerManager(rootReducer)

  const store = configureStore({
    reducer: reducerManager.reduce as Reducer<CombinedState<StateSchema>>,
    devTools: __IS_DEV__,
    preloadedState: initialState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        thunk: {
          extraArgument: {
            api: $api
          }
        }
      }).concat(rtkApi.middleware)
  })

  // @ts-expect-error
  store.reducerManager = reducerManager
  return store
}

export type AppDispatch = ReturnType<typeof createReduxStore>['dispatch']
