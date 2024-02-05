import { memo, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { ListBox } from '@/shared/ui/Popups'
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
      <ListBox
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
