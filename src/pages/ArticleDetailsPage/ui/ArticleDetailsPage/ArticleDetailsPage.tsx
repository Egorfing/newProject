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
import { getFeatureFlag, ToggleFeatures, toggleFeatures } from '@/shared/lib/features'
import { Card } from '@/shared/ui/Card/Card'

interface ArticleDetailsPageProps {
  className?: string
}

const reducers: ReducersList = {
  articlesDetailsPage: articleDetailsPageReducer
}

const Counter = () => <div>Counter</div>
const CounterRedesign = () => <div>CounterRedesign</div>

const ArticleDetailsPage = ({ className }: ArticleDetailsPageProps) => {
  const { id } = useParams<{ id: string }>()
  const { t } = useTranslation('article-details')
  const isArticleRatingEnabled = getFeatureFlag('isArticleRatingEnabled')

  if (!id) {
    return (
      <Page className={classNames(cls.ArticleDetailsPage, {}, [className])}>
        {t('Статья не найдена')}
      </Page>
    )
  }

  const articleRatingCard = toggleFeatures({
    name:'isArticleRatingEnabled',
    on: () => <ArticleRating articleId={id} />,
    off: () => <Card>{t('Блок с оценкой скоро появится')}</Card>
  })

  return (
    <DynamicModuleLoader reducers={reducers}>
      <Page className={classNames(cls.ArticleDetailsPage, {}, [className])}>
        <VStack gap="16" max>
          <ArticleDetailsPageHeader />
          <ArticleDetails id={id} />
          <ToggleFeatures
            feature='isArticleRatingEnabled'
            on={<ArticleRating articleId={id} />}
            off={<Card>{t('Блок с оценкой скоро появится')}</Card>}
          />
          <ArticleRecommendationsList/>
          <ArticleDetailsComments id={id}/>
        </VStack>
      </Page>
    </DynamicModuleLoader>
  )
}
export default memo(ArticleDetailsPage)
