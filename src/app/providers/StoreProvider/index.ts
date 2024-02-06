import type {
  StateSchema, ThunkConfig, StateSchemaKey,
  ReduxStoreWithManager
} from './config/StateSchema'
import { AppDispatch, createReduxStore } from './config/store'
import { StoreProvider } from './ui/StoreProvider'

export {
  StoreProvider,
  createReduxStore,
  type StateSchema,
  type AppDispatch,
  type ThunkConfig,
  type ReduxStoreWithManager,
  type StateSchemaKey
}
