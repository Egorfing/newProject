import { classNames } from '@/shared/lib/classNames/classNames'
import { Button, ThemeButton } from '@/shared/ui/Button/Button'
import { Card } from '@/shared/ui/Card/Card'
import { Drawer } from '@/shared/ui/Drawer'
import { Input } from '@/shared/ui/Input/Input'
import { Modal } from '@/shared/ui/Modal/Modal'
import { HStack, VStack } from '@/shared/ui/Stack'
import { StarRating } from '@/shared/ui/StarRating'
import { Text } from '@/shared/ui/Text/Text'
import { memo, useCallback, useState } from 'react'
import { BrowserView, MobileView } from 'react-device-detect'
import { useTranslation } from 'react-i18next'
import cls from './RatingCard.module.scss'

interface RatingCardProps {
  className?: string
  title?: string
  feedbackTitle?: string
  hasFeedback?: boolean
  onCancel?: (starsCount: number) => void
  onAccept?: (starsCount: number, feedback?: string) => void
}

export const RatingCard = memo(
  ({
    className,
    title,
    feedbackTitle,
    hasFeedback,
    onCancel,
    onAccept
  }: RatingCardProps) => {
    const { t } = useTranslation()
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [starCount, setStarCount] = useState(0)
    const [feedback, setFeedback] = useState('')

    const onSelectStars = useCallback(
      (selectedStarsCount: number) => {
        setStarCount(selectedStarsCount)
        if (hasFeedback) {
          setIsModalOpen(true)
        } else {
          onAccept?.(selectedStarsCount)
        }
      },
      [hasFeedback, onAccept]
    )

    const acceptHandler = useCallback(() => {
      setIsModalOpen(false)
      onAccept?.(starCount, feedback)
    }, [feedback, onAccept, starCount])

    const cancelHandler = useCallback(() => {
      setIsModalOpen(false)
      onCancel?.(starCount)
    }, [onCancel, starCount])

    const modalContent = (
      <>
        <Text title={feedbackTitle} />
        <Input
          value={feedback}
          onChange={setFeedback}
          placeholder={t('Ваш отзыв')}
        />
      </>
    )
    return (
      <Card className={classNames(cls.RatingCard, {}, [className])}>
        <VStack align="center" gap="8">
          {title && <Text title={title} />}
          <StarRating size={40} onSelect={onSelectStars} />
        </VStack>
        <BrowserView>
          <Modal isOpen={isModalOpen} lazy>
            <VStack max gap="32">
              {modalContent}
              <HStack max gap="8" justify="end">
                <Button onClick={cancelHandler} theme={ThemeButton.OUTLINE_RED}>
                  {t('Закрыть')}
                </Button>
                <Button onClick={acceptHandler}>{t('Отправить')}</Button>
              </HStack>
            </VStack>
          </Modal>
        </BrowserView>
        <MobileView>
          <Drawer isOpen={isModalOpen} lazy onClose={cancelHandler}>
            {modalContent}
            <Button fullWidth onClick={acceptHandler}>
              {t('Отправить')}
            </Button>
          </Drawer>
        </MobileView>
      </Card>
    )
  }
)
