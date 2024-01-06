import { Country } from 'entities/Country';
import { Currency } from 'entities/Currency';
import { TestAsyncThunk } from 'shared/lib/tests/TestAsyncThunk/TestAsyncThunk';
import { fetchProfileData } from './fetchProfileData';

const data = {
  username: 'admin',
  age: 22,
  country: Country.Russia,
  lastname: 'adminov',
  first: 'ads',
  city: 'SPB',
  currency: Currency.RUB
}
describe('test fetchProfileData.test', () => {
  
  test('get profile dat', async () => {
    const thunk = new TestAsyncThunk(fetchProfileData)
    thunk.api.get.mockReturnValue(
      Promise.resolve({data})
    )

    const result = await thunk.callThunk('1')
    

    expect(thunk.api.get).toHaveBeenCalled()
    expect(result.meta.requestStatus).toBe('fulfilled')
    expect(result.payload).toEqual(data)
  })

  test('error profile data', async () => {
    const thunk = new TestAsyncThunk(fetchProfileData)
    thunk.api.get.mockReturnValue(
      Promise.resolve({status: 403})
    )

    const result = await thunk.callThunk('1')
    expect(result.meta.requestStatus).toBe('rejected')

    
  })
})