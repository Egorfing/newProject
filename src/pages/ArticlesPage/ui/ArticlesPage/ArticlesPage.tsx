import { memo, useCallback } from 'react'
import { useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom'

import cls from './ArticlesPage.module.scss'

import { ArticleList, ArticleSortField } from 'entities/Article'
import { classNames } from 'shared/lib/classNames/classNames'
import {
  DynamicModuleLoader,
  ReducersList
} from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch'
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect'
import { Page } from 'widgets/Page/Page'
import { SortOrder } from 'shared/types'
import { ArticleType } from 'entities/Article/model/types/article'
import {
  getArticlesInited,
  getArticlesPageErrors, getArticlesPageIsLoading, getArticlesPageView
} from '../../model/selectors/getArticlePageSelectors'
import { fetchNextArticlePage } from '../../model/services/fetchNextArticlePage'
import { fetchArticleList } from '../../model/services/fetchArticleList'
import {
  articlesPageActions,
  articlesPageReducer,
  getArticles
} from '../../model/slice/articlesPageSlice'
import { ArticlesPageFilters } from '../ArticlesPageFilters/ArticlesPageFilters'

interface ArticlesPageProps {
  className?: string
}

const reducers: ReducersList = {
  articlesPage: articlesPageReducer
}

const ArticlesPage = ({ className }: ArticlesPageProps) => {
  const dispatch = useAppDispatch()
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

  const onLoadNextPart = useCallback(() => {
    dispatch(fetchNextArticlePage())
  }, [dispatch])

  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount={false}>
      <Page
        onScrollEnd={onLoadNextPart}
        className={classNames(cls.ArticlesPage, {}, [className])}
      >
        <ArticlesPageFilters />
        <ArticleList className={cls.list} articles={articles} isLoading={isLoading} view={view} />
      </Page>
    </DynamicModuleLoader>
  )
}

export default memo(ArticlesPage)
