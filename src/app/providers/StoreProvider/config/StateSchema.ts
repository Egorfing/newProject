import {
  AnyAction,
  CombinedState,
  EnhancedStore,
  Reducer,
  ReducersMapObject
} from '@reduxjs/toolkit'
import { AxiosInstance } from 'axios'
import { ArticleDetailsSchema } from 'entities/Article'
import { ProfileSchema } from 'entities/Profile'
import { UserSchema } from 'entities/User'
import { AddCommentFormSchema } from 'features/AddCommentForm'
import { LoginSchema } from 'features/AuthByUsername'
import { UISchema } from 'features/UI'
import { ArticleDetailsCommentsSchema, ArticleDetailsPageSchema, ArticleDetailsRecommendationSchema } from 'pages/ArticleDetailsPage'
import { ArticlePageSchema } from 'pages/ArticlesPage'
import { CounterSchema } from '../../../../entities/Counter'

export interface StateSchema {
  counter: CounterSchema
  user: UserSchema
  ui: UISchema
  
  //Асинхронные редьюсеры
  loginForm?: LoginSchema
  profile?: ProfileSchema
  articleDetails?: ArticleDetailsSchema
  // articleDetailsComments?: ArticleDetailsCommentsSchema
  // articleDetailsPageRecommendations?: ArticleDetailsRecommendationSchema
  addCommentForm?: AddCommentFormSchema
  articlesPage?: ArticlePageSchema
  articlesDetailsPage?: ArticleDetailsPageSchema
}

export type StateSchemaKey = keyof StateSchema

export interface ReducerManager {
  getReducerMap: () => ReducersMapObject<StateSchema>
  reduce: (state: StateSchema, action: AnyAction) => CombinedState<StateSchema>
  add: (key: StateSchemaKey, reducer: Reducer) => void
  remove: (key: StateSchemaKey) => void
}

export interface ReduxStoreWithManager extends EnhancedStore<StateSchema> {
  reducerManager: ReducerManager
}

export interface ThunkExtraArg {
  api: AxiosInstance
}

export interface ThunkConfig<T> {
  rejectValue: T
  extra: ThunkExtraArg
  state: StateSchema
}
