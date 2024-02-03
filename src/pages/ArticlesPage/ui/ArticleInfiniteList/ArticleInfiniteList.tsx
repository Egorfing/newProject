import { useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom'
import { ArticleList, ArticleSortField, ArticleType } from 'entities/Article'
import {
  getArticlesInited,
  getArticlesPageErrors,
  getArticlesPageIsLoading,
  getArticlesPageView
} from '../../model/selectors/getArticlePageSelectors'
import { fetchArticleList } from '../../model/services/fetchArticleList'
import {
  articlesPageActions,
  getArticles
} from '../../model/slice/articlesPageSlice'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch'
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect'
import { SortOrder } from 'shared/types'
import { useTranslation } from 'react-i18next'
import { Text } from 'shared/ui/Text/Text'

interface ArticleInfiniteListProps {
  className?: string
}

export const ArticleInfiniteList = ({
  className
}: ArticleInfiniteListProps) => {
  const dispatch = useAppDispatch()
  const { t } = useTranslation('')
  const articles = useSelector(getArticles.selectAll)
  const isLoading = useSelector(getArticlesPageIsLoading)
  const error = useSelector(getArticlesPageErrors)
  const view = useSelector(getArticlesPageView)
  const inited = useSelector(getArticlesInited)
  const [searchParams] = useSearchParams()

  useInitialEffect(() => {
    if (inited) return
    const orderFormUrl = searchParams.get('order') as SortOrder
    const sortFormUrl = searchParams.get('sort') as ArticleSortField
    const searchFormUrl = searchParams.get('search')
    const typeFormUrl = searchParams.get('type') as ArticleType
    if (orderFormUrl) {
      dispatch(articlesPageActions.setOrder(orderFormUrl))
    }
    if (sortFormUrl) {
      dispatch(articlesPageActions.setSort(sortFormUrl))
    }
    if (searchFormUrl) {
      dispatch(articlesPageActions.setSearch(searchFormUrl))
    }
    if (typeFormUrl) {
      dispatch(articlesPageActions.setType(typeFormUrl))
    }

    dispatch(articlesPageActions.initState())
    dispatch(fetchArticleList({}))
  })

  if (error) {
    return <Text text={t('Ошибка при загрузке статей')} />
  }

  return (
    <ArticleList
      className={className}
      articles={articles}
      isLoading={isLoading}
      view={view}
    />
  )
}
