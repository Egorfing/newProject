import {
  createEntityAdapter,
  createSlice,
  PayloadAction
} from '@reduxjs/toolkit'
import { StateSchema } from 'app/providers/StoreProvider'
import { Article } from 'entities/Article'
import { Comment } from 'entities/Comment'
import { fetchArticleRecommendation } from '../services/fetchArticlesRecommendations/fetchArticlesRecommendations'
import { fetchCommentsByArticleId } from '../services/fetchCommentsByArticleId/fetchCommentsByArticleId'
import { ArticleDetailsRecommendationSchema } from '../types/articleDetailsPageRecomendationsSchema'

const recommendationsAdapter = createEntityAdapter<Article>({
  selectId: (article) => article.id
})

export const getArticleRecommendations = recommendationsAdapter.getSelectors<StateSchema>(
  (state) => state.articlesDetailsPage?.recommendations || recommendationsAdapter.getInitialState()
)

export const articleDetailsPageRecommendationsSlice = createSlice({
  name: 'articleDetailsPageRecommendationsSlice',
  initialState: recommendationsAdapter.getInitialState<ArticleDetailsRecommendationSchema>({
    isLoading: false,
    error: undefined,
    ids: [],
    entities: {}
  }),
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticleRecommendation.pending, (state) => {
        state.error = undefined
        state.isLoading = true
      })
      .addCase(
        fetchArticleRecommendation.fulfilled,
        (state, action) => {
          state.isLoading = false
          recommendationsAdapter.setAll(state, action.payload)
        }
      )
      .addCase(fetchArticleRecommendation.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
  }
})

export const { actions: articleDetailsPageRecommendationsActions } =
articleDetailsPageRecommendationsSlice
export const { reducer: articleDetailsPageRecommendationsReducer } =
articleDetailsPageRecommendationsSlice
