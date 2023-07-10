import React, { InputHTMLAttributes, memo, useEffect, useRef, useState } from 'react'
import { classNames } from '../../../shared/lib/classNames/classNames'
import cls from './Input.module.scss'

type HTMLInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'value' | 'onChange'
>

interface InputProps extends HTMLInputProps {
  className?: string
  value?: string
  onChange?: (value: string) => void
}

export const Input = memo(
  ({
    className,
    value,
    onChange,
    type = 'text',
    placeholder,
    autoFocus,
    ...otherProps
  }: InputProps) => {
    const ref = useRef<HTMLInputElement>()
    const [isFocused, setIsFocused] = useState(false)
    const [caretPosition, setCaretPosition] = useState(0)

    useEffect(()=>{
      if(autoFocus) {
        setIsFocused(true)
        ref.current?.focus()
      }
    },[autoFocus])

    const onBlur = () => {
      setIsFocused(false)
    }
    const onFocus = () => {
      setIsFocused(true)
    }
    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange?.(e.target.value)
      setCaretPosition(e.target.value.length)
    }

    const onSelect = (e: any) => {
      setCaretPosition(e?.target?.selectionStart || 0)
    }

    return (
      <div className={classNames(cls.InputWrapper, {}, [className])}>
        {placeholder && (
          <div className={cls.placeholder}>{`${placeholder}>`}</div>
        )}
        <div className={cls.caretWrapper}>
          <input
          ref={ref}
            className={cls.input}
            type={type}
            onChange={onChangeHandler}
            onBlur={onBlur}
            onFocus={onFocus}
            onSelect={onSelect}
            {...otherProps}
          />
          {isFocused && (
            <span
              className={cls.caret}
              style={{ left: `${caretPosition * 9}px` }}
            />
          )}
        </div>
      </div>
    )
  }
)
