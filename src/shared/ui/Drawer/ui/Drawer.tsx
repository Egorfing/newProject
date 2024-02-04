import { ReactNode } from 'react'

import cls from './Drawer.module.scss'

import { useTheme } from 'app/providers/ThemeProvider'
import { classNames, Mods } from 'shared/lib/classNames/classNames'
import { Portal } from 'shared/ui/Portal/Portal'
import { Overlay } from 'shared/ui/Overlay'
import { useModal } from 'shared/lib/hooks/useModal/useModal'

interface DrawerProps {
  className?: string
  children: ReactNode
  isOpen?: boolean
  onClose?: () => void
  lazy?: boolean
}

export const Drawer = ({
  className,
  children,
  isOpen,
  onClose,
  lazy
}: DrawerProps) => {
  const { theme } = useTheme()

  const { isClosing, isMounted, close } = useModal({
    animationDelay: 300,
    isOpen,
    onClose
  })
  const mods: Mods = {
    [cls.opened]: isOpen,
    [cls.isClosing]: isClosing
  }

  if (lazy && !isMounted) {
    return null
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
        <Overlay onClick={close}/>
        <div className={cls.content}>
          {children}
        </div>
      </div>
    </Portal>
  )
}
