import { useTranslation } from "react-i18next";
import { Page } from "@/widgets/Page/Page";

interface AdminPanelPageProps {
className?: string;
}

const AdminPanelPage = ({ className }: AdminPanelPageProps) => {
  const { t } = useTranslation('admin')

  return (
        <Page>
            {t('Панель админа')}
        </Page>
  )
};

export default AdminPanelPage