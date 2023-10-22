import {
  getProfileData,
  getProfileError,
  getProfileIsLoading
} from 'entites/Profile/model/selectors/getProfileState'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { classNames } from 'shared/lib/classNames/classNames'
import { Button, ThemeButton  } from 'shared/ui/Button/Button'
import { Input } from 'shared/ui/Input/Input'
import { Text } from 'shared/ui/Text/Text'
import cls from './ProfileCard.module.scss'

interface ProfileCardProps {
  className?: string
}

export const ProfileCard = ({ className }: ProfileCardProps) => {
  const { t } = useTranslation('profile')
  const data = useSelector(getProfileData)
  const error = useSelector(getProfileError)
  const isLoading = useSelector(getProfileIsLoading)
  console.log('>>>data', data);
  
  return (
    <div className={classNames(cls.ProfileCard, {}, [className])}>
      <div className={cls.header}>
        <Text title={t('Профиль')} />
        <Button className={cls.editBtn} theme={ThemeButton.OUTLINE}>{t('Редактировать')}</Button>
      </div>
      <div className={cls.data}>
        <Input value={data?.first} placeholder={t('Ваше имя')}/>
        <Input value={data?.lastname} placeholder={t('Ваша фамилия')}/>
      </div>
    </div>
  )
}
