import React, {
  Children,
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState
} from 'react'
import { classNames } from '../../../shared/lib/classNames/classNames'
import { Portal } from '../Portal/Portal'
import cls from './Modal.module.scss'

interface ModalProps {
  className?: string
  children?: ReactNode
  isOpen?: boolean
  onClose?: () => void
}
const ANIMATION_DELAY = 300

export const Modal = ({
  className,
  children,
  isOpen = false,
  onClose
}: ModalProps) => {
  const [isClosing, setIsClosing] = useState(false)
  const timeRef = useRef<ReturnType<typeof setTimeout>>()

  const onCloseHandler = useCallback(() => {
    if (onClose) {
      setIsClosing(true)
      timeRef.current = setTimeout(() => {
        onClose()
        setIsClosing(false)
      }, ANIMATION_DELAY)
    }
  }, [onClose])

  const onContentClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation()
  }, [])
  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onCloseHandler()
    },
    [onCloseHandler]
  )
  useEffect(() => {
    if (isOpen) {
      window.addEventListener('keydown', onKeyDown)
    }
    return () => {
      clearTimeout(timeRef.current)
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [isOpen, onKeyDown])
  const mods: Record<string, boolean> = {
    [cls.opened]: isOpen,
    [cls.isClosing]: isClosing
  }
  return (
    <Portal>
      <div className={classNames(cls.Modal, mods, [className])}>
        <div className={cls.overlay} onClick={onCloseHandler}>
          <div className={cls.content} onClick={onContentClick}>
            {children}
          </div>
        </div>
      </div>
    </Portal>
  )
}
