import { StateSchema } from 'app/providers/StoreProvider'
import { ArticleSortField, ArticleView } from 'entities/Article'
import { ArticleType } from 'entities/Article/model/types/article'

export const getArticlesPageIsLoading = (state: StateSchema) => state.articlesPage?.isLoading || false
export const getArticlesPageErrors = (state: StateSchema) => state.articlesPage?.error
export const getArticlesPageView = (state: StateSchema) => state.articlesPage?.view || ArticleView.SMALL
export const getArticlesPageNum = (state: StateSchema) => state.articlesPage?.page || 1
export const getArticlesPageLimit = (state: StateSchema) => state.articlesPage?.limit || 9
export const getArticlesPageHasMore = (state: StateSchema) => state.articlesPage?.hasMore
export const getArticlesInited = (state: StateSchema) => state.articlesPage?._inited
export const getArticlesOrder = (state: StateSchema) => state.articlesPage?.order ?? 'asc'
export const getArticlesSearch = (state: StateSchema) => state.articlesPage?.search ?? ''
export const getArticlesSort = (state: StateSchema) => state.articlesPage?.sort ?? ArticleSortField.CREATED
export const getArticlesType = (state: StateSchema) => state.articlesPage?.type ?? ArticleType.ALL
