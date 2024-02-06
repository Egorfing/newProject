import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { RoutePath } from '@/app/providers/router/config/routeConfig'
import { classNames } from '@/shared/lib/classNames/classNames'
import { Button } from '@/shared/ui/Button/Button'
import { getArticleDetailsData } from '@/entities/Article'
import { HStack } from '@/shared/ui/Stack'
import { getCanEditArticle } from '../../model/selectors/article'

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
    <HStack justify="between" max className={classNames('', {}, [className])}>
      <Button onClick={onBackToList}>{t('Назад к списку')}</Button>
      {canEdit && <Button onClick={onEditArticle}>{t('Редактировать')}</Button>}
    </HStack>
  )
}
