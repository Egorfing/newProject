import { memo } from 'react'
import { useTranslation } from 'react-i18next'
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import { classNames } from 'shared/lib/classNames/classNames'
import { profileReducer } from 'entites/Profile'

interface ProfilePageProps {
  className?: string
}

const reducers: ReducersList = {
  profile: profileReducer
}

const ProfilePage = memo(({ className }: ProfilePageProps) => {
  const { t } = useTranslation()
  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount>

      <div className={classNames('', {}, [className])}>{t('Profile Page')}</div>
    </DynamicModuleLoader>
  )
})

export default ProfilePage
