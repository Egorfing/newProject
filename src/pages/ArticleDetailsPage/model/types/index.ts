import { ArticleDetailsCommentsSchema } from './articleDetailsCommentsSchema'
import { ArticleDetailsRecommendationSchema } from './articleDetailsPageRecomendationsSchema'

export interface ArticleDetailsPageSchema {
  comments: ArticleDetailsCommentsSchema
  recommendations: ArticleDetailsRecommendationSchema
}
