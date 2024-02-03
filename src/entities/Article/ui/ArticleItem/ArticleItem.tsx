import { HTMLAttributeAnchorTarget, memo, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import cls from './ArticleItem.module.scss'

import { classNames } from 'shared/lib/classNames/classNames'
import { Text } from 'shared/ui/Text/Text'
import { Icon } from 'shared/Icon/Icon'
import EyeIcon from 'shared/assets/icons/EyeIcon.svg'
import { Card } from 'shared/ui/Card/Card'
import { Avatar } from 'shared/ui/Avatar/Avatar'
import { Button, ThemeButton } from 'shared/ui/Button/Button'
import {
  Article,
  ArticleTextBlock,
} from '../../model/types/article'
import { ArticleTextBlockComponent } from '../ArticleTextBlockComponent/ArticleTextBlockComponent'
import { RoutePath } from 'shared/config/routeConfig/routeConfig'
import { AppLink } from 'shared/ui/AppLink/AppLink'
import { ArticleBlockType, ArticleView } from 'entities/Article/model/constants/articleConstants'

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
    const img = (
      <img alt={article.title} src={article.img} className={cls.img} />
    )

    const date = <Text text={article.createdAt} className={cls.date} />

    const textBlock = article.blocks.find(
      (block) => block.type === ArticleBlockType.TEXT
    ) as ArticleTextBlock

    if (view === ArticleView.BIG) {
      return (
        <div
          className={classNames(cls.ArticleItem, {}, [className, cls[view]])}
        >
          <Card>
            <div className={cls.header}>
              <Avatar
                size={30}
                src={article.user.avatar}
                className={cls.avatar}
              />
              <Text text={article.user.username} className={cls.username} />
              {date}
            </div>
            {title}
            {types}
            {img}
            {textBlock && (
              <ArticleTextBlockComponent
                block={textBlock}
                className={cls.textBlock}
              />
            )}
            <div className={cls.footer}>
              <AppLink target={target} to={RoutePath.article_details + article.id}>
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
        target={target}
        className={classNames(cls.ArticleItem, {}, [className, cls[view]])}
        to={RoutePath.article_details + article.id}
      >
        <Card>
          <div className={cls.imageWrapper}>
            {img}
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
