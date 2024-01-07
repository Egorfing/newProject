import { memo, useCallback } from 'react'
import { useSelector } from 'react-redux'

import cls from './ArticlesPage.module.scss'

import { ArticleList, ArticleView, ArticleViewSelector } from 'entities/Article'
import { classNames } from 'shared/lib/classNames/classNames'
import {
  DynamicModuleLoader,
  ReducersList
} from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch'
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect'
import { fetchArticleList } from '../../model/services/fetchArticleList'
import {
  articlesPageActions,
  articlesPageReducer,
  getArticles
} from '../../model/slice/articlesPageSlice'
import {
  getArticlesPageErrors,
  getArticlesPageIsLoading,
  getArticlesPageView
} from '../../model/selectors/getArticlePageSelectors'

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

  useInitialEffect(() => {
    dispatch(fetchArticleList())
    dispatch(articlesPageActions.initState())
  })

  const onChangeView = useCallback(
    (view: ArticleView) => {
      dispatch(articlesPageActions.setView(view))
    },
    [dispatch]
  )
  return (
    <DynamicModuleLoader reducers={reducers}>
      <div className={classNames(cls.ArticlesPage, {}, [className])}>
        <ArticleViewSelector view={view} onViewClick={onChangeView} />
        <ArticleList articles={articles} isLoading={isLoading} view={view} />
      </div>
    </DynamicModuleLoader>
  )
}

export default memo(ArticlesPage)
