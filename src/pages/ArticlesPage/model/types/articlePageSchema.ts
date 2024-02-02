import { EntityState } from '@reduxjs/toolkit'
import { Article, ArticleView } from 'entities/Article'
import { ArticleSortField, ArticleType } from 'entities/Article/model/types/article'
import { SortOrder } from 'shared/types'

export interface ArticlePageSchema extends EntityState<Article> {
  isLoading?: boolean
  error?: string
  view: ArticleView

  // pagination
  page: number
  limit: number
  hasMore: boolean

  // filters
  order: SortOrder
  sort: ArticleSortField
  search: string
  type: ArticleType

  _inited: boolean
}
