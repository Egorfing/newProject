import { ReactNode } from 'react'
import { Popover as PopoverLib } from '@headlessui/react'

import cls from './Popover.module.scss'
import popupCls from '../../styles/popup.module.scss'

import { DropdownDirection } from 'shared/types/ui'
import { mapDirectionClass } from '../../styles/consts'
import { classNames } from 'shared/lib/classNames/classNames'

interface PopoverProps {
  className?: string
  children: ReactNode
  trigger: ReactNode
  direction?: DropdownDirection
}

export function Popover({
  className,
  children,
  trigger,
  direction = 'bottom right',
}: PopoverProps) {
  const panelClasses = [mapDirectionClass[direction]]
  return (
    <PopoverLib className={classNames('', {}, [className, popupCls.popup])}>
      <PopoverLib.Button className={popupCls.trigger}>{trigger}</PopoverLib.Button>

      <PopoverLib.Panel className={classNames(cls.panel, {}, panelClasses)}>
        {children}
      </PopoverLib.Panel>
    </PopoverLib>
  )
}
