import React from 'react'
import { useTranslation } from 'react-i18next'
import { ThemeSwitcher } from 'widgets/ThemeSwitcher'
import { classNames } from 'shared/lib/classNames/classNames'
import { AppLink, AppLinkTheme } from 'shared/ui/AppLink/AppLink'
import cls from './Navbar.module.scss'

interface NavbarProps {
  className?: string
}

export const Navbar = ({ className }: NavbarProps) => {
  const { t } = useTranslation()
  return (
    <div className={classNames(cls.Navbar, {}, [className])}>
      {/* <ThemeSwitcher/> */}
      <div className={cls.links}>
        <AppLink
          theme={AppLinkTheme.SECONDARY}
          to={'/'}
          className={cls.mainLink}
        >
          {t('главная')}
        </AppLink>
        <AppLink theme={AppLinkTheme.SECONDARY} to={'/about '}>
          {t('о сайте')}
        </AppLink>
      </div>
    </div>
  )
}
