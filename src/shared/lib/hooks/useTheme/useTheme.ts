import { useContext } from 'react'
import { ThemeContext } from '@/shared/lib/context/ThemeContext'
import { Theme } from '@/shared/const/theme'
import { LOCAL_STORAGE_THEME_KEY } from '@/shared/const/localstorage'

interface UseThemeResult {
  toggleTheme: () => void
  theme: Theme
}

export function useTheme(): UseThemeResult {
  const { theme, setTheme } = useContext(ThemeContext)

  const toggleTheme = () => {
    let newTheme: Theme
    switch (theme) {
      case Theme.DARK:
        newTheme = Theme.LIGHT
        break
      case Theme.LIGHT:
        newTheme = Theme.ORANGE
        break
      default:
        newTheme = Theme.DARK
        break
    }
    setTheme?.(newTheme)
    document.body.className = newTheme
    localStorage.setItem(LOCAL_STORAGE_THEME_KEY, newTheme)
  }

  return {
    theme: theme || Theme.LIGHT,
    toggleTheme
  }
}
