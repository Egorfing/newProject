import { memo } from 'react'
import { Select } from 'shared/ui/Select/Select'
import { useCallback } from '@storybook/addons'
import { useTranslation } from 'react-i18next'
import { Country } from '../../model/types'

interface CountrySelectProps {
  className?: string
  value?: Country
  onChange?: (value: Country) => void
  readonly?: boolean
}

const options = [
  { value: Country.Russia, content: Country.Russia },
  { value: Country.USA, content: Country.USA },
  { value: Country.Iceland, content: Country.Iceland }
]

export const CountrySelect = memo(
  ({ className, value, onChange, readonly = false }: CountrySelectProps) => {
    const { t } = useTranslation()
    const onChangeHandler = useCallback(
      (value: string) => {
        onChange?.(value as Country)
      },
      [onChange]
    )
    return (
      <Select
        label={t('Укажите Страну')}
        options={options}
        value={value}
        onChange={onChangeHandler}
        readonly={readonly}
      />
    )
  }
)
