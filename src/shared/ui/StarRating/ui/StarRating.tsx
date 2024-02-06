import { memo, useState } from 'react'
import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './StarRating.module.scss'
import StarIcon from '@/shared/assets/icons/Star.svg'
import { Icon } from '@/shared/Icon/Icon'

interface StarRatingProps {
  className?: string
  onSelect?: (starsCount: number) => void
  size?: number
  selectedStars?: number
}

const stars = [1, 2, 3, 4, 5]

export const StarRating = memo(
  ({ className, size = 30, selectedStars = 0, onSelect }: StarRatingProps) => {
    const [currentStarsCount, setCurrentStarsCount] = useState(selectedStars)
    const [isSelected, setIsSelected] = useState(Boolean(selectedStars))

    const onHover = (StarsCount: number) => () => {
      if (!isSelected) {
        setCurrentStarsCount(StarsCount)
      }
    }
    const onLeave = () => {
      if (!isSelected) {
        setCurrentStarsCount(0)
      }
    }
    const onClick = (StarsCount: number) => () => {
      if (!isSelected) {
        onSelect?.(StarsCount)
        setCurrentStarsCount(StarsCount)
        setIsSelected(true)
      }
    }
    return (
      <div className={classNames(cls.StarRating, {}, [className])}>
        {stars.map((starNumber) => (
          <Icon
            className={classNames(cls.icon, {
              [cls.hovered]: currentStarsCount >= starNumber,
              [cls.selected]: isSelected
            })}
            width={size}
            height={size}
            key={starNumber}
            Svg={StarIcon}
            onMouseEnter={onHover(starNumber)}
            onMouseLeave={onLeave}
            onClick={onClick(starNumber)}
          />
        ))}
      </div>
    )
  }
)
