import { Country } from 'entities/Country'
import { Currency } from 'entities/Currency'
import { TestAsyncThunk } from 'shared/lib/tests/TestAsyncThunk/TestAsyncThunk'
import { ValidateProfileError } from '../../constants/profileConstants'
import { updateProfileData } from './updateProfileData'

const data = {
  username: 'admin',
  age: 22,
  country: Country.Russia,
  lastname: 'adminov',
  first: 'ads',
  city: 'SPB',
  currency: Currency.RUB,
  id: '1'
}
describe('test updateProfileData.test', () => {
  test('success update', async () => {
    const thunk = new TestAsyncThunk(updateProfileData, {
      profile: { form: data }
    })
    thunk.api.put.mockReturnValue(Promise.resolve({ data }))

    const result = await thunk.callThunk()

    expect(thunk.api.put).toHaveBeenCalled()
    expect(result.meta.requestStatus).toBe('fulfilled')
    expect(result.payload).toEqual(data)
  })

  test('server error', async () => {
    const thunk = new TestAsyncThunk(updateProfileData, {
      profile: { form: data }
    })
    thunk.api.put.mockReturnValue(Promise.resolve({ status: 403 }))

    const result = await thunk.callThunk()
    expect(result.meta.requestStatus).toBe('rejected')
    expect(result.payload).toEqual([ValidateProfileError.SERVER_ERROR])
  })

  test('data error', async () => {
    const thunk = new TestAsyncThunk(updateProfileData)

    const result = await thunk.callThunk()
    expect(result.payload).toEqual([ValidateProfileError.NO_DATA])
  })
})
