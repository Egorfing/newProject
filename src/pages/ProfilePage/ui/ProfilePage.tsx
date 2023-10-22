import { memo, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import { classNames } from 'shared/lib/classNames/classNames'
import { fetchProfileData, ProfileCard, profileReducer } from 'entites/Profile'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch'

interface ProfilePageProps {
  className?: string
}

const reducers: ReducersList = {
  profile: profileReducer
}

const ProfilePage = memo(({ className }: ProfilePageProps) => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchProfileData())
  },[dispatch])
  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount>

      <div className={classNames('', {}, [className])}>
        <ProfileCard/>
      </div>
    </DynamicModuleLoader>
  )
})

export default ProfilePage
