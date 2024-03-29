import { classNames } from '@/shared/lib/classNames/classNames'
import { useTranslation } from 'react-i18next'
import cls from './NotFoundPage.module.scss'
import { memo } from 'react'
import { Page } from '@/widgets/Page'

interface NotFoundPageProps {
  className?: string
}

export const NotFoundPage = memo(({ className }: NotFoundPageProps) => {
  const { t } = useTranslation()
  return (
        <Page data-testId='NotFoundPage' className={classNames(cls.NotFoundPage, {}, [className])}>
            {t('Страница не найдена')}
        </Page>
  )
})
