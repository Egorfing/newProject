import { memo } from 'react'

import cls from './ArticleItem.module.scss'

import { classNames } from 'shared/lib/classNames/classNames'
import { Card } from 'shared/ui/Card/Card'
import { Skeleton } from 'shared/ui/Skeleton/Skeleton'
import {
  ArticleView
} from '../../model/types/article'

interface ArticleItemSkeletonProps {
  className?: string
  view: ArticleView
}

export const ArticleItemSkeleton = memo(
  ({ className, view }: ArticleItemSkeletonProps) => {
    if (view === ArticleView.BIG) {
      return (
        <div
          className={classNames(cls.ArticleItem, {}, [className, cls[view]])}
        >
          <Card>
            <div className={cls.header}>
              <Skeleton
                width={30}
                height={30}
                border={'50%'}
                className={cls.avatar}
              />
              <Skeleton width={150} height={16} className={cls.username} />
              <Skeleton width={150} height={16} className={cls.date} />
            </div>
            <Skeleton width={250} height={24} className={cls.title} />
            <Skeleton height={200} className={cls.img} />
            <div className={cls.footer}>
              <Skeleton width={200} height={36} />
              <Skeleton width={100} height={24} className={cls.views} />
            </div>
          </Card>
        </div>
      )
    }
    return (
      <div className={classNames(cls.ArticleItem, {}, [className, cls[view]])}>
        <Card>
          <div className={cls.imageWrapper}>
            <Skeleton width={200} height={200} className={cls.img} />
          </div>
          <div className={cls.infoWrapper}>
            <Skeleton width={130} height={16} />
          </div>
          <Skeleton width={150} height={16} className={cls.title} />
        </Card>
      </div>
    )
  }
)
