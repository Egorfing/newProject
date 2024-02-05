import { ReactNode } from 'react'
import { useModal } from '@/shared/lib/hooks/useModal/useModal'
import { classNames, Mods } from '../../../shared/lib/classNames/classNames'
import { Overlay } from '../Overlay'
import { Portal } from '../Portal/Portal'
import cls from './Modal.module.scss'

interface ModalProps {
  className?: string
  children?: ReactNode
  isOpen?: boolean
  onClose?: () => void
  lazy?: boolean
}
const ANIMATION_DELAY = 300

export const Modal = ({
  className,
  children,
  isOpen = false,
  onClose,
  lazy
}: ModalProps) => {
  const { isClosing, isMounted, close } = useModal({
    animationDelay: ANIMATION_DELAY,
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
      <div className={classNames(cls.Modal, mods, [className])}>
        <Overlay onClick={close} />
        <div className={cls.content}>{children}</div>
      </div>
    </Portal>
  )
}
