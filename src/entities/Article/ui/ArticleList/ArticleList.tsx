import { memo } from 'react'

import cls from './ArticleList.module.scss'

import { classNames } from 'shared/lib/classNames/classNames'
import { Article, ArticleView } from '../../model/types/article'
import { ArticleItem } from '../ArticleItem/ArticleItem'
import { ArticleItemSkeleton } from '../ArticleItem/ArticleItemSkeleton'

interface ArticleListProps {
  className?: string
  articles: Article[]
  isLoading?: boolean
  view?: ArticleView
}

const getSkeletons = (view: ArticleView) => {
  return new Array(view === ArticleView.BIG ? 3 : 9)
            .fill(0)
            .map((item, index) => (
              <ArticleItemSkeleton key={index} view={view} className={cls.card} />
            ))
}

export const ArticleList = memo(
  ({
    className,
    articles,
    isLoading,
    view = ArticleView.SMALL
  }: ArticleListProps) => {
    if (isLoading) {
      return (
        <div className={classNames(cls.ArticleList, {}, [className, cls[view]])}>
          {getSkeletons(view)}
        </div>
      )
    }

    const renderArticle = (article: Article) => {
      return (
        <ArticleItem
          key={article.id}
          className={cls.card}
          article={article}
          view={view}
        />
      )
    }

    return (
      <div className={classNames(cls.ArticleList, {}, [className, cls[view]])}>
        {articles.length > 0 ? articles.map(renderArticle) : null}
      </div>
    )
  }
)
