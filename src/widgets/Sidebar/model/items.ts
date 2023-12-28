import { RoutePath } from 'shared/config/routeConfig/routeConfig'
import MainIcon from 'shared/assets/icons/MainIcon.svg'
import AboutIcon from 'shared/assets/icons/AboutIcon.svg'
import ProfileIcon from 'shared/assets/icons/ProfileIcon.svg'
import ArticleIcon from 'shared/assets/icons/ArticleIcon.svg'

export interface SidebarItemType {
  path: string
  text: string
  Icon: React.VFC<React.SVGProps<SVGSVGElement>>
  authOnly?: boolean
}

export const SidebarItemsList: SidebarItemType[] = [
  {
    path: RoutePath.main,
    text: 'Главная',
    Icon: MainIcon
  },
  {
    path: RoutePath.about,
    text: 'О сайте',
    Icon: AboutIcon
  },
  {
    path: RoutePath.profile,
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
]
