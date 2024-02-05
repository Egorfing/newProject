import { createSelector } from '@reduxjs/toolkit'
import { getUserAuthData } from '@/entities/User'
import { RoutePath } from '@/shared/config/routeConfig/routeConfig'
import { SidebarItemType } from '../types/sidebar'
import MainIcon from '@/shared/assets/icons/MainIcon.svg'
import AboutIcon from '@/shared/assets/icons/AboutIcon.svg'
import ProfileIcon from '@/shared/assets/icons/ProfileIcon.svg'
import ArticleIcon from '@/shared/assets/icons/ArticleIcon.svg'

export const getSidebarItems = createSelector(getUserAuthData, (userData) => {
  const sidebarItemsList: SidebarItemType[] = [
    {
      path: RoutePath.main,
      text: 'Главная',
      Icon: MainIcon
    },
    {
      path: RoutePath.about,
      text: 'О сайте',
      Icon: AboutIcon
    }
  ]
  if (userData) {
    sidebarItemsList.push(
      {
        path: RoutePath.profile + userData.id,
        text: 'Профиль',
        Icon: ProfileIcon,
        authOnly: true
      },
      {
        path: RoutePath.articles,
        text: 'Статьи',
        Icon: ArticleIcon,
        authOnly: true
      }
    )
  }
  return sidebarItemsList
})
