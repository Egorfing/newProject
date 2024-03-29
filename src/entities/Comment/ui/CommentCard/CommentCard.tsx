import cls from './CommentCard.module.scss'

import { classNames } from '@/shared/lib/classNames/classNames'
import { Comment } from '../../model/types/comment'
import { Avatar } from '@/shared/ui/Avatar/Avatar'
import { Text } from '@/shared/ui/Text/Text'
import { Skeleton } from '@/shared/ui/Skeleton/Skeleton'
import { AppLink } from '@/shared/ui/AppLink/AppLink'
import { VStack } from '@/shared/ui/Stack'
import { getRoutProfile } from '@/shared/const/router'

interface CommentCardProps {
  className?: string
  comment?: Comment
  isLoading?: boolean
}

export const CommentCard = ({
  className,
  comment,
  isLoading
}: CommentCardProps) => {
  if (isLoading) {
    return (
      <VStack
      data-testid="CommentCard.Loading"
      gap={'8'}
        max
        className={classNames(cls.CommentCard, { [cls.loading]: isLoading }, [
          className
        ])}
      >
        <div className={cls.header}>
          <Skeleton width={30} height={30} border={'50%'} />
          <Skeleton className={cls.userName} width={100} height={16} />
        </div>
        <Skeleton className={cls.text} width={'100%'} height={50} />
      </VStack>
    )
  }
  if (!comment) {
    return null
  }
  return (
    <VStack
      data-testid="CommentCard.Content"
      max
      gap="8"
      className={classNames(cls.CommentCard, {}, [className])}
    >
      <AppLink to={getRoutProfile(comment.user.id)} className={cls.header}>
        {comment.user.avatar ? (
          <Avatar size={30} src={comment.user.avatar} />
        ) : null}
        <Text className={cls.userName} title={comment.user.username} />
      </AppLink>
      <Text className={cls.text} text={comment.text} />
    </VStack>
  )
}
