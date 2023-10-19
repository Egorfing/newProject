import { ReduxStoreWithManager } from 'app/providers/StoreProvider/config/StateSchema'
import {
  getLoginError,
  getLoginIsLoading,
  getLoginPassword,
  getLoginUsername
} from 'features/AuthByUsername/model/selectors/getLoginState/getLoginState'
import { loginByUsername } from 'features/AuthByUsername/model/services/loginByUsername/loginByUsername'
import {
  loginActions,
  loginReducer
} from 'features/AuthByUsername/model/slice/loginSlice'
import { memo, useCallback, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector, useStore } from 'react-redux'
import { Button, ThemeButton } from 'shared/ui/Button/Button'
import { Input } from 'shared/ui/Input/Input'
import { Text, TextTheme } from 'shared/ui/Text/Text'
import { classNames } from '../../../../shared/lib/classNames/classNames'
import cls from './LoginForm.module.scss'

export interface LoginFormProps {
  className?: string
}

const LoginForm = memo(({ className }: LoginFormProps) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const username = useSelector(getLoginUsername)
  const password = useSelector(getLoginPassword)
  const isLoading = useSelector(getLoginIsLoading)
  const error = useSelector(getLoginError)

  const store = useStore() as ReduxStoreWithManager

  useEffect(() => {
    store.reducerManager.add('loginForm', loginReducer)
    dispatch({ type: '@INIT loginForm reducer' })
    return () => {
      store.reducerManager.remove('loginForm')
      dispatch({ type: '@DESTROY loginForm reducer' })
    }
  }, [])

  const onChangeUsername = useCallback(
    (value: string) => {
      dispatch(loginActions.setUsername(value))
    },
    [dispatch]
  )
  const onChangePassword = useCallback(
    (value: string) => {
      dispatch(loginActions.setPassword(value))
    },
    [dispatch]
  )
  const onLoginClick = useCallback(() => {
    dispatch(loginByUsername({ username, password }))
  }, [dispatch, username, password])

  return (
    <div className={classNames(cls.LoginForm, {}, [className])}>
      <Text title={t('Форма авторизации')} />
      {error && (
        <Text
          text={t('Вы ввели неверный логин или пароль')}
          theme={TextTheme.ERROR}
        />
      )}
      <Input
        autoFocus
        placeholder={t('Введите username')}
        className={cls.input}
        value={username}
        onChange={onChangeUsername}
      />
      <Input
        placeholder={t('Введите пароль')}
        className={cls.input}
        value={password}
        onChange={onChangePassword}
      />
      <Button
        theme={ThemeButton.OUTLINE}
        className={cls.loginBtn}
        disabled={isLoading}
        onClick={onLoginClick}
      >
        {t('Войти')}
      </Button>
    </div>
  )
})
export default LoginForm
