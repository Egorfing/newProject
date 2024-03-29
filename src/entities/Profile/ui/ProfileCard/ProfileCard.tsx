import { Country, CountrySelect } from '@/entities/Country'
import { Currency, CurrencySelect } from '@/entities/Currency'
import { Profile } from '../../model/types/profile'
import { useTranslation } from 'react-i18next'
import { classNames, Mods } from '@/shared/lib/classNames/classNames'
import { Avatar } from '@/shared/ui/Avatar/Avatar'
import { Input } from '@/shared/ui/Input/Input'
import { Loader } from '@/shared/ui/Loader/Loader'
import { HStack, VStack } from '@/shared/ui/Stack'
import { Text, TextAlign, TextTheme } from '@/shared/ui/Text/Text'
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
  onChangeCurrency?: (value: Currency) => void
  onChangeCountry?: (value: Country) => void
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
  onChangeAvatar,
  onChangeCurrency,
  onChangeCountry
}: ProfileCardProps) => {
  const { t } = useTranslation('profile')

  if (isLoading) {
    return (
      <HStack justify='center' max
        className={classNames(cls.ProfileCard, {}, [className, cls.loading])}
      >
        <Loader />
      </HStack>
    )
  }

  if (error) {
    return (
      <HStack justify='center' max className={classNames(cls.ProfileCard, {}, [className, cls.error])}>
        <Text
          theme={TextTheme.ERROR}
          title={t('Произошла ошибка при подгрузке профиля')}
          text={t('Попробуйте обновить страницу')}
          align={TextAlign.CENTER}
        />
      </HStack>
    )
  }

  const mods: Mods = {
    [cls.editing]: !readOnly
  }

  return (
    <VStack gap='8' max className={classNames(cls.ProfileCard, mods, [className])}>
      {data?.avatar && (
        <HStack justify='center' max className={cls.avatarWrapper}>
          <Avatar size={100} src={data?.avatar} />
        </HStack>
      )}
      <Input
        className={cls.input}
        value={data?.first}
        placeholder={t('Ваше имя')}
        readOnly={readOnly}
        onChange={onChangeFirstname}
        data-testid="ProfileCard.firstname"
      />
      <Input
        className={cls.input}
        value={data?.lastname}
        placeholder={t('Ваша фамилия')}
        readOnly={readOnly}
        onChange={onChangeLastname}
        data-testid="ProfileCard.lastname"
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
      <CurrencySelect
          className={cls.input}
          value={data?.currency}
          onChange={onChangeCurrency}
          readonly={readOnly}
        />
      <CountrySelect
          className={cls.input}
          value={data?.country}
          onChange={onChangeCountry}
          readonly={readOnly}
        />
    </VStack>
  )
}
