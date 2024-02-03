import { memo, useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import cls from './ArticleSortSelector.module.scss'

import { ArticleSortField } from 'entities/Article/model/constants/articleConstants'
import { classNames } from 'shared/lib/classNames/classNames'
import { SortOrder } from 'shared/types'
import { Select, SelectOption } from 'shared/ui/Select/Select'

interface ArticleSortSelectorProps {
  className?: string
  sort: ArticleSortField
  order: SortOrder
  onChangeSort: (newSort: ArticleSortField) => void
  onChangeOrder: (newOrder: SortOrder) => void
}

export const ArticleSortSelector = memo(
  ({
    className,
    sort,
    order,
    onChangeOrder,
    onChangeSort
  }: ArticleSortSelectorProps) => {
    const { t } = useTranslation()

    const orderOptions = useMemo<Array<SelectOption<SortOrder>>>(
      () => [
        {
          value: 'asc',
          content: t('возрастанию')
        },
        {
          value: 'desc',
          content: t('убыванию')
        }
      ],
      [t]
    )
    const sortFieldOptions = useMemo<Array<SelectOption<ArticleSortField>>>(
      () => [
        {
          value: ArticleSortField.CREATED,
          content: t('дате создания')
        },
        {
          value: ArticleSortField.TITLE,
          content: t('названию')
        },
        {
          value: ArticleSortField.VIEWS,
          content: t('просмотрам')
        }
      ],
      [t]
    )

    return (
      <div className={classNames(cls.ArticleSortSelector, {}, [className])}>
        <Select
          options={sortFieldOptions}
          value={sort}
          label={t('Сортировать ПО')}
          onChange={onChangeSort}
        />
        <Select
          className={cls.order}
          options={orderOptions}
          value={order}
          label={t('по')}
          onChange={onChangeOrder}
        />
      </div>
    )
  }
)
