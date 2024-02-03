import { CommentList } from 'entities/Comment'
import { AddCommentForm } from 'features/AddCommentForm'
import { fetchSendComment } from 'features/AddCommentForm/model/services/sendComment/sendComment'
import { getArticleCommentsIsLoading } from 'pages/ArticleDetailsPage/model/selectors/comments'
import { fetchArticleRecommendation } from 'pages/ArticleDetailsPage/model/services/fetchArticlesRecommendations/fetchArticlesRecommendations'
import { fetchCommentsByArticleId } from 'pages/ArticleDetailsPage/model/services/fetchCommentsByArticleId/fetchCommentsByArticleId'
import { getArticleComments } from 'pages/ArticleDetailsPage/model/slice/articleDetailsCommentsSlice'
import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { classNames } from 'shared/lib/classNames/classNames'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch'
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect'
import { VStack } from 'shared/ui/Stack'
import { Text, TextSize } from 'shared/ui/Text/Text'
import cls from './ArticleDetailsComments.module.scss'

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
    <VStack gap='16' max className={classNames(cls.ArticleDetailsComments, {}, [className])}>
      <Text
        className={cls.commentTitle}
        size={TextSize.L}
        title={t('Комментарии')}
      />
      <AddCommentForm onSendComment={onSendComment} />
      <CommentList isLoading={commentsIsLoading} comments={comments} />
    </VStack>
  )
}
