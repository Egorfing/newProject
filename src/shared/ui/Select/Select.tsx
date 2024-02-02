import { ChangeEvent, useCallback, useMemo } from 'react'

import cls from './Select.module.scss'

import { classNames } from 'shared/lib/classNames/classNames'

export interface SelectOption<T extends string> {
  value: T
  content: string
}

interface SelectProps<T extends string> {
  className?: string
  label?: string
  options?: Array<SelectOption<T>>
  value?: T
  onChange?: (value: T) => void
  readonly?: boolean
}

export const Select = <T extends string>({
  className,
  label,
  options,
  value,
  onChange,
  readonly
}: SelectProps<T>) => {
  const optionList = useMemo(() => {
    return options?.map((el) => (
      <option className={cls.option} key={el.value} value={el.value}>
        {el.content}
      </option>
    ))
  }, [options])

  const onChangeHandler = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
    onChange?.(e.target.value as T)
  }, [])
  return (
    <div className={classNames(cls.Wrapper, {}, [className])}>
      {label && <span className={cls.label}>{`${label}>`}</span>}
      <select
        className={cls.select}
        value={value}
        onChange={onChangeHandler}
        disabled={readonly}
      >
        {optionList}
      </select>
    </div>
  )
}
