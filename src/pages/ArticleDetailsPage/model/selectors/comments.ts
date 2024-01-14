import { StateSchema } from "app/providers/StoreProvider";

export const getArticleCommentsIsLoading = (state: StateSchema) => state.articlesDetailsPage?.comments?.isLoading
export const getArticleCommentsErrors = (state: StateSchema) => state.articlesDetailsPage?.comments?.error