import { Dropdown } from 'shared/ui/Popups'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './AvatarDropdown.module.scss'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { getUserAuthData, isUserAdmin, isUserManager, userActions } from 'entities/User'
import { RoutePath } from 'shared/config/routeConfig/routeConfig'
import { useCallback } from 'react'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch'
import { Avatar } from 'shared/ui/Avatar/Avatar'

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

  if(!authData) {
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
                href: RoutePath.admin_panel
              }
            ]
          : []),
        {
          content: t('Профиль'),
          href: RoutePath.profile + authData.id
        },
        {
          content: t('Выйти'),
          onClick: onLogout
        }
      ]}
      trigger={<Avatar size={30} src={authData.avatar} />}
    />
  )
}