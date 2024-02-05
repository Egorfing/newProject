import { memo, useCallback } from 'react'

import cls from './Code.module.scss'

import { Button, ThemeButton } from '../Button/Button'
import CopyIcon from '@/shared/assets/icons/CopyIcon.svg'

interface CodeProps {
  className?: string
  text: string
}

export const Code = memo(({ className, text }: CodeProps) => {
  const onCopy = useCallback(() => {
    navigator.clipboard.writeText(text)
  }, [text])
  return (
    <pre className={cls.Code}>
      <Button
        className={cls.copyBtn}
        theme={ThemeButton.CLEAR}
        onClick={onCopy}
      >
        <CopyIcon className={cls.copyIcon} />
      </Button>
      <code>{text}</code>
    </pre>
  )
})
