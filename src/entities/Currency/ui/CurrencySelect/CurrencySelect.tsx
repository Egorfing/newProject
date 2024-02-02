import { memo } from 'react'
import { Currency } from '../../model/types/currency'
import { Select } from 'shared/ui/Select/Select'
import { useCallback } from '@storybook/addons'
import { useTranslation } from 'react-i18next'

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
      <Select
        label={t('Укажите валюту')}
        options={options}
        value={value}
        onChange={onChangeHandler}
        readonly={readonly}
      />
    )
  }
)
