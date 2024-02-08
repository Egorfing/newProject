import { CSSProperties, useMemo } from 'react'

import cls from './Avatar.module.scss'

import { classNames } from '../../../shared/lib/classNames/classNames'
import { AppImage } from '../AppImage/AppImage'
import UserAvatar from '@/shared/assets/icons/UserAvatar.svg'
import { Icon } from '@/shared/Icon/Icon'
import { Skeleton } from '../Skeleton/Skeleton'

interface AvatarProps {
  className?: string
  src?: string
  size?: number
  alt?: string
  fallbackInverted?: boolean
}

export const Avatar = ({
  className,
  src,
  size = 100,
  alt,
  fallbackInverted = false
}: AvatarProps) => {
  const style = useMemo<CSSProperties>(
    () => ({
      width: size,
      height: size
    }),
    [size]
  )

  const fallback = <Skeleton width={size} height={size} border={'50%'} />
  const errorFallback = (
    <Icon
      inverted={fallbackInverted}
      width={size}
      height={size}
      Svg={UserAvatar}
    />
  )
  return (
    <AppImage
      src={src}
      alt={alt}
      style={style}
      fallback={fallback}
      errorFallback={errorFallback}
      className={classNames(cls.Avatar, {}, [className])}
    />
  )
}
