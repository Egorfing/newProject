import { memo, ReactNode, useCallback, useEffect } from 'react'

import cls from './Drawer.module.scss'

import { classNames } from '@/shared/lib/classNames/classNames'
import { Portal } from '@/shared/ui/Portal/Portal'
import { Overlay } from '@/shared/ui/Overlay'
import {
  AnimationProvider,
  useAnimationLibs
} from '@/shared/lib/components/AnimationProvider'
import { useTheme } from '@/shared/lib/hooks/useTheme/useTheme'

interface DrawerProps {
  className?: string
  children: ReactNode
  isOpen?: boolean
  onClose?: () => void
  lazy?: boolean
}
const height = window.innerHeight - 100
const DrawerContent = memo(
  ({ className, children, isOpen, onClose, lazy }: DrawerProps) => {
    const { theme } = useTheme()
    const { Spring, Gesture } = useAnimationLibs()

    const [{ y }, api] = Spring.useSpring(() => ({ y: height }))
    const openDrawer = useCallback(() => {
      api.start({ y: 0, immediate: false })
    }, [api])

    useEffect(() => {
      if (isOpen) {
        openDrawer()
      }
    }, [isOpen, openDrawer])

    const close = (velocity = 0) => {
      api.start({
        y: height,
        immediate: false,
        config: { ...Spring.config.stiff, velocity },
        onResolve: onClose
      })
    }

    const bind = Gesture.useDrag(
      ({
        last,
        velocity: [, vy],
        direction: [, dy],
        movement: [, my],
        cancel
      }) => {
        if (my < -70) cancel()

        if (last) {
          my > height * 0.5 || (vy > 0.5 && dy > 0) ? close() : openDrawer()
        } else api.start({ y: my, immediate: true })
      },
      {
        from: () => [0, y.get()],
        filterTaps: true,
        bounds: { top: 0 },
        rubberband: true
      }
    )

    if (!isOpen) {
      return null
    }
    const display = y.to((py) => (py < height ? 'block' : 'none'))
    return (
      <Portal>
        <div
          className={classNames(cls.Drawer, {}, [
            className,
            theme,
            'app_drawer'
          ])}
        >
          <Overlay onClick={close} />
          <Spring.a.div
            className={cls.sheet}
            style={{ display, bottom: `calc(-100vh + ${height - 100}px)`, y }}
            {...bind()}
          >
            {children}
          </Spring.a.div>
        </div>
      </Portal>
    )
  }
)

const DrawerAsync = (props: DrawerProps) => {
  const { isLoaded } = useAnimationLibs()
  if (!isLoaded) return null
  return <DrawerContent {...props} />
}

export const Drawer = (props: DrawerProps) => {
  const { isLoaded } = useAnimationLibs()
  if (!isLoaded) return null
  return (
    <AnimationProvider>
      <DrawerAsync {...props} />
    </AnimationProvider>
  )
}
