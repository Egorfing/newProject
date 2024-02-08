import { memo } from 'react'
import { useTranslation } from 'react-i18next'

import { Page } from '@/widgets/Page'

const MainPage = memo(() => {
  const { t } = useTranslation()

  return (
        <Page data-testId='MainPage'>
            {t('Главная страница')}
        </Page>
  )
})

export default MainPage
