import { configureStore, DeepPartial, getDefaultMiddleware, ReducersMapObject } from '@reduxjs/toolkit'
import { userReducer } from 'entites/User'
import { NavigateOptions, To } from 'react-router-dom'
import { $api } from 'shared/api/api'
import { counterReducer } from '../../../../entites/Counter'
import { createReducerManager } from './reducerManager'
import { StateSchema } from './StateSchema'

export function createReduxStore(
  initialState?: StateSchema,
  asyncReducers?: ReducersMapObject<StateSchema>,
  navigate?: (to: To, options?:NavigateOptions) => void
  ) {
  const rootReducer: ReducersMapObject<StateSchema> = {
    ...asyncReducers,
    counter: counterReducer,
    user: userReducer
  }

  const reducerManager = createReducerManager(rootReducer)

  const store = configureStore({
    reducer: reducerManager.reduce,
    devTools: __IS_DEV__,
    preloadedState: initialState,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
      thunk: {
        extraArgument: {
          api: $api,
          navigate,
        }
      }
    })
  })

  //@ts-ignore
  store.reducerManager = reducerManager
  return store
}

export type AppDispatch =  ReturnType<typeof createReduxStore>['dispatch']