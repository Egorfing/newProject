import { ArticleSortField, ArticleView } from 'entities/Article'
import { ArticleType } from 'entities/Article/model/types/article'
import { TestAsyncThunk } from 'shared/lib/tests/TestAsyncThunk/TestAsyncThunk'
import { addQueryParams } from 'shared/lib/url/addQueryParams/addQueryParams'
import { fetchArticleList } from './fetchArticleList'
import { fetchNextArticlePage } from './fetchNextArticlePage'

jest.mock('./fetchArticleList')

describe('test fetchNextArticlePage.test', () => {
  test('success', async () => {
    const thunk = new TestAsyncThunk(fetchNextArticlePage, {
      articlesPage: {
        page: 2,
        ids: [],
        entities: {},
        limit: 5,
        isLoading: false,
        hasMore: true,
        view: ArticleView.BIG,
        sort: ArticleSortField.CREATED,
        search: '',
        order: 'asc',
        type: ArticleType.ALL,
        _inited: false
      }
    })

    await thunk.callThunk()

    expect(thunk.dispatch).toBeCalledTimes(4)
    expect(fetchArticleList).toBeCalled()
  })

  test('not called hasMore', async () => {
    const thunk = new TestAsyncThunk(fetchNextArticlePage, {
      articlesPage: {
        page: 2,
        ids: [],
        entities: {},
        limit: 5,
        isLoading: false,
        hasMore: false,
        view: ArticleView.BIG,
        sort: ArticleSortField.CREATED,
        search: '',
        order: 'asc',
        type: ArticleType.ALL,
        _inited: false
      }
    })

    await thunk.callThunk()

    expect(thunk.dispatch).toBeCalledTimes(2)
    expect(fetchArticleList).not.toHaveBeenCalled()
  })
  test('not called isLoading', async () => {
    const thunk = new TestAsyncThunk(fetchNextArticlePage, {
      articlesPage: {
        page: 2,
        ids: [],
        entities: {},
        limit: 5,
        isLoading: true,
        hasMore: true,
        view: ArticleView.BIG,
        sort: ArticleSortField.CREATED,
        search: '',
        order: 'asc',
        type: ArticleType.ALL,
        _inited: false
      }
    })

    await thunk.callThunk()

    expect(thunk.dispatch).toBeCalledTimes(2)
    expect(fetchArticleList).not.toHaveBeenCalled()
  })
})
