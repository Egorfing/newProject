import { memo } from 'react'

import cls from './ArticleCodeBlockComponent.module.scss'

import { ArticleCodeBlock } from '@/entities/Article/model/types/article'
import { Code } from '@/shared/ui/Code/Code'
import { classNames } from '@/shared/lib/classNames/classNames'

interface ArticleCodeBlockComponentProps {
  className?: string
  block: ArticleCodeBlock
}

export const ArticleCodeBlockComponent = memo(
  ({ className, block }: ArticleCodeBlockComponentProps) => {
    return (
      <div
        className={classNames(cls.ArticleCodeBlockComponent, {}, [className])}
      >
        <Code text={block.code}/>
      </div>
    )
  }
)
