import { ReactNode } from 'react'

import cls from './Drawer.module.scss'

import { useTheme } from 'app/providers/ThemeProvider'
import { classNames, Mods } from 'shared/lib/classNames/classNames'
import { Portal } from 'shared/ui/Portal/Portal'
import { Overlay } from 'shared/ui/Overlay'

interface DrawerProps {
  className?: string
  children: ReactNode
  isOpen?: boolean
  onClose?: () => void
}

export const Drawer = ({
  className,
  children,
  isOpen,
  onClose
}: DrawerProps) => {
  const { theme } = useTheme()
  const mods: Mods = {
    [cls.opened]: isOpen
  }
  return (
    <Portal>
      <div
        className={classNames(cls.Drawer, mods, [
          className,
          theme,
          'app_drawer'
        ])}
      >
        <Overlay onClick={onClose}/>
        <div className={cls.content}>
          {children}
        </div>
      </div>
    </Portal>
  )
}
