import { useTranslation } from 'react-i18next'
import { Page } from '@/widgets/Page'

interface AdminPanelPageProps {
  className?: string
}

const AdminPanelPage = ({ className }: AdminPanelPageProps) => {
  const { t } = useTranslation('admin')

  return (
        <Page data-testId='AdminPanelPage'>
            {t('Панель админа')}
        </Page>
  )
}

export default AdminPanelPage
