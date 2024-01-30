import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkConfig } from 'app/providers/StoreProvider'
import { Article } from 'entities/Article'

interface FetchArticleListArgs {
  replace?: boolean
}

export const fetchArticleRecommendation = createAsyncThunk<
  Article[],
  void,
  ThunkConfig<string>
>(
  'articlesDetailsPage/fetchArticleRecommendation',
  async (args, { rejectWithValue, extra }) => {
    
    try {
      const response = await extra.api.get<Article[]>('/articles', {
        params: {
          _limit: 4,
          _expand: 'user'
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
