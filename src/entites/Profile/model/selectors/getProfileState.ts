import { StateSchema } from "app/providers/StoreProvider"

export const getProfileData = (state: StateSchema) => state?.profile?.data
export const getProfileError = (state: StateSchema) => state?.profile?.error
export const getProfileIsLoading = (state: StateSchema) => state?.profile?.isLoading
