import { Fragment, ReactNode } from 'react'
import { Menu } from '@headlessui/react'

import cls from './Dropdown.module.scss'
import popupCls from '../../styles/popup.module.scss'

import { classNames } from 'shared/lib/classNames/classNames'
import { DropdownDirection } from 'shared/types/ui'
import { AppLink } from '../../../AppLink/AppLink'
import { mapDirectionClass } from '../../styles/consts'

export interface DropdownItem {
  disabled?: boolean
  content: ReactNode
  onClick?: () => void
  href?: string
}

interface DropdownProps {
  className?: string
  items: DropdownItem[]
  trigger: ReactNode
  direction?: DropdownDirection
}

export function Dropdown({
  className,
  trigger,
  items,
  direction = 'bottom right'
}: DropdownProps) {
  const menuClasses = [mapDirectionClass[direction]]
  return (
    <Menu as="div" className={classNames('', {}, [className, popupCls.popup])}>
      <Menu.Button className={popupCls.trigger}>{trigger}</Menu.Button>
      <Menu.Items className={classNames(cls.menu, {}, menuClasses)}>
        {items.map((item) => {
          const content = ({ active }: { active: boolean }) => (
            <button
              key={item.content as string}
              type="button"
              className={classNames(
                cls.item,
                { [popupCls.active]: active },
                []
              )}
              onClick={item.onClick}
              disabled={item.disabled}
            >
              {item.content}
            </button>
          )
          if (item.href) {
            return (
              <Menu.Item as={AppLink} to={item.href} disabled={item.disabled}>
                {content}
              </Menu.Item>
            )
          }
          return (
            <Menu.Item as={Fragment} disabled={item.disabled}>
              {content}
            </Menu.Item>
          )
        })}
      </Menu.Items>
    </Menu>
  )
}
