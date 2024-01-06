import { memo, useCallback, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import {
  DynamicModuleLoader,
  ReducersList
} from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import { classNames } from 'shared/lib/classNames/classNames'
import {
  fetchProfileData,
  getProfileError,
  getProfileIsLoading,
  profileActions,
  ProfileCard,
  profileReducer
} from 'entities/Profile'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch'
import { useSelector } from 'react-redux'
import { ProfilePageHeader } from './ProfilePageHeader/ProfilePageHeader'
import {
  getProfileForm,
  getProfileReadOnly,
  getProfileValidateErrors
} from 'entities/Profile/model/selectors/getProfileState'
import { Currency } from 'entities/Currency'
import { Country } from 'entities/Country'
import { Text, TextTheme } from 'shared/ui/Text/Text'
import { ValidateProfileError } from 'entities/Profile/model/types/profile'
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect'
import { useParams } from 'react-router-dom'

interface ProfilePageProps {
  className?: string
}

const reducers: ReducersList = {
  profile: profileReducer
}

const ProfilePage = memo(({ className }: ProfilePageProps) => {
  const { t } = useTranslation('profile')
  const dispatch = useAppDispatch()
  const formData = useSelector(getProfileForm)
  const error = useSelector(getProfileError)
  const isLoading = useSelector(getProfileIsLoading)
  const readOnly = useSelector(getProfileReadOnly)
  const validateErrors = useSelector(getProfileValidateErrors)
  const { id } = useParams<{ id: string }>()

  const validateErrorTranslates = {
    [ValidateProfileError.INCORRECT_USER_DATA]: t('Некорректные имя/фамилия'),
    [ValidateProfileError.INCORRECT_AGE]: t('Некорректный возраст'),
    [ValidateProfileError.INCORRECT_COUNTRY]: t('Некорректная страна'),
    [ValidateProfileError.NO_DATA]: t('Отсутствуют данные'),
    [ValidateProfileError.SERVER_ERROR]: t('Ошибка сервера')
  }

  useInitialEffect(() => {
    if (id) {
      dispatch(fetchProfileData(id))
    }
  })

  const onChangeFirstname = useCallback(
    (value?: string) => {
      dispatch(profileActions.updateProfile({ first: value || '' }))
    },
    [dispatch]
  )
  const onChangeLastname = useCallback(
    (value?: string) => {
      dispatch(profileActions.updateProfile({ lastname: value || '' }))
    },
    [dispatch]
  )
  const onChangeAge = useCallback(
    (value?: string) => {
      const regex = /^[0-9]*$/
      if (value && regex.test(value)) {
        dispatch(profileActions.updateProfile({ age: Number(value || 0) }))
      }
    },
    [dispatch]
  )
  const onChangeCity = useCallback(
    (value?: string) => {
      dispatch(profileActions.updateProfile({ city: value || '' }))
    },
    [dispatch]
  )

  const onChangeUsername = useCallback(
    (value?: string) => {
      dispatch(profileActions.updateProfile({ username: value || '' }))
    },
    [dispatch]
  )
  const onChangeAvatar = useCallback(
    (value?: string) => {
      dispatch(profileActions.updateProfile({ avatar: value || '' }))
    },
    [dispatch]
  )
  const onChangeCurrency = useCallback(
    (currency: Currency) => {
      dispatch(profileActions.updateProfile({ currency }))
    },
    [dispatch]
  )
  const onChangeCountry = useCallback(
    (country: Country) => {
      dispatch(profileActions.updateProfile({ country }))
    },
    [dispatch]
  )
  return (
    <DynamicModuleLoader reducers={reducers}>
      <div className={classNames('', {}, [className])}>
        <ProfilePageHeader />
        {validateErrors?.length &&
          validateErrors.map((err) => (
            <Text
              key={err}
              theme={TextTheme.ERROR}
              text={validateErrorTranslates[err]}
            />
          ))}
        <ProfileCard
          data={formData}
          isLoading={isLoading}
          error={error}
          readOnly={readOnly}
          onChangeFirstname={onChangeFirstname}
          onChangeLastname={onChangeLastname}
          onChangeAge={onChangeAge}
          onChangeCity={onChangeCity}
          onChangeUsername={onChangeUsername}
          onChangeAvatar={onChangeAvatar}
          onChangeCurrency={onChangeCurrency}
          onChangeCountry={onChangeCountry}
        />
      </div>
    </DynamicModuleLoader>
  )
})

export default ProfilePage
