import { memo, useCallback, useState } from 'react'
import { BrowserView, MobileView } from 'react-device-detect'
import { useTranslation } from 'react-i18next'
import { Button, ThemeButton } from '@/shared/ui/Button/Button'
import { Card } from '@/shared/ui/Card/Card'
import { Drawer } from '@/shared/ui/Drawer'
import { Input } from '@/shared/ui/Input/Input'
import { Modal } from '@/shared/ui/Modal/Modal'
import { HStack, VStack } from '@/shared/ui/Stack'
import { StarRating } from '@/shared/ui/StarRating'
import { Text } from '@/shared/ui/Text/Text'

interface RatingCardProps {
  className?: string
  title?: string
  feedbackTitle?: string
  hasFeedback?: boolean
  onCancel?: (starsCount: number) => void
  onAccept?: (starsCount: number, feedback?: string) => void
  rate?: number
}

export const RatingCard = memo(
  ({
    className,
    title,
    feedbackTitle,
    hasFeedback,
    onCancel,
    onAccept,
    rate = 0
  }: RatingCardProps) => {
    const { t } = useTranslation()
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [starCount, setStarCount] = useState(rate)
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
          data-testid='RatingCard.Input'
        />
      </>
    )
    return (
      <Card className={className} max data-testid='RatingCard'>
        <VStack align="center" gap="8" max>
          <Text title={starCount ? t('Спасибо за оценку') : title} />
          <StarRating
            selectedStars={starCount}
            size={40}
            onSelect={onSelectStars}
          />
        </VStack>
        <BrowserView>
          <Modal isOpen={isModalOpen} lazy>
            <VStack max gap="32">
              {modalContent}
              <HStack max gap="8" justify="end">
                <Button
                  data-testid="RatingCard.Close"
                  onClick={cancelHandler}
                  theme={ThemeButton.OUTLINE_RED}
                >
                  {t('Закрыть')}
                </Button>
                <Button data-testid="RatingCard.Send" onClick={acceptHandler}>
                  {t('Отправить')}
                </Button>
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
