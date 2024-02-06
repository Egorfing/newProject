import { memo, useCallback } from 'react'
import { useSelector } from 'react-redux'

import cls from './ArticlesPageFilters.module.scss'

import {
  ArticleSortField,
  ArticleType,
  ArticleView,
  ArticleViewSelector,
  ArticleSortSelector,
  ArticleTypeTabs
} from '@/entities/Article'
import { useTranslation } from 'react-i18next'
import { classNames } from '@/shared/lib/classNames/classNames'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'
import { useDebounce } from '@/shared/lib/hooks/useDebounce/useDebounce'
import { SortOrder } from '@/shared/types'
import { Card } from '@/shared/ui/Card/Card'
import { Input } from '@/shared/ui/Input/Input'
import {
  getArticlesOrder,
  getArticlesPageView,
  getArticlesSearch,
  getArticlesSort,
  getArticlesType
} from '../../model/selectors/getArticlePageSelectors'
import { articlesPageActions } from '../../model/slice/articlesPageSlice'
import { fetchArticleList } from '../../model/services/fetchArticleList'

interface ArticlesPageFiltersProps {
  className?: string
}

export const ArticlesPageFilters = memo(
  ({ className }: ArticlesPageFiltersProps) => {
    const dispatch = useAppDispatch()
    const view = useSelector(getArticlesPageView)
    const order = useSelector(getArticlesOrder)
    const sort = useSelector(getArticlesSort)
    const search = useSelector(getArticlesSearch)
    const type = useSelector(getArticlesType)
    const { t } = useTranslation()
    const onChangeView = useCallback(
      (view: ArticleView) => {
        dispatch(articlesPageActions.setView(view))
      },
      [dispatch]
    )
    const fetchData = useCallback(() => {
      dispatch(fetchArticleList({ replace: true }))
    }, [dispatch])

    const debounceFetchData = useDebounce(fetchData, 500)
    const onChangeSort = useCallback(
      (newSort: ArticleSortField) => {
        dispatch(articlesPageActions.setSort(newSort))
        dispatch(articlesPageActions.setPage(1))
        fetchData()
      },
      [dispatch, fetchData]
    )
    const onChangeOrder = useCallback(
      (newOrder: SortOrder) => {
        dispatch(articlesPageActions.setOrder(newOrder))
        dispatch(articlesPageActions.setPage(1))
        fetchData()
      },
      [dispatch, fetchData]
    )
    const onChangeSearch = useCallback(
      (search: string) => {
        dispatch(articlesPageActions.setSearch(search))
        dispatch(articlesPageActions.setPage(1))
        debounceFetchData()
      },
      [dispatch, debounceFetchData]
    )
    const onChangeType = useCallback(
      (value: ArticleType) => {
        dispatch(articlesPageActions.setType(value))
        dispatch(articlesPageActions.setPage(1))
        fetchData()
      },
      [dispatch, fetchData]
    )

    return (
      <div className={classNames(cls.ArticlesPageFilters, {}, [className])}>
        <div className={cls.sortWrapper}>
          <ArticleSortSelector
            order={order}
            sort={sort}
            onChangeSort={onChangeSort}
            onChangeOrder={onChangeOrder}
          />
          <ArticleViewSelector view={view} onViewClick={onChangeView} />
        </div>
        <Card className={cls.search}>
          <Input
            placeholder={t('Поиск')}
            value={search}
            onChange={onChangeSearch}
          />
        </Card>

        <ArticleTypeTabs
          value={type}
          className={cls.tabs}
          onChangeType={onChangeType}
        />
      </div>
    )
  }
)
