import { StateSchema } from "app/providers/StoreProvider"
import { getArticleDetailsData, getArticleDetailsError, getArticleDetailsIsLoading } from "./articleDetails"

describe('getArticleDetailsIsLoading', () => {
  test('should return isLoading true', () => {
    const state: DeepPartial<StateSchema> = {
      articleDetails: {
        isLoading: true
      }
    }
    expect(getArticleDetailsIsLoading(state as StateSchema)).toBeTruthy()
  })
  test('should return isLoading false', () => {
    const state: DeepPartial<StateSchema> = {
      articleDetails: {
        isLoading: false
      }
    }
    expect(getArticleDetailsIsLoading(state as StateSchema)).toBeFalsy()
  })
})
describe('getArticleDetailsError', () => {
  test('should return error', () => {
    const state: DeepPartial<StateSchema> = {
      articleDetails: {
        error: 'error'
      }
    }
    expect(getArticleDetailsError(state as StateSchema)).toEqual('error')
  })
})
describe('getArticleDetailsData', () => {
  test('should return data', () => {
    const data = {
      id: '1',
      title: 'title'
    }
    const state: DeepPartial<StateSchema> = {
      articleDetails: {
        data
      }
    }
    expect(getArticleDetailsData(state as StateSchema)).toEqual(data)
  })
})