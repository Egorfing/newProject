import { classNames } from '@/shared/lib/classNames/classNames'
import { Comment } from '../../model/types/comment'
import { useTranslation } from 'react-i18next'
import { Text } from '@/shared/ui/Text/Text'
import { CommentCard } from '../CommentCard/CommentCard'
import { VStack } from '@/shared/ui/Stack'

interface CommentListProps {
  className?: string
  comments: Comment[]
  isLoading?: boolean
}

export const CommentList = ({ className, comments, isLoading }: CommentListProps) => {
  const { t } = useTranslation()

  if (isLoading) {
    return (
    <VStack gap='16' max className={classNames('', {}, [className])}>
      <CommentCard isLoading/>
      <CommentCard isLoading/>
      <CommentCard isLoading/>
    </VStack>

    )
  }
  return (
    <VStack gap='16' max className={classNames('', {}, [className])}>
      {comments.length
        ? comments.map(comment => <CommentCard key={comment.id} comment={comment}/>)
        : <Text title={t('Комментарии отсутствуют')}/>}
    </VStack>
  )
}
