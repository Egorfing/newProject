import { Country } from '@/entities/Country'
import { Currency } from '@/entities/Currency'
import { ValidateProfileError } from '../../constants/profileConstants'
import { validateProfileData } from './validateProfileData'

const data = {
  username: 'admin',
  age: 22,
  country: Country.Russia,
  lastname: 'adminov',
  first: 'ads',
  city: 'SPB',
  currency: Currency.RUB
}
describe('test validateProfileData', () => {
  test('test validate correct data', async () => {
    const result = validateProfileData(data)

    expect(result).toEqual([])
  })

  test('without first and last name', async () => {
    const result = validateProfileData({ ...data, first: '', lastname: '' })

    expect(result).toEqual([ValidateProfileError.INCORRECT_USER_DATA])
  })
  test('incorrect age', async () => {
    const result = validateProfileData({ ...data, age: undefined })

    expect(result).toEqual([ValidateProfileError.INCORRECT_AGE])
  })
  test('incorrect all', async () => {
    const result = validateProfileData({})

    expect(result).toEqual([
      ValidateProfileError.INCORRECT_USER_DATA,
      ValidateProfileError.INCORRECT_AGE,
      ValidateProfileError.INCORRECT_COUNTRY
    ])
  })
})
