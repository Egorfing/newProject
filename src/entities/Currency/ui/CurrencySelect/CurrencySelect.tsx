import { memo, useCallback } from 'react'
import { Currency } from '../../model/types/currency'
import { useTranslation } from 'react-i18next'
import { Listbox } from 'shared/ui/ListBox/ListBox'

interface CurrencySelectProps {
  className?: string
  value?: Currency
  onChange?: (value: Currency) => void
  readonly?: boolean
}

const options = [
  { value: Currency.RUB, content: Currency.RUB },
  { value: Currency.EUR, content: Currency.EUR },
  { value: Currency.USD, content: Currency.USD }
]

export const CurrencySelect = memo(
  ({ className, value, onChange, readonly = false }: CurrencySelectProps) => {
    const { t } = useTranslation()
    const onChangeHandler = useCallback(
      (value: string) => {
        onChange?.(value as Currency)
      },
      [onChange]
    )
    return (
      <Listbox
        className={className}
        onChange={onChangeHandler}
        value={value}
        items={options}
        defaultValue={t('Укажите валюту')}
        label={t('Укажите валюту')}
        readonly={readonly}
        direction='top right'
      />
    )
  }
)
