import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkConfig } from 'app/providers/StoreProvider'
import { Article } from 'entities/Article'
import { ArticleType } from 'entities/Article/model/types/article'
import { addQueryParams } from 'shared/lib/url/addQueryParams/addQueryParams'
import {
  getArticlesOrder,
  getArticlesPageLimit,
  getArticlesPageNum,
  getArticlesSearch,
  getArticlesSort,
  getArticlesType
} from '../selectors/getArticlePageSelectors'

interface FetchArticleListArgs {
  replace?: boolean
}

export const fetchArticleList = createAsyncThunk<
  Article[],
  FetchArticleListArgs,
  ThunkConfig<string>
>(
  'articlesPage/fetchArticleList',
  async (args, { rejectWithValue, extra, getState }) => {
    const limit = getArticlesPageLimit(getState())
    const order = getArticlesOrder(getState())
    const sort = getArticlesSort(getState())
    const search = getArticlesSearch(getState())
    const page = getArticlesPageNum(getState())
    const type = getArticlesType(getState())
    try {
      addQueryParams({ sort, order, search, type })
      const response = await extra.api.get<Article[]>('/articles', {
        params: {
          _expand: 'user',
          _limit: limit,
          _page: page,
          _sort: sort,
          _order: order,
          q: search,
          type: type === ArticleType.ALL ? undefined : type
        }
      })

      if (!response.data) {
        throw new Error()
      }
      return response.data
    } catch (error) {
      console.log(error)
      return rejectWithValue('error')
    }
  }
)
