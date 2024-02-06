import { useCallback, useState } from 'react'
import {
  BrowserView,
  MobileView
} from 'react-device-detect'

import { NotificationList } from '@/entities/Notification'
import { Icon } from '@/shared/Icon/Icon'
import { classNames } from '@/shared/lib/classNames/classNames'
import { Button, ThemeButton } from '@/shared/ui/Button/Button'
import { Popover } from '@/shared/ui/Popups'
import cls from './NotificationButton.module.scss'
import Notification from '@/shared/assets/icons/Notification.svg'
import { Drawer } from '@/shared/ui/Drawer'

interface NotificationButtonProps {
  className?: string
}

export const NotificationButton = ({ className }: NotificationButtonProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const onOpenDrawer = useCallback(() => {
    setIsOpen(true)
  }, [])
  const onCloseDrawer = useCallback(() => {
    setIsOpen(false)
  }, [])
  const trigger = (
    <Button onClick={onOpenDrawer} theme={ThemeButton.CLEAR}>
      <Icon Svg={Notification} inverted />
    </Button>
  )

  return (
    <div>
      <BrowserView>
        <Popover
          className={classNames(cls.NotificationButton, {}, [className])}
          direction="bottom left"
          trigger={trigger}
        >
          <NotificationList className={cls.notifications} />
        </Popover>
      </BrowserView>
      <MobileView>
        {trigger}
          <Drawer isOpen={isOpen} onClose={onCloseDrawer}>
            <NotificationList />
          </Drawer>
      </MobileView>
    </div>
  )
}
