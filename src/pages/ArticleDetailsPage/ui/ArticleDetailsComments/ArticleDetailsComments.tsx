import { Suspense, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'

import cls from './ArticleDetailsComments.module.scss'

import { CommentList } from '@/entities/Comment'
import { AddCommentForm } from '@/features/AddCommentForm'
import { fetchSendComment } from '@/features/AddCommentForm/model/services/sendComment/sendComment'
import { classNames } from '@/shared/lib/classNames/classNames'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect/useInitialEffect'
import { VStack } from '@/shared/ui/Stack'
import { Text, TextSize } from '@/shared/ui/Text/Text'
import { getArticleCommentsIsLoading } from '../../model/selectors/comments'
import { fetchCommentsByArticleId } from '../../model/services/fetchCommentsByArticleId/fetchCommentsByArticleId'
import { fetchArticleRecommendation } from '../../model/services/fetchArticlesRecommendations/fetchArticlesRecommendations'
import { getArticleComments } from '../../model/slice/articleDetailsCommentsSlice'

interface ArticleDetailsCommentsProps {
  className?: string
  id: string
}

export const ArticleDetailsComments = ({
  className,
  id
}: ArticleDetailsCommentsProps) => {
  const { t } = useTranslation('article-details')
  const comments = useSelector(getArticleComments.selectAll)
  const commentsIsLoading = useSelector(getArticleCommentsIsLoading)
  const dispatch = useAppDispatch()

  useInitialEffect(() => {
    dispatch(fetchCommentsByArticleId(id))
    dispatch(fetchArticleRecommendation())
  })

  const onSendComment = useCallback(
    (text: string) => {
      dispatch(fetchSendComment(text))
    },
    [dispatch]
  )
  return (
    <VStack
      gap="16"
      max
      className={classNames(cls.ArticleDetailsComments, {}, [className])}
    >
      <Text
        className={cls.commentTitle}
        size={TextSize.L}
        title={t('Комментарии')}
      />
      <Suspense fallback={t('Идет загрузка')}>
        <AddCommentForm onSendComment={onSendComment} />
      </Suspense>
      <CommentList isLoading={commentsIsLoading} comments={comments} />
    </VStack>
  )
}
