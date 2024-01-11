import { ArticleView } from 'entities/Article';
import { TestAsyncThunk } from 'shared/lib/tests/TestAsyncThunk/TestAsyncThunk';
import { fetchArticleList } from './fetchArticleList';
import { fetchNextArticlePage } from './fetchNextArticlePage';

jest.mock('./fetchArticleList')

describe('test fetchNextArticlePage.test', () => {
  
  test('success', async () => {
    const thunk = new TestAsyncThunk(fetchNextArticlePage,{
      articlesPage: {
        page: 2,
        ids: [],
        entities: {},
        limit: 5,
        isLoading: false,
        hasMore: true,
        view: ArticleView.BIG,
        _inited: false
      }
    })

    await thunk.callThunk()
    
    expect(thunk.dispatch).toBeCalledTimes(4)
    expect(fetchArticleList).toBeCalledWith({page: 3})

  })

  test('not called hasMore', async () => {
    const thunk = new TestAsyncThunk(fetchNextArticlePage,{
      articlesPage: {
        page: 2,
        ids: [],
        entities: {},
        limit: 5,
        isLoading: false,
        hasMore: false,
        view: ArticleView.BIG,
        _inited: false
      }
    })

   await thunk.callThunk()
    
    expect(thunk.dispatch).toBeCalledTimes(2)
    expect(fetchArticleList).not.toHaveBeenCalled()

  })
  test('not called isLoading', async () => {
    const thunk = new TestAsyncThunk(fetchNextArticlePage,{
      articlesPage: {
        page: 2,
        ids: [],
        entities: {},
        limit: 5,
        isLoading: true,
        hasMore: true,
        view: ArticleView.BIG,
        _inited: false
      }
    })

    await thunk.callThunk()
    
    expect(thunk.dispatch).toBeCalledTimes(2)
    expect(fetchArticleList).not.toHaveBeenCalled()

  })
})