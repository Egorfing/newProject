import { Story } from '@storybook/react'
import { StateSchema, StoreProvider } from '@/app/providers/StoreProvider'
import { ReducersList } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import { profileReducer } from '@/features/editableProfileCard/testing'
import { loginReducer } from '@/features/AuthByUsername/testing'
import { addCommentFormReducer } from '@/features/AddCommentForm/testing'
import { articleDetailsReducer } from '@/entities/Article/testing'
import { articleDetailsPageReducer } from '@/pages/ArticleDetailsPage/testing'

const defaultAsyncReducers: ReducersList = {
  loginForm: loginReducer,
  profile: profileReducer,
  articleDetails: articleDetailsReducer,
  addCommentForm: addCommentFormReducer,
  articlesDetailsPage: articleDetailsPageReducer
}

export const StoreDecorator =
  (store: DeepPartial<StateSchema>, asyncReducers?: ReducersList) =>
    (StoryComponent: Story) =>
      (
      <StoreProvider
        initialState={store}
        asyncReducers={{ ...defaultAsyncReducers, ...asyncReducers }}
      >
        <StoryComponent />
      </StoreProvider>
      )
