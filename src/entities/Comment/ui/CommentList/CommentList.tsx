import cls from './CommentList.module.scss'

import { classNames } from 'shared/lib/classNames/classNames'
import { Comment } from '../../model/types/comment'
import { useTranslation } from 'react-i18next'
import { Text } from 'shared/ui/Text/Text'
import { CommentCard } from '../CommentCard/CommentCard'

interface CommentListProps {
  className?: string
  comments: Comment[]
  isLoading?: boolean
}

export const CommentList = ({ className, comments, isLoading }: CommentListProps) => {
  const { t } = useTranslation()

  if(isLoading) {
    return (
    <div className={classNames(cls.CommentList, {}, [className])}>
      <CommentCard className={cls.comment} isLoading/>
      <CommentCard className={cls.comment} isLoading/>
      <CommentCard className={cls.comment} isLoading/>
    </div>

    )
  }
  return (
    <div className={classNames(cls.CommentList, {}, [className])}>
      {comments.length ? 
      comments.map(comment => <CommentCard className={cls.comment} key={comment.id} comment={comment}/>)
    : <Text title={t('Комментарии отсутствуют')}/>}
    </div>
  )
}
