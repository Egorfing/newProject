import { Story } from '@storybook/react'
import { StateSchema, StoreProvider } from '@/app/providers/StoreProvider'
// eslint-disable-next-line ulbi-tv-plugin/public-api-imports
import { ReducersList } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
// eslint-disable-next-line ulbi-tv-plugin/public-api-imports
import { profileReducer } from '@/features/editableProfileCard/model/slice/profileSlice'
// eslint-disable-next-line ulbi-tv-plugin/public-api-imports
import { loginReducer } from '@/features/AuthByUsername/model/slice/loginSlice'
// eslint-disable-next-line ulbi-tv-plugin/public-api-imports
import { addCommentFormReducer } from '@/features/AddCommentForm/model/slice/addCommentFormSlice'
// eslint-disable-next-line ulbi-tv-plugin/public-api-imports
import { articleDetailsReducer } from '@/entities/Article/model/slice/articleDetailsSlice'
// eslint-disable-next-line ulbi-tv-plugin/public-api-imports
import { articleDetailsPageReducer } from '@/pages/ArticleDetailsPage/model/slice'

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
