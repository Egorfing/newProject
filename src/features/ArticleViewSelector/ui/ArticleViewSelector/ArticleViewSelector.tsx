import { useCallback } from 'react'

import cls from './ArticleViewSelector.module.scss'

import { classNames } from '@/shared/lib/classNames/classNames'
import TiledIcon from '@/shared/assets/icons/TiledIcon.svg'
import ListIcon from '@/shared/assets/icons/ListIcon.svg'
import { Button, ThemeButton } from '@/shared/ui/Button/Button'
import { Icon } from '@/shared/Icon/Icon'
import { ArticleView } from '@/entities/Article'

interface ArticleViewSelectorProps {
  className?: string
  view: ArticleView
  onViewClick?: (view: ArticleView) => void
}

const viewTypes = [
  {
    view: ArticleView.SMALL,
    icon: TiledIcon
  },
  {
    view: ArticleView.BIG,
    icon: ListIcon
  }
]

export const ArticleViewSelector = ({
  className,
  view,
  onViewClick
}: ArticleViewSelectorProps) => {
  const onClick = useCallback((newView: ArticleView) => {
    onViewClick?.(newView)
  }, [])
  return (
    <div className={classNames(cls.ArticleViewSelector, {}, [className])}>
      {viewTypes.map((viewType, index) => (
        <Button
          key={index}
          theme={ThemeButton.CLEAR}
          onClick={() => { onClick(viewType.view) }}
        >
          <Icon
            Svg={viewType.icon}
            className={classNames('', {
              [cls.selected]: view === viewType.view
            })}
          />
        </Button>
      ))}
    </div>
  )
}
