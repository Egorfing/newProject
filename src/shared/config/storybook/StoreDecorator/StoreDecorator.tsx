import { Story } from '@storybook/react'
import { StateSchema, StoreProvider } from 'app/providers/StoreProvider'
import { profileReducer } from 'entites/Profile'
import { loginReducer } from 'features/AuthByUsername/model/slice/loginSlice'
import { ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'

const defaultAsyncReducers: ReducersList = {
  loginForm: loginReducer,
  profile: profileReducer,
}

export const StoreDecorator = (store: DeepPartial<StateSchema>, asyncReducers?: ReducersList ) => (StoryComponent: Story) =>
  (
    <StoreProvider initialState={store} asyncReducers={{...defaultAsyncReducers, ...asyncReducers}}>
        <StoryComponent />
    </StoreProvider>
  )
