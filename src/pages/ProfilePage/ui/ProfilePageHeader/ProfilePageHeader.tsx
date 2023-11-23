import { profileActions, updateProfileData } from 'entities/Profile'
import { getProfileReadOnly } from 'entities/Profile/model/selectors/getProfileState'
import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { classNames } from 'shared/lib/classNames/classNames'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch'
import { Button, ThemeButton } from 'shared/ui/Button/Button'
import { Text } from 'shared/ui/Text/Text'
import cls from './ProfilePageHeader.module.scss'

interface ProfilePageHeaderProps {
  className?: string
}

export const ProfilePageHeader = ({ className }: ProfilePageHeaderProps) => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const readOnly = useSelector(getProfileReadOnly)

  const onEdit = useCallback(() => {
    dispatch(profileActions.setReadOnly(false))
  },[dispatch])
  const onCancelEdit = useCallback(() => {
    dispatch(profileActions.cancelEdit())
  },[dispatch])
  const onSave = useCallback(() => {
     dispatch(updateProfileData())
  },[])

  return (
    <div className={classNames(cls.ProfilePageHeader, {}, [className])}>
      <Text title={t('Профиль')} />
      {readOnly ? (
        <Button className={cls.editBtn} theme={ThemeButton.OUTLINE} onClick={onEdit}>
        {t('Редактировать')}
      </Button>
      ) : (
        <>
        <Button className={cls.editBtn} theme={ThemeButton.OUTLINE_RED} onClick={onCancelEdit}>
        {t('Отменить')}
      </Button>
      <Button className={cls.saveBtn} theme={ThemeButton.OUTLINE} onClick={onSave}>
        {t('Сохранить')}
      </Button>
        </>
      )}
      
    </div>
  )
}
