import { StateSchema } from 'app/providers/StoreProvider'

export const getLoginState = (state: StateSchema) => state?.loginForm
export const getLoginUsername = (state: StateSchema) =>
  state?.loginForm?.username || ''
export const getLoginPassword = (state: StateSchema) =>
  state?.loginForm?.password || ''
export const getLoginIsLoading = (state: StateSchema) =>
  state?.loginForm?.isLoading || false
export const getLoginError = (state: StateSchema) =>
  state?.loginForm?.error
