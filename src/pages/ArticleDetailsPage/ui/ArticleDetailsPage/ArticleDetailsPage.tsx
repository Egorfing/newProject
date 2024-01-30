import { memo, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import cls from './ArticleDetailsPage.module.scss'

import { ArticleDetails, ArticleList, ArticleView } from 'entities/Article'
import { CommentList } from 'entities/Comment'
import { AddCommentForm } from 'features/AddCommentForm'
import { fetchSendComment } from 'features/AddCommentForm/model/services/sendComment/sendComment'
import { getArticleRecommendationIsLoading } from 'pages/ArticleDetailsPage/model/selectors/recommendations'
import { articleDetailsPageReducer } from 'pages/ArticleDetailsPage/model/slice'
import { classNames } from 'shared/lib/classNames/classNames'
import {
  DynamicModuleLoader,
  ReducersList
} from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch'
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect'
import { Text, TextSize } from 'shared/ui/Text/Text'
import { Page } from 'widgets/Page/Page'
import { getArticleCommentsIsLoading } from '../../model/selectors/comments'
import { fetchArticleRecommendation } from '../../model/services/fetchArticlesRecommendations/fetchArticlesRecommendations'
import { fetchCommentsByArticleId } from '../../model/services/fetchCommentsByArticleId/fetchCommentsByArticleId'
import {
  getArticleComments
} from '../../model/slice/articleDetailsCommentsSlice'
import {
  getArticleRecommendations
} from '../../model/slice/articleDetailsPageRecommendationsSlice'
import { ArticleDetailsPageHeader } from '../ArticleDetailsPageHeader/ArticleDetailsPageHeader'

interface ArticleDetailsPageProps {
  className?: string
}

const reducers: ReducersList = {
  articlesDetailsPage: articleDetailsPageReducer
}

const ArticleDetailsPage = ({ className }: ArticleDetailsPageProps) => {
  const { id } = useParams<{ id: string }>()
  const { t } = useTranslation('article-details')
  const comments = useSelector(getArticleComments.selectAll)
  const recommendations = useSelector(getArticleRecommendations.selectAll)
  const commentsIsLoading = useSelector(getArticleCommentsIsLoading)
  const recommendationIsLoading = useSelector(getArticleRecommendationIsLoading)
  const dispatch = useAppDispatch()

  useInitialEffect(() => {
    dispatch(fetchCommentsByArticleId(id))
    dispatch(fetchArticleRecommendation())
  })
  if (!id) {
    return (
      <Page className={classNames(cls.ArticleDetailsPage, {}, [className])}>
        {t('Статья не найдена')}
      </Page>
    )
  }

  const onSendComment = useCallback(
    (text: string) => {
      dispatch(fetchSendComment(text))
    },
    [dispatch]
  )

  return (
    <DynamicModuleLoader reducers={reducers}>
      <Page className={classNames(cls.ArticleDetailsPage, {}, [className])}>
        <ArticleDetailsPageHeader />
        <ArticleDetails id={id} />
        <Text
          className={cls.commentTitle}
          size={TextSize.L}
          title={t('Рекомендуем')}
        />
        <ArticleList
          className={cls.recommendation}
          view={ArticleView.SMALL}
          target={'_blank'}
          articles={recommendations}
          isLoading={recommendationIsLoading}
        />
        <Text
          className={cls.commentTitle}
          size={TextSize.L}
          title={t('Комментарии')}
        />
        <AddCommentForm onSendComment={onSendComment} />
        <CommentList isLoading={commentsIsLoading} comments={comments} />
      </Page>
    </DynamicModuleLoader>
  )
}
export default memo(ArticleDetailsPage)
