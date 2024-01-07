import { memo } from 'react'
import { useTranslation } from 'react-i18next'

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
  ArticleBlockType,
  ArticleTextBlock,
  ArticleView
} from '../../model/types/article'
import { ArticleTextBlockComponent } from '../ArticleTextBlockComponent/ArticleTextBlockComponent'
import { useNavigate } from 'react-router-dom'
import { useCallback } from '@storybook/addons'
import { RoutePath } from 'shared/config/routeConfig/routeConfig'

interface ArticleItemProps {
  className?: string
  article: Article
  view: ArticleView
}

export const ArticleItem = memo(
  ({ className, article, view }: ArticleItemProps) => {
    const { t } = useTranslation()
    const navigate = useNavigate()

    const onOpenArticle = useCallback(() => {
      navigate(RoutePath.article_details + article.id)
    }, [article.id, navigate])
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
              <Button onClick={onOpenArticle} theme={ThemeButton.OUTLINE}>
                {t('Читать далее ...')}
              </Button>
              {views}
            </div>
          </Card>
        </div>
      )
    }
    return (
      <div className={classNames(cls.ArticleItem, {}, [className, cls[view]])}>
        <Card onClick={onOpenArticle}>
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
      </div>
    )
  }
)
