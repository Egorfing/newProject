import { Dropdown } from '@/shared/ui/Popups'
import { classNames } from '@/shared/lib/classNames/classNames'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { getUserAuthData, isUserAdmin, isUserManager, userActions } from '@/entities/User'
import { useCallback } from 'react'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'
import { Avatar } from '@/shared/ui/Avatar/Avatar'
import { getRoutAdmin, getRoutProfile } from '@/shared/const/router'

interface AvatarDropdownProps {
  className?: string
}

export const AvatarDropdown = ({ className }: AvatarDropdownProps) => {
  const dispatch = useAppDispatch()
  const { t } = useTranslation()

  const authData = useSelector(getUserAuthData)
  const isAdmin = useSelector(isUserAdmin)
  const isManager = useSelector(isUserManager)
  const isAdminPanelAvailable = isAdmin || isManager

  const onLogout = useCallback(() => {
    dispatch(userActions.logout())
  }, [dispatch])

  if (!authData) {
    return null
  }
  return (
    <Dropdown
      className={classNames('', {}, [className])}
      direction="bottom left"
      items={[
        ...(isAdminPanelAvailable
          ? [
              {
                content: t('Админка'),
                href: getRoutAdmin()
              }
            ]
          : []),
        {
          content: t('Профиль'),
          href: getRoutProfile(authData.id)
        },
        {
          content: t('Выйти'),
          onClick: onLogout
        }
      ]}
      trigger={<Avatar fallbackInverted size={30} src={authData.avatar} />}
    />
  )
}
