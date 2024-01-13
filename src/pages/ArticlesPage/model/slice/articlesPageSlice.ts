import {
  createEntityAdapter,
  createSlice,
  PayloadAction
} from '@reduxjs/toolkit'
import { StateSchema } from 'app/providers/StoreProvider'
import { Article, ArticleView } from 'entities/Article'
import { ArticleSortField, ArticleType } from 'entities/Article/model/types/article'
import { ARTICLE_VIEW_LOCALSTORAGE_KEY } from 'shared/const/localstorage'
import { SortOrder } from 'shared/types'
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
    limit: 9,
    ids: [],
    entities: {},
    page: 1,
    hasMore: true,
    sort: ArticleSortField.CREATED,
    search: '',
    order: 'asc',
    type: ArticleType.ALL,
    _inited: false
  }),
  reducers: {
    setView: (state, action: PayloadAction<ArticleView>) => {
      state.view = action.payload
      localStorage.setItem(ARTICLE_VIEW_LOCALSTORAGE_KEY, action.payload)
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload
    },
    setOrder: (state, action: PayloadAction<SortOrder>) => {
      state.order = action.payload
    },
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload
    },
    setSort: (state, action: PayloadAction<ArticleSortField>) => {
      state.sort = action.payload
    },
    setType: (state, action: PayloadAction<ArticleType>) => {
      state.type = action.payload
    },
    initState: (state) => {
      const view = localStorage.getItem(
        ARTICLE_VIEW_LOCALSTORAGE_KEY
      ) as ArticleView
      state.view = view
      state.limit = view === ArticleView.BIG ? 4 : 9
      state._inited = true
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticleList.pending, (state, action) => {
        state.error = undefined
        state.isLoading = true
        if (action.meta.arg.replace) {
          articleAdapter.removeAll(state)
        }
      })
      .addCase(fetchArticleList.fulfilled, (state, action) => {
        state.isLoading = false
        state.hasMore = action.payload.length >= state.limit

        if (action.meta.arg.replace) {
          articleAdapter.setAll(state, action.payload)
        } else {
          articleAdapter.addMany(state, action.payload)
        }
      })
      .addCase(fetchArticleList.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
  }
})

export const { actions: articlesPageActions } = articlesPageSlice
export const { reducer: articlesPageReducer } = articlesPageSlice
