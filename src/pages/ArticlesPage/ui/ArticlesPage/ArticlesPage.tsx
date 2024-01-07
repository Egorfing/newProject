import { ArticleList } from 'entities/Article'
import { memo } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './ArticlesPage.module.scss'

interface ArticlesPageProps {
  className?: string
}

const ArticlesPage = ({ className }: ArticlesPageProps) => {
  return (
    <div className={classNames(cls.ArticlesPage, {}, [className])}>
      <ArticleList
        articles={[]}
      />
    </div>
  )
}

export default memo(ArticlesPage)
