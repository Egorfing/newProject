import {
  createEntityAdapter,
  createSlice,
  PayloadAction
} from '@reduxjs/toolkit'
import { StateSchema } from 'app/providers/StoreProvider'
import { Article, ArticleView } from 'entities/Article'
import { ARTICLE_VIEW_LOCALSTORAGE_KEY } from 'shared/const/localstorage'
import { fetchArticleList } from '../services/fetchArticleList'
import { ArticlePageSchema } from '../types/articlePageSchema'

const articleAdapter = createEntityAdapter<Article>({
  selectId: (article) => article.id
})

export const getArticles = articleAdapter.getSelectors<StateSchema>(
  (state) => state.articlesPage || articleAdapter.getInitialState()
)

export const articlesPageSlice = createSlice({
  name: 'articlesPageSlice',
  initialState: articleAdapter.getInitialState<ArticlePageSchema>({
    isLoading: false,
    error: undefined,
    view: ArticleView.SMALL,
    ids: [],
    entities: {}
  }),
  reducers: {
    setView: (state, action: PayloadAction<ArticleView>) => {
      state.view = action.payload
      localStorage.setItem(ARTICLE_VIEW_LOCALSTORAGE_KEY, action.payload)
    },
    initState: state => {
      state.view = localStorage.getItem(ARTICLE_VIEW_LOCALSTORAGE_KEY) as ArticleView
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticleList.pending, (state) => {
        state.error = undefined
        state.isLoading = true
      })
      .addCase(
        fetchArticleList.fulfilled,
        (state, action: PayloadAction<Article[]>) => {
          state.isLoading = false
          articleAdapter.setAll(state, action.payload)
        }
      )
      .addCase(fetchArticleList.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
  }
})

export const { actions: articlesPageActions } = articlesPageSlice
export const { reducer: articlesPageReducer } = articlesPageSlice
