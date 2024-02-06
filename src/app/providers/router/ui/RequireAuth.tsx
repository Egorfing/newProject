import { getUserAuthData, getUserRoles, UserRole } from '@/entities/User'
import { getRoutForbidden, getRoutMain } from '@/shared/const/router'
import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { Navigate, useLocation } from 'react-router-dom'

interface RequireAuthProps {
  children: JSX.Element
  roles?: UserRole[]
}

export function RequireAuth({ children, roles }: RequireAuthProps) {
  const auth = useSelector(getUserAuthData)
  const location = useLocation()
  const userRoles = useSelector(getUserRoles)

  const hasRequiredRole = useMemo(() => {
    if (!roles) {
      return true
    }
    return roles.some(requiredRole => {
      const hasRole = userRoles?.includes(requiredRole)
      return hasRole
    })
  }, [roles, userRoles])

  if (!auth) {
    return <Navigate to={getRoutMain()} state={{ from: location }} replace/>
  }

  if (!hasRequiredRole) {
    return <Navigate to={getRoutForbidden()} state={{ from: location }} replace/>
  }

  return children
}
