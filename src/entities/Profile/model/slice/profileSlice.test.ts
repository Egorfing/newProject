import { Country } from 'entities/Country'
import { Currency } from 'entities/Currency'
import { updateProfileData } from 'entities/Profile/services/updateProfileData/updateProfileData'
import { ProfileSchema, ValidateProfileError } from '../types/profile'
import { profileActions, profileReducer } from './profileSlice'

const data = {
  username: 'admin',
  age: 22,
  country: Country.Russia,
  lastname: 'adminov',
  first: 'ads',
  city: 'SPB',
  currency: Currency.RUB
}
describe('profileSlice.test', () => {
  test('test update readonly', () => {
    const state: DeepPartial<ProfileSchema> = { readonly: false }

    expect(
      profileReducer(state as ProfileSchema, profileActions.setReadOnly(true))
    ).toEqual({ readonly: true })
  })
  test('test cancel edit', () => {
    const state: DeepPartial<ProfileSchema> = { data, form: { username: '' } }

    expect(
      profileReducer(state as ProfileSchema, profileActions.cancelEdit())
    ).toEqual({
      readonly: true,
      validateErrors: undefined,
      data,
      form: data
    })
  })
  test('test update profile', () => {
    const state: DeepPartial<ProfileSchema> = { form: { username: '123' } }

    expect(
      profileReducer(
        state as ProfileSchema,
        profileActions.updateProfile({ username: '123456' })
      )
    ).toEqual({
      form: { username: '123456' }
    })
  })
  test('test update profile pending service', () => {
    const state: DeepPartial<ProfileSchema> = {
      isLoading: false,
      validateErrors: [ValidateProfileError.SERVER_ERROR]
    }

    expect(
      profileReducer(state as ProfileSchema, updateProfileData.pending)
    ).toEqual({
      isLoading: true,
      validateErrors: undefined
    })
  })
  test('test update profile fulfilled service', () => {
    const state: DeepPartial<ProfileSchema> = {
      isLoading: true
    }

    expect(
      profileReducer(state as ProfileSchema, updateProfileData.fulfilled(data, ''))
    ).toEqual({
      readonly: true,
      isLoading: false,
      validateErrors: undefined,
      data,
      form: data
    })
  })
})
