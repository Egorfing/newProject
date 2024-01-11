import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkConfig } from 'app/providers/StoreProvider'
import { Article } from 'entities/Article'
import { getArticlesPageLimit } from '../selectors/getArticlePageSelectors'

interface FetchArticleListArgs {
  page?: number
}

export const fetchArticleList = createAsyncThunk<
  Article[],
  FetchArticleListArgs,
  ThunkConfig<string>
>('articlesPage/fetchArticleList', async (args, { rejectWithValue, extra, getState }) => {
  const { page = 1 } = args
  const limit = getArticlesPageLimit(getState())
  try {
    const response = await extra.api.get<Article[]>('/articles', {
      params: {
        _expand: 'user',
        _limit: limit,
        _page: page
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
})
