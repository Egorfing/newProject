import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'

import { getArticlesType } from 'pages/ArticlesPage/model/selectors/getArticlePageSelectors'
import { TabItem, Tabs } from 'shared/ui/Tabs/Tabs'
import { ArticleType } from '../../model/types/article'

interface ArticleTypeTabsProps {
  className?: string
  onTypeChange: (newTab: ArticleType) => void
}

export const ArticleTypeTabs = ({ className, onTypeChange }: ArticleTypeTabsProps) => {
  const type = useSelector(getArticlesType)
  const { t } = useTranslation()

  const typeTabs = useMemo<Array<TabItem<ArticleType>>>(
    () => [
      { value: ArticleType.ALL, content: t('Все статьи') },
      { value: ArticleType.IT, content: t('Айти') },
      { value: ArticleType.ECONOMICS, content: t('Экономика') },
      { value: ArticleType.SCIENCE, content: t('Наука') }
    ],
    []
  )
  return (
    <Tabs
      className={className}
      tabs={typeTabs}
      value={type}
      onTabClick={onTypeChange}
    />
  )
}
