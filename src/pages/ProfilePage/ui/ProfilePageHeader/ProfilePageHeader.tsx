import { profileActions, updateProfileData } from 'entities/Profile'
import {
  getProfileData,
  getProfileReadOnly
} from 'entities/Profile/model/selectors/getProfileState'
import { getUserAuthData } from 'entities/User'
import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { classNames } from 'shared/lib/classNames/classNames'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch'
import { Button, ThemeButton } from 'shared/ui/Button/Button'
import { HStack } from 'shared/ui/Stack'
import { Text } from 'shared/ui/Text/Text'

interface ProfilePageHeaderProps {
  className?: string
}

export const ProfilePageHeader = ({ className }: ProfilePageHeaderProps) => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const readOnly = useSelector(getProfileReadOnly)
  const authData = useSelector(getUserAuthData)
  const profileData = useSelector(getProfileData)

  const canEdit = authData?.id === profileData?.id

  const onEdit = useCallback(() => {
    dispatch(profileActions.setReadOnly(false))
  }, [dispatch])
  const onCancelEdit = useCallback(() => {
    dispatch(profileActions.cancelEdit())
  }, [dispatch])
  const onSave = useCallback(() => {
    dispatch(updateProfileData())
  }, [])

  return (
    <HStack max justify='between' className={classNames('', {}, [className])}>
      <Text title={t('Профиль')} />
      {canEdit && (
        <>
          {readOnly
            ? (
            <Button
              theme={ThemeButton.OUTLINE}
              onClick={onEdit}
            >
              {t('Редактировать')}
            </Button>
              )
            : (
            <HStack gap='8'>
              <Button
                theme={ThemeButton.OUTLINE_RED}
                onClick={onCancelEdit}
              >
                {t('Отменить')}
              </Button>
              <Button
                theme={ThemeButton.OUTLINE}
                onClick={onSave}
              >
                {t('Сохранить')}
              </Button>
            </HStack>
              )}
        </>
      )}
    </HStack>
  )
}
