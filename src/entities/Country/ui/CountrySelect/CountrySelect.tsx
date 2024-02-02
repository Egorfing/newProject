import { memo, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { Country } from '../../model/types'
import { Listbox } from 'shared/ui/ListBox/ListBox'

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
      <Listbox
        className={className}
        onChange={onChangeHandler}
        value={value}
        items={options}
        defaultValue={t('Укажите Страну')}
        label={t('Укажите Страну')}
        readonly={readonly}
      />
    )
  }
)
