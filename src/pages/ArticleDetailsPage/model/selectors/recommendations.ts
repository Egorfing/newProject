import { StateSchema } from '@/app/providers/StoreProvider'

export const getArticleRecommendationIsLoading = (state: StateSchema) => state.articlesDetailsPage?.recommendations?.isLoading
export const getArticleRecommendationErrors = (state: StateSchema) => state.articlesDetailsPage?.recommendations?.error
