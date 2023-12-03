import { StateSchema } from 'app/providers/StoreProvider'
import { Country } from 'entities/Country'
import { Currency } from 'entities/Currency'
import { ValidateProfileError } from '../types/profile'
import { getProfileData, getProfileError, getProfileForm, getProfileIsLoading, getProfileReadOnly, getProfileValidateErrors } from './getProfileState'

describe('getProfileData.test', () => {
  test('should return data', () => {
    const data = {
      username: 'admin',
      age: 22,
      country: Country.Russia,
      lastname: 'adminov',
      first: 'ads',
      city: 'SPB',
      currency: Currency.RUB
    }
    const state: DeepPartial<StateSchema> = {
      profile: {
        data
      }
    }
    expect(getProfileData(state as StateSchema)).toEqual(data)
  })
  test('should work with empty state', () => {
    const state: DeepPartial<StateSchema> = {}
    expect(getProfileData(state as StateSchema)).toEqual(undefined)
  })
})

describe('getProfileError.test', () => {
  test('should return error', () => {
    const state: DeepPartial<StateSchema> = {
      profile: {error: 'error'}
    }
    expect(getProfileError(state as StateSchema)).toEqual('error')
  })
  test('should work with empty state', () => {
    const state: DeepPartial<StateSchema> = {}
    expect(getProfileError(state as StateSchema)).toEqual(undefined)
  })
})

describe('getProfileForm.test', () => {
  test('should return form', () => {
    const data = {
      username: 'admin',
      age: 22,
      country: Country.Russia,
      lastname: 'adminov',
      first: 'ads',
      city: 'SPB',
      currency: Currency.RUB
    }
    const state: DeepPartial<StateSchema> = {
      profile: {
        form: data
      }
    }
    expect(getProfileForm(state as StateSchema)).toEqual(data)
  })
  test('should work with empty state', () => {
    const state: DeepPartial<StateSchema> = {}
    expect(getProfileForm(state as StateSchema)).toEqual(undefined)
  })
})

describe('getProfileIsLoading.test', () => {
  test('should return isLoading', () => {
    const state: DeepPartial<StateSchema> = {
      profile: {
        isLoading: true
      }
    }
    expect(getProfileIsLoading(state as StateSchema)).toBeTruthy()
  })
  test('should work with empty state', () => {
    const state: DeepPartial<StateSchema> = {}
    expect(getProfileIsLoading(state as StateSchema)).toBeFalsy()
  })
})

describe('getProfileReadOnly.test', () => {
  test('should return ReadOnly', () => {
    const state: DeepPartial<StateSchema> = {
      profile: {
        readonly: true
      }
    }
    expect(getProfileReadOnly(state as StateSchema)).toBeTruthy()
  })
  test('should work with empty state', () => {
    const state: DeepPartial<StateSchema> = {}
    expect(getProfileReadOnly(state as StateSchema)).toBeFalsy()
  })
})

describe('getProfileValidateErrors.test', () => {
  const errors = [ValidateProfileError.INCORRECT_USER_DATA]
  test('should return ReadOnly', () => {
    const state: DeepPartial<StateSchema> = {
      profile: {
        validateErrors: errors
      }
    }
    expect(getProfileValidateErrors(state as StateSchema)).toEqual(errors)
  })
  test('should work with empty state', () => {
    const state: DeepPartial<StateSchema> = {}
    expect(getProfileValidateErrors(state as StateSchema)).toBeFalsy()
  })
})
