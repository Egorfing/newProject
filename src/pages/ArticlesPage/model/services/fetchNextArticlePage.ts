import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkConfig } from '@/app/providers/StoreProvider'
import {
  getArticlesPageHasMore,
  getArticlesPageIsLoading,
  getArticlesPageNum
} from '../selectors/getArticlePageSelectors'
import { articlesPageActions } from '../slice/articlesPageSlice'
import { fetchArticleList } from './fetchArticleList'

export const fetchNextArticlePage = createAsyncThunk<
void,
void,
ThunkConfig<string>
>('articlesPage/fetchNextArticlePage', async (_, { dispatch, getState }) => {
  const page = getArticlesPageNum(getState())
  const isLoading = getArticlesPageIsLoading(getState())
  const hasMore = getArticlesPageHasMore(getState())
  if (hasMore && !isLoading) {
    dispatch(articlesPageActions.setPage(page + 1))
    dispatch(fetchArticleList({}))
  }
})
