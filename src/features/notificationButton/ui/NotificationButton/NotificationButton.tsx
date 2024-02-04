import { NotificationList } from 'entities/Notification'
import { Icon } from 'shared/Icon/Icon'
import { classNames } from 'shared/lib/classNames/classNames'
import { Button, ThemeButton } from 'shared/ui/Button/Button'
import { Popover } from 'shared/ui/Popups'
import cls from './NotificationButton.module.scss'
import Notification from 'shared/assets/icons/Notification.svg'

interface NotificationButtonProps {
  className?: string
}

export const NotificationButton = ({ className }: NotificationButtonProps) => {
  return (
    <Popover
      className={classNames(cls.NotificationButton, {}, [className])}
      direction="bottom left"
      trigger={
        <Button theme={ThemeButton.CLEAR}>
          <Icon Svg={Notification} inverted />
        </Button>
      }
    >
      <NotificationList className={cls.notifications} />
    </Popover>
  )
}
