import { Listbox as HListBox } from '@headlessui/react'
import { Fragment, ReactNode } from 'react'

import cls from './ListBox.module.scss'
import popupCls from '../../styles/popup.module.scss'

import { classNames } from '@/shared/lib/classNames/classNames'
import { DropdownDirection } from '@/shared/types/ui'
import { Button } from '../../../Button/Button'
import { HStack } from '../../../Stack'
import { mapDirectionClass } from '../../styles/consts'

export type ListBoxItem = {
  value: string
  content: ReactNode
  disabled?: boolean
}

interface ListBoxProps {
  className?: string
  items?: ListBoxItem[]
  value?: string
  defaultValue?: string
  label?: string
  onChange: (value: string) => void
  readonly?: boolean
  direction?: DropdownDirection
}

export function ListBox({
  className,
  items,
  value,
  defaultValue,
  label,
  onChange,
  readonly,
  direction = 'bottom right'
}: ListBoxProps) {
  const optionsClasses = [mapDirectionClass[direction]]

  return (
    <HStack gap='4'>
      {label && <span>{`${label}>`}</span>}
      <HListBox
        as={'div'}
        className={classNames('', {}, [className, popupCls.popup])}
        disabled={readonly}
        value={value}
        onChange={onChange}
      >
        <HListBox.Button className={popupCls.trigger}>
          <Button disabled={readonly}>{value ?? defaultValue}</Button>
        </HListBox.Button>
        <HListBox.Options
          className={classNames(cls.options, {}, optionsClasses)}
        >
          {items?.map((item) => (
            <HListBox.Option
              key={item.value}
              value={item.value}
              disabled={item.disabled}
              as={Fragment}
            >
              {({ active, selected }) => (
                <li
                  className={classNames(cls.item, {
                    [popupCls.active]: active,
                    [popupCls.disabled]: item.disabled
                  })}
                >
                  {selected && '!!!'}
                  {item.content}
                </li>
              )}
            </HListBox.Option>
          ))}
        </HListBox.Options>
      </HListBox>
    </HStack>
  )
}
