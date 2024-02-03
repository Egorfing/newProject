import { screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { Country } from 'entities/Country'
import { Currency } from 'entities/Currency'
import { Profile } from 'entities/Profile'
import { profileReducer } from 'features/editableProfileCard/model/slice/profileSlice'
import { $api } from 'shared/api/api'
import { componentRender } from '../../../../shared/lib/tests/componentRender/componentRender'
import { EditableProfileCard } from './EditableProfileCard'

const profile: Profile = {
  id: '1',
  first: 'admin',
  lastname: 'asfewr',
  age: 465,
  currency: Currency.RUB,
  country: Country.Russia,
  city: 'Moscow',
  username: 'admin213',
  avatar:
    'https://avatars.mds.yandex.net/get-zen_doc/3413519/pub_5ff887b2fe4e686f6ae6ba3f_5ff887d7f906b16872a69755/scale_1200'
}

const options = {
  initialState: {
    profile: {
      readonly: true,
      data: profile,
      form: profile
    },
    user: {
      authData: {
        id: '1',
        username: 'admin'
      }
    }
  },
  asyncReducers: {
    profile: profileReducer
  }
}

describe('features/EditableProfileCard', () => {
  test('Режим ридонли должен пропадать', async () => {
    componentRender(<EditableProfileCard id={'1'} />, options)
    await userEvent.click(
      screen.getByTestId('EditableProfileCardHeader.EditButton')
    )
    expect(
      screen.getByTestId('EditableProfileCardHeader.CancelButton')
    ).toBeInTheDocument()
  })

  test('Отмена изменений', async () => {
    componentRender(<EditableProfileCard id={'1'} />, options)
    await userEvent.click(
      screen.getByTestId('EditableProfileCardHeader.EditButton')
    )
    expect(
      screen.getByTestId('EditableProfileCardHeader.CancelButton')
    ).toBeInTheDocument()

    await userEvent.clear(screen.getByTestId('ProfileCard.firstname'))
    await userEvent.clear(screen.getByTestId('ProfileCard.lastname'))
  
    await userEvent.type(screen.getByTestId('ProfileCard.firstname'), 'user')
    await userEvent.type(screen.getByTestId('ProfileCard.lastname'), 'user')

    expect(screen.getByTestId('ProfileCard.firstname')).toHaveValue('user')
    expect(screen.getByTestId('ProfileCard.lastname')).toHaveValue('user')

    await userEvent.click(
      screen.getByTestId('EditableProfileCardHeader.CancelButton')
    )

    expect(screen.getByTestId('ProfileCard.firstname')).toHaveValue(profile.first)
    expect(screen.getByTestId('ProfileCard.lastname')).toHaveValue(profile.lastname)
  })

  test('Должна появиться ошибка', async () => {
    componentRender(<EditableProfileCard id={'1'} />, options)
    await userEvent.click(
      screen.getByTestId('EditableProfileCardHeader.EditButton')
    )
    expect(
      screen.getByTestId('EditableProfileCardHeader.CancelButton')
    ).toBeInTheDocument()

    await userEvent.clear(screen.getByTestId('ProfileCard.firstname'))

    await userEvent.click(
      screen.getByTestId('EditableProfileCardHeader.SaveButton')
    )

    expect(screen.getByTestId('EditableProfileCard.Error.Paragraph')).toBeInTheDocument()
  })

  test('Если ошибок валидации нет то на сервер должен уйти PUT', async () => {
    const mockPutReq = jest.spyOn($api, 'put')
    componentRender(<EditableProfileCard id={'1'} />, options)
    await userEvent.click(
      screen.getByTestId('EditableProfileCardHeader.EditButton')
    )
    expect(
      screen.getByTestId('EditableProfileCardHeader.CancelButton')
    ).toBeInTheDocument()

    await userEvent.type(screen.getByTestId('ProfileCard.lastname'), 'user')


    await userEvent.click(
      screen.getByTestId('EditableProfileCardHeader.SaveButton')
    )

    expect(mockPutReq).toHaveBeenCalled()
  })
})
