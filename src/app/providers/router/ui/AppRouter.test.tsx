import { screen } from '@testing-library/react'

import { getRoutAbout, getRoutAdmin, getRoutProfile } from '@/shared/const/router'
import { componentRender } from '@/shared/lib/tests/componentRender/componentRender'
import AppRouter from './AppRouter'
import { UserRole } from '@/entities/User'

describe('app/providers/router/AppRouter', () => {
  test('Страница должна отрендериться', async () => {
    componentRender(<AppRouter />, {
      route: getRoutAbout()
    })

    const page = await screen.findByTestId('AboutPage')
    expect(page).toBeInTheDocument()
  })

  test('Страница не найдена', async () => {
    componentRender(<AppRouter />, {
      route: '/jhbsbdfhbkls'
    })

    const page = await screen.findByTestId('NotFoundPage')
    expect(page).toBeInTheDocument()
  })

  test('Редирект неавторизованного пользователя на главную', async () => {
    componentRender(<AppRouter />, {
      route: getRoutProfile('1')
    })

    const page = await screen.findByTestId('MainPage')
    expect(page).toBeInTheDocument()
  })

  test('Доступ к закрытой странице для авторизованного пользователя', async () => {
    componentRender(<AppRouter />, {
      route: getRoutProfile('1'),
      initialState: {
        user: {
          _inited: true,
          authData: {}
        }
      }
    })

    const page = await screen.findByTestId('ProfilePage')
    expect(page).toBeInTheDocument()
  })

  test('Доступ запрошен (отсутствует роль)', async () => {
    componentRender(<AppRouter />, {
      route: getRoutAdmin(),
      initialState: {
        user: {
          _inited: true,
          authData: {}
        }
      }
    })

    const page = await screen.findByTestId('ForbiddenPage')
    expect(page).toBeInTheDocument()
  })

  test('Доступ разрешен (роль есть)', async () => {
    componentRender(<AppRouter />, {
      route: getRoutAdmin(),
      initialState: {
        user: {
          _inited: true,
          authData: { roles: [UserRole.ADMIN] }
        }
      }
    })

    const page = await screen.findByTestId('AdminPanelPage')
    expect(page).toBeInTheDocument()
  })
})
