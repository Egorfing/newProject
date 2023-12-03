import { memo, Suspense, useMemo } from 'react'
import { useSelector } from 'react-redux'
import { Route, Routes } from 'react-router-dom'
import { getUserAuthData } from 'entities/User'
import { routeConfig } from 'shared/config/routeConfig/routeConfig'
import { PageLoader } from 'shared/ui/PageLoader/PageLoader'

const AppRouter = () => {
  const isAuth = useSelector(getUserAuthData)
  const routes = useMemo(() => {
    return Object.values(routeConfig).filter((route) => {
        if(route.authOnly && !isAuth?.id) return false;
        return true
    })
  }, [isAuth])
  console.log('routes', routes);
  
  return (
    <Routes>
      {routes.map(({ element, path }) => {
  console.log('path', path);

        return (
        <Route
          key={path}
          path={path}
          element={
            <Suspense fallback={<PageLoader />}>
              <div className="page-wrapper">{element}</div>
            </Suspense>
          }
        />
      )})}
    </Routes>
  )
}

export default memo(AppRouter)
