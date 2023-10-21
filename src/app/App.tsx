import { Suspense, useEffect } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import { AppRouter } from 'app/providers/router'
import { Navbar } from 'widgets/Navbar'
import { Sidebar } from 'widgets/Sidebar'
import { useTheme } from './providers/ThemeProvider'
import { userActions } from 'entites/User'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch'

function App() {
  const { theme } = useTheme()
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(userActions.initAuthData())
  }, [dispatch])

  return (
    <div className={classNames('app', {}, [theme])}>
      <Suspense fallback="">
        <Navbar />
        <div className="content-page">
          <Sidebar />
          <AppRouter />
        </div>
      </Suspense>
    </div>
  )
}

export default App
