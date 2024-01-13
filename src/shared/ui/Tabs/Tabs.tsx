import { memo, ReactNode, useCallback } from 'react'

import cls from './Tabs.module.scss'

import { classNames } from 'shared/lib/classNames/classNames'
import { Card, CardTheme } from '../Card/Card'

export interface TabItem<T extends string> {
  value: T
  content: ReactNode
}

interface TabsProps<T extends string> {
  className?: string
  tabs: TabItem<T>[]
  value: T
  onTabClick: (tab: T) => void
}

export const Tabs = <T extends string>({
  className,
  tabs,
  value,
  onTabClick
}: TabsProps<T>) => {
  const clickHandle = useCallback(
    (tab: T) => {
      return () => {
        onTabClick(tab)
      }
    },
    [onTabClick]
  )
  return (
    <div className={classNames(cls.Tabs, {}, [className])}>
      {tabs.map((tab) => (
        <Card
          theme={tab.value === value ? CardTheme.NORMAL : CardTheme.OUTLINED}
          className={cls.tab}
          key={tab.value}
          onClick={clickHandle(tab.value)}
        >
          {tab.content}
        </Card>
      ))}
    </div>
  )
}
