import cls from './CommentCard.module.scss'

import { classNames } from 'shared/lib/classNames/classNames'
import { Comment } from '../../model/types/comment'
import { Avatar } from 'shared/ui/Avatar/Avatar'
import { Text } from 'shared/ui/Text/Text'
import { Skeleton } from 'shared/ui/Skeleton/Skeleton'

interface CommentCardProps {
  className?: string
  comment: Comment
  isLoading?: boolean
}

export const CommentCard = ({
  className,
  comment,
  isLoading
}: CommentCardProps) => {
  if (isLoading) {
    return (
      <div className={classNames(cls.CommentCard, {}, [className])}>
        <div className={cls.header}>
          <Skeleton width={30} height={30} border={'50%'} />
          <Skeleton className={cls.userName} width={100} height={16}/>
        </div>
          <Skeleton className={cls.text} width={'100%'} height={50} />
      </div>
    )
  }
  return (
    <div className={classNames(cls.CommentCard, {}, [className])}>
      <div className={cls.header}>
        {comment.user.avatar ? (
          <Avatar size={30} src={comment.user.avatar} />
        ) : null}
        <Text className={cls.userName} title={comment.user.username} />
      </div>
      <Text className={cls.text} text={comment.text} />
    </div>
  )
}
