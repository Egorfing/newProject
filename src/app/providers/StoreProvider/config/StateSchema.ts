import { AnyAction, CombinedState, EnhancedStore, Reducer, ReducersMapObject } from "@reduxjs/toolkit";
import { ProfileSchema } from "entites/Profile";
import { UserSchema } from "entites/User";
import { LoginSchema } from "features/AuthByUsername";
import { CounterSchema } from "../../../../entites/Counter";

export interface StateSchema {
  counter: CounterSchema
  user: UserSchema

  //Асинхронные редьюсеры
  loginForm?: LoginSchema
  profile?: ProfileSchema
}

export type StateSchemaKey = keyof StateSchema;

export interface ReducerManager {
  getReducerMap: () => ReducersMapObject<StateSchema>,
  reduce: (state: StateSchema, action: AnyAction) => CombinedState<StateSchema>,
  add: (key: StateSchemaKey, reducer: Reducer) => void,
  remove: (key: StateSchemaKey) => void,
}

export interface ReduxStoreWithManager extends EnhancedStore<StateSchema> {
  reducerManager: ReducerManager
}