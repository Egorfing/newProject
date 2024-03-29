import { classNames } from '@/shared/lib/classNames/classNames'
import { Page } from '@/widgets/Page'
import cls from './ArticleEditPage.module.scss'

interface ArticleEditPageProps {
  className?: string
}

const ArticleEditPage = ({ className }: ArticleEditPageProps) => {
  // const { id } = useParams<{ id: string }>()
  // const isEdit = Boolean(id)

  return (
    <Page className={classNames(cls.ArticleEditPage, {}, [className])}>
      Создание / редактирование статьи
    </Page>
  )
}
export default ArticleEditPage
