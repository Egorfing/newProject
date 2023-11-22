import { Profile } from 'entites/Profile/model/types/profile'
import { useTranslation } from 'react-i18next'
import { classNames } from 'shared/lib/classNames/classNames'
import { Input } from 'shared/ui/Input/Input'
import { Loader } from 'shared/ui/Loader/Loader'
import { Text, TextAlign, TextTheme } from 'shared/ui/Text/Text'
import cls from './ProfileCard.module.scss'

interface ProfileCardProps {
  className?: string
  data?: Profile
  isLoading?: boolean
  error?: string
  readOnly?: boolean
  onChangeFirstname?: (value?: string) => void
  onChangeLastname?: (value?: string) => void
  onChangeAge?: (value?: string) => void
  onChangeCity?: (value?: string) => void
  onChangeUsername?: (value?: string) => void
  onChangeAvatar?: (value?: string) => void
}

export const ProfileCard = ({
  className,
  data,
  isLoading,
  error,
  readOnly,
  onChangeFirstname,
  onChangeLastname,
  onChangeAge,
  onChangeCity,
  onChangeUsername,
  onChangeAvatar
}: ProfileCardProps) => {
  const { t } = useTranslation('profile')

  if (isLoading) {
    return (
      <div
        className={classNames(cls.ProfileCard, {}, [className, cls.loading])}
      >
        <Loader />
      </div>
    )
  }

  if (error) {
    return (
      <div className={classNames(cls.ProfileCard, {}, [className, cls.error])}>
        <Text
          theme={TextTheme.ERROR}
          title={t('Произошла ошибка при подгрузке профиля')}
          text={t('Попробуйте обновить страницу')}
          align={TextAlign.CENTER}
        />
      </div>
    )
  }

  return (
    <div className={classNames(cls.ProfileCard, {}, [className])}>
      <div className={cls.data}>
        {data?.avatar && <img src={data?.avatar} />}
        <Input
          className={cls.input}
          value={data?.first}
          placeholder={t('Ваше имя')}
          readOnly={readOnly}
          onChange={onChangeFirstname}
        />
        <Input
          className={cls.input}
          value={data?.lastname}
          placeholder={t('Ваша фамилия')}
          readOnly={readOnly}
          onChange={onChangeLastname}
        />
        <Input
          className={cls.input}
          value={data?.age}
          placeholder={t('Ваш возраст')}
          readOnly={readOnly}
          onChange={onChangeAge}
        />
        <Input
          className={cls.input}
          value={data?.city}
          placeholder={t('Город')}
          readOnly={readOnly}
          onChange={onChangeCity}
        />
        <Input
          className={cls.input}
          value={data?.username}
          placeholder={t('Введите имя пользователя')}
          readOnly={readOnly}
          onChange={onChangeUsername}
        />
        <Input
          className={cls.input}
          value={data?.avatar}
          placeholder={t('Введите ссылку на аватар')}
          readOnly={readOnly}
          onChange={onChangeAvatar}
        />
      </div>
    </div>
  )
}
