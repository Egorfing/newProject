import { RatingCard } from '@/entities/Rating'
import { getUserAuthData } from '@/entities/User'
import { Skeleton } from '@/shared/ui/Skeleton/Skeleton'
import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { useArticleRating, useRateArticle } from '../../api/articleRatingApi'

export interface ArticleRatingProps {
  className?: string
  articleId: string
}

const ArticleRating = ({ className, articleId }: ArticleRatingProps) => {
  const { t } = useTranslation()
  const userData = useSelector(getUserAuthData)
  const { data, isLoading } = useArticleRating({
    articleId,
    userId: userData?.id ?? ''
  })

  const [rateArticleMutation] = useRateArticle()

  const rating = data?.[0]

  const handleRateArticle = useCallback(
    (starsCount: number, feedback?: string) => {
      try {
        rateArticleMutation({
          articleId,
          userId: userData?.id ?? '',
          rate: starsCount,
          feedback
        })
      } catch (error) {
        console.log(error)
      }
    },
    [articleId, userData, rateArticleMutation]
  )

  const onAccept = useCallback((starsCount: number, feedback?: string) => {
    handleRateArticle(starsCount, feedback)
  }, [handleRateArticle])
  const onCancel = useCallback((starsCount: number) => {
    handleRateArticle(starsCount)
  }, [handleRateArticle])


  if (isLoading) {
    return <Skeleton width={'100%'} height={120} />
  }
  return (
    <RatingCard
      className={className}
      rate={rating?.rate}
      title={t('Оцените статью')}
      feedbackTitle={t('Оставьте свой отзыв о статье')}
      hasFeedback
      onAccept={onAccept}
      onCancel={onCancel}
    />
  )
}

export default ArticleRating