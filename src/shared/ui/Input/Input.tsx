import React, {
  InputHTMLAttributes,
  memo,
  MutableRefObject,
  useEffect,
  useRef,
  useState
} from 'react'
import { classNames, Mods } from '../../../shared/lib/classNames/classNames'
import cls from './Input.module.scss'

type HTMLInputProps = Omit<
InputHTMLAttributes<HTMLInputElement>,
'value' | 'onChange' | 'readOnly'
>

interface InputProps extends HTMLInputProps {
  className?: string
  value?: string | number
  onChange?: (value: string) => void
  autoFocus?: boolean
  readOnly?: boolean
}

export const Input = memo(
  ({
    className,
    value,
    onChange,
    type = 'text',
    placeholder,
    autoFocus,
    readOnly,
    ...otherProps
  }: InputProps) => {
    const ref = useRef() as MutableRefObject<HTMLInputElement>
    const [isFocused, setIsFocused] = useState(false)
    const [caretPosition, setCaretPosition] = useState(0)

    const isCaretVisible = isFocused && !readOnly

    useEffect(() => {
      if (autoFocus) {
        setIsFocused(true)
        ref.current?.focus()
      }
    }, [autoFocus])

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

    const mods: Mods = {
      [cls.readOnly]: readOnly
    }

    return (
      <div className={classNames(cls.InputWrapper, mods, [className])}>
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
            readOnly={readOnly}
            value={value}
            {...otherProps}
          />
          {isCaretVisible && (
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
