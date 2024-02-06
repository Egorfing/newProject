export enum AppRoutes {
  MAIN = 'main',
  ABOUT = 'about',
  PROFILE = 'profile',
  ARTICLES = 'articles',
  ARTICLE_DETAILS = 'article_details',
  ARTICLE_CREATE = 'article_create',
  ARTICLE_EDIT = 'article_edit',
  ADMIN_PANEL = 'admin_panel',
  FORBIDDEN = 'forbidden',
  // last
  NOT_FOUND = 'not_found'
}

export const getRoutMain = () => '/'
export const getRoutAbout = () => '/about'
export const getRoutProfile = (id: string) => `/profile/${id}`
export const getRoutArticles = () => '/articles'
export const getRoutArticleDetails = (id: string) => `/articles/${id}`
export const getRoutArticleCreate = () => '/articles/new'
export const getRoutArticleEdit = (id: string) => `/articles/${id}/edit`
export const getRoutAdmin = () => '/admin'
export const getRoutForbidden = () => '/forbidden'
