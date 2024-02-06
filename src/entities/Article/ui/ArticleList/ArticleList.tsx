import { HTMLAttributeAnchorTarget, memo } from 'react'

import cls from './ArticleList.module.scss'

import { classNames } from '@/shared/lib/classNames/classNames'
import { Article } from '../../model/types/article'
import { ArticleItem } from '../ArticleItem/ArticleItem'
import { ArticleItemSkeleton } from '../ArticleItem/ArticleItemSkeleton'
import { useTranslation } from 'react-i18next'
import { Text, TextSize } from '@/shared/ui/Text/Text'
import { ArticleView } from '../../model/constants/articleConstants'

interface ArticleListProps {
  className?: string
  articles: Article[]
  isLoading?: boolean
  view?: ArticleView
  target?: HTMLAttributeAnchorTarget
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
    view = ArticleView.BIG,
    target
  }: ArticleListProps) => {
    const { t } = useTranslation()
    const renderArticle = (article: Article) => {
      return (
        <ArticleItem
          key={article.id}
          className={cls.card}
          article={article}
          view={view}
          target={target}
        />
      )
    }
    if (!isLoading && articles.length === 0) {
      return (
        <div
          className={classNames(cls.ArticleList, {}, [className, cls[view]])}
        >
          <Text size={TextSize.L} title={t('Статьи не найдены')} />
        </div>
      )
    }

    return (
      <div className={classNames(cls.ArticleList, {}, [className, cls[view]])}>
        {articles.length > 0 ? articles.map(renderArticle) : null}
        {isLoading && getSkeletons(view)}
      </div>
    )
  }
)
