import { HTMLAttributeAnchorTarget, memo } from 'react'
import { useTranslation } from 'react-i18next'

import cls from './ArticleItem.module.scss'

import { classNames } from '@/shared/lib/classNames/classNames'
import { Text } from '@/shared/ui/Text/Text'
import { Icon } from '@/shared/Icon/Icon'
import EyeIcon from '@/shared/assets/icons/EyeIcon.svg'
import { Card } from '@/shared/ui/Card/Card'
import { Avatar } from '@/shared/ui/Avatar/Avatar'
import { Button, ThemeButton } from '@/shared/ui/Button/Button'
import { AppLink } from '@/shared/ui/AppLink/AppLink'
import { getRoutArticleDetails } from '@/shared/const/router'
import { Article, ArticleTextBlock } from '../../model/types/article'
import { ArticleTextBlockComponent } from '../ArticleTextBlockComponent/ArticleTextBlockComponent'
import {
  ArticleBlockType,
  ArticleView
} from '../../model/constants/articleConstants'
import { AppImage } from '@/shared/ui/AppImage/AppImage'
import { Skeleton } from '@/shared/ui/Skeleton/Skeleton'

interface ArticleItemProps {
  className?: string
  article: Article
  view: ArticleView
  target?: HTMLAttributeAnchorTarget
}
export const ArticleItem = memo(
  ({ className, article, view, target = '_self' }: ArticleItemProps) => {
    const { t } = useTranslation()
    console.log('article', article)

    const types = <Text text={article.type.join(', ')} className={cls.types} />
    const title = <Text text={article.title} className={cls.title} />
    const views = (
      <>
        <Text text={String(article.views)} className={cls.views} />
        <Icon Svg={EyeIcon} />
      </>
    )

    const date = <Text text={article.createdAt} className={cls.date} />

    const textBlock = article.blocks.find(
      (block) => block.type === ArticleBlockType.TEXT
    ) as ArticleTextBlock

    if (view === ArticleView.BIG) {
      return (
        <div
          data-testid="ArticleItem"
          className={classNames(cls.ArticleItem, {}, [className, cls[view]])}
        >
          <Card>
            <div className={cls.header}>
              <Avatar
                size={30}
                src={article.user?.avatar}
                className={cls.avatar}
              />
              <Text text={article.user?.username} className={cls.username} />
              {date}
            </div>
            {title}
            {types}
            <AppImage
              alt={article.title}
              src={article.img}
              className={cls.img}
              fallback={<Skeleton width={'100%'} height={250} />}
            />
            {textBlock && (
              <ArticleTextBlockComponent
                block={textBlock}
                className={cls.textBlock}
              />
            )}
            <div className={cls.footer}>
              <AppLink target={target} to={getRoutArticleDetails(article.id)}>
                <Button theme={ThemeButton.OUTLINE}>
                  {t('Читать далее ...')}
                </Button>
              </AppLink>
              {views}
            </div>
          </Card>
        </div>
      )
    }
    return (
      <AppLink
        data-testid="ArticleItem"
        target={target}
        className={classNames(cls.ArticleItem, {}, [className, cls[view]])}
        to={getRoutArticleDetails(article.id)}
      >
        <Card>
          <div className={cls.imageWrapper}>
            <AppImage
              alt={article.title}
              src={article.img}
              className={cls.img}
              fallback={<Skeleton width={200} height={200} />}
            />
            {date}
          </div>
          <div className={cls.infoWrapper}>
            {types}
            {views}
          </div>
          {title}
        </Card>
      </AppLink>
    )
  }
)
