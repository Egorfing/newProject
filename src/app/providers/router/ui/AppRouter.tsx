import { memo, Suspense, useCallback, useMemo } from 'react'
import { useSelector } from 'react-redux'
import { Route, Routes } from 'react-router-dom'
import { getUserAuthData } from 'entities/User'
import {
  AppRouterProps,
  AppRoutes,
  routeConfig
} from 'shared/config/routeConfig/routeConfig'
import { PageLoader } from 'shared/ui/PageLoader/PageLoader'
import { RequireAuth } from './requireAuth'

const AppRouter = () => {
  const renderWithCallback = useCallback((route: AppRouterProps) => {
    const element = (
      <Suspense fallback={<PageLoader />}>
        <div className="page-wrapper">{route.element}</div>
      </Suspense>
    )
    return <Route key={route.path} path={route.path} element={route.authOnly ? <RequireAuth>{element}</RequireAuth> : element} />
  }, [])

  return <Routes>{Object.values(routeConfig).map(renderWithCallback)}</Routes>
}

export default memo(AppRouter)
