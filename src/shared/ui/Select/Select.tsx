import { useMemo } from '@storybook/addons'
import { ChangeEvent, memo, useCallback } from 'react'
import { classNames } from '../../../shared/lib/classNames/classNames'
import cls from './Select.module.scss'

interface SelectOption {
  value: string
  content: string
}

interface SelectProps {
  className?: string
  label?: string
  options?: SelectOption[]
  value?: string
  onChange?: (value: string) => void
  readonly?: boolean
}

export const Select = memo(
  ({ className, label, options, value, onChange, readonly }: SelectProps) => {
    const optionList = useMemo(() => {
      return options?.map((el) => (
        <option className={cls.option} key={el.value} value={el.value}>
          {el.content}
        </option>
      ))
    }, [options])

    const onChangeHandler = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
      onChange?.(e.target.value)
    }, [])
    return (
      <div className={classNames(cls.Wrapper, {}, [className])}>
        {label && <span className={cls.label}>{`${label}>`}</span>}
        <select className={cls.select} value={value} onChange={onChangeHandler} disabled={readonly}>
          {optionList}
        </select>
      </div>
    )
  }
)
