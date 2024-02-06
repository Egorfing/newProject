import { memo } from 'react'

import cls from './ArticleTextBlockComponent.module.scss'

import { ArticleTextBlock } from '../../model/types/article'
import { Text } from '@/shared/ui/Text/Text'
import { classNames } from '@/shared/lib/classNames/classNames'

interface ArticleTextBlockComponentProps {
  className?: string
  block: ArticleTextBlock
}

export const ArticleTextBlockComponent = memo(
  ({ className, block }: ArticleTextBlockComponentProps) => {
    return (
      <div
        className={classNames(cls.ArticleTextBlockComponent, {}, [className])}
      >
        {block.title && <Text title={block.title} className={cls.title} />}
        {block.paragraphs.map((paragraph, index) => (
          <Text key={index} text={paragraph} className={cls.paragraph}/>
        ))}
      </div>
    )
  }
)
