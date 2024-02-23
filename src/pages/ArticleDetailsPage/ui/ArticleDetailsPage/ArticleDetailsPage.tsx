import { memo } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'

import cls from './ArticleDetailsPage.module.scss'

import { ArticleDetails } from '@/entities/Article'
import { ArticleRecommendationsList } from '@/features/articleRecommendationsList'
import { classNames } from '@/shared/lib/classNames/classNames'
import {
  DynamicModuleLoader,
  ReducersList
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import { VStack } from '@/shared/ui/Stack'
import { Page } from '@/widgets/Page'
import { ArticleDetailsComments } from '../ArticleDetailsComments/ArticleDetailsComments'
import { ArticleDetailsPageHeader } from '../ArticleDetailsPageHeader/ArticleDetailsPageHeader'
import { ArticleRating } from '@/features/articleRating'
import { articleDetailsPageReducer } from '../../model/slice'
import { getFeatureFlag } from '@/shared/lib/features'
import { Counter } from '@/entities/Counter'

interface ArticleDetailsPageProps {
  className?: string
}

const reducers: ReducersList = {
  articlesDetailsPage: articleDetailsPageReducer
}

const ArticleDetailsPage = ({ className }: ArticleDetailsPageProps) => {
  const { id } = useParams<{ id: string }>()
  const { t } = useTranslation('article-details')
  const isArticleRatingEnabled = getFeatureFlag('isArticleRatingEnabled')
  const isCounterEnabled = getFeatureFlag('isCounterEnabled')

  if (!id) {
    return (
      <Page className={classNames(cls.ArticleDetailsPage, {}, [className])}>
        {t('Статья не найдена')}
      </Page>
    )
  }

  return (
    <DynamicModuleLoader reducers={reducers}>
      <Page className={classNames(cls.ArticleDetailsPage, {}, [className])}>
        <VStack gap="16" max>
          <ArticleDetailsPageHeader />
          <ArticleDetails id={id} />
          {isCounterEnabled && <Counter/>}
          {isArticleRatingEnabled && <ArticleRating articleId={id} />}
          <ArticleRecommendationsList/>
          <ArticleDetailsComments id={id}/>
        </VStack>
      </Page>
    </DynamicModuleLoader>
  )
}
export default memo(ArticleDetailsPage)
