import { createSelector } from '@reduxjs/toolkit'
import { getUserAuthData } from '@/entities/User'
import { SidebarItemType } from '../types/sidebar'
import MainIcon from '@/shared/assets/icons/MainIcon.svg'
import AboutIcon from '@/shared/assets/icons/AboutIcon.svg'
import ProfileIcon from '@/shared/assets/icons/ProfileIcon.svg'
import ArticleIcon from '@/shared/assets/icons/ArticleIcon.svg'
import {
  getRoutAbout,
  getRoutArticles,
  getRoutMain,
  getRoutProfile
} from '@/shared/const/router'

export const getSidebarItems = createSelector(getUserAuthData, (userData) => {
  const sidebarItemsList: SidebarItemType[] = [
    {
      path: getRoutMain(),
      text: 'Главная',
      Icon: MainIcon
    },
    {
      path: getRoutAbout(),
      text: 'О сайте',
      Icon: AboutIcon
    }
  ]
  if (userData) {
    sidebarItemsList.push(
      {
        path: getRoutProfile(userData.id),
        text: 'Профиль',
        Icon: ProfileIcon,
        authOnly: true
      },
      {
        path: getRoutArticles(),
        text: 'Статьи',
        Icon: ArticleIcon,
        authOnly: true
      }
    )
  }
  return sidebarItemsList
})
