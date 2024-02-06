import { memo, useMemo, useState } from 'react'

import cls from './Sidebar.module.scss'

import { classNames } from '@/shared/lib/classNames/classNames'
import { Button, SizeButton, ThemeButton } from '@/shared/ui/Button/Button'
import { LangSwitcher } from '@/features/LangSwitcher'
import { ThemeSwitcher } from '@/features/ThemeSwitcher'
import { SidebarItem } from './SidebarItem/SidebarItem'
import { useSelector } from 'react-redux'
import { getSidebarItems } from '../../model/selectors/getSidebarItems'
import { VStack } from '@/shared/ui/Stack'

interface SidebarProps {
  className?: string
}

export const Sidebar = memo(({ className }: SidebarProps) => {
  const [collapsed, setCollapsed] = useState(false)
  const sidebarItemsList = useSelector(getSidebarItems)
  const onToggle = () => {
    setCollapsed((prev) => !prev)
  }

  const itemList = useMemo(
    () =>
      sidebarItemsList.map((item) => (
        <SidebarItem key={item.path} item={item} collapsed={collapsed} />
      )),
    [sidebarItemsList, collapsed]
  )

  return (
    <aside
      data-testid="sidebar"
      className={classNames(cls.Sidebar, { [cls.collapsed]: collapsed }, [
        className
      ])}
    >
      <Button
        data-testid="sidebar-toggle"
        onClick={onToggle}
        className={cls.collapseBtn}
        theme={ThemeButton.BACKGROUND_INVERTED}
        square
        size={SizeButton.L}
      >
        {collapsed ? '>' : '<'}
      </Button>
      <VStack gap="8" role={'navigation'} className={cls.items}>
        {itemList}
      </VStack>
      <div className={cls.switchers}>
        <ThemeSwitcher />
        <LangSwitcher short={collapsed} className={cls.lang} />
      </div>
    </aside>
  )
})
