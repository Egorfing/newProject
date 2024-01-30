import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

import cls from './ArticleDetailsPageHeader.module.scss'

import { RoutePath } from 'shared/config/routeConfig/routeConfig'
import { classNames } from 'shared/lib/classNames/classNames'
import { Button } from 'shared/ui/Button/Button'
import { getUserAuthData } from 'entities/User'
import { getArticleDetailsData } from 'entities/Article/model/selectors/articleDetails'
import { getCanEditArticle } from 'pages/ArticleDetailsPage/model/selectors/article'

interface ArticleDetailsPageHeaderProps {
  className?: string
}

export const ArticleDetailsPageHeader = ({
  className
}: ArticleDetailsPageHeaderProps) => {
  const { t } = useTranslation('article-details')
  const navigate = useNavigate()
  const canEdit = useSelector(getCanEditArticle)
  const article = useSelector(getArticleDetailsData)

  const onBackToList = useCallback(() => {
    navigate(RoutePath.articles)
  }, [navigate])

  const onEditArticle = useCallback(() => {
    navigate(`${RoutePath.article_details}${article?.id}/edit`)
  }, [navigate, article])

  return (
    <div className={classNames(cls.ArticleDetailsPageHeader, {}, [className])}>
      <Button onClick={onBackToList}>{t('Назад к списку')}</Button>
      {canEdit && (
        <Button className={cls.editBtn} onClick={onEditArticle}>
          {t('Редактировать')}
        </Button>
      )}
    </div>
  )
}
