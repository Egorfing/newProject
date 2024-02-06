import { memo, Suspense, useCallback } from 'react'
import { Route, Routes } from 'react-router-dom'
import {
  AppRouterProps,
  routeConfig
} from '@/app/providers/router/config/routeConfig'
import { PageLoader } from '@/widgets/PageLoader'
import { RequireAuth } from './RequireAuth'

const AppRouter = () => {
  const renderWithCallback = useCallback((route: AppRouterProps) => {
    const element = (
      <Suspense fallback={<PageLoader />}>{route.element}</Suspense>
    )
    return (
      <Route
        key={route.path}
        path={route.path}
        element={
          route.authOnly ? <RequireAuth>{element}</RequireAuth> : element
        }
      />
    )
  }, [])

  return <Routes>{Object.values(routeConfig).map(renderWithCallback)}</Routes>
}

export default memo(AppRouter)
