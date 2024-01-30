import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkConfig } from 'app/providers/StoreProvider'
import { Article } from '../types/article'


export const fetchArticleById = createAsyncThunk<
  Article,
  string,
  ThunkConfig<string>
>(
  'article/fetchArticleById',
  async (id, { rejectWithValue, extra }) => {
    try {
      const response = await extra.api.get<Article>(`/articles/${id}`, {
        params: {
          _expand: 'user'
        }
      })

      if(!response.data) {
        throw new Error()
      }
      return response.data
    } catch (error) {
      console.log(error)
      return rejectWithValue('error')
    }
  }
)
