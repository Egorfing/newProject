import { memo, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'

import cls from './AddCommentForm.module.scss'

import { classNames } from '@/shared/lib/classNames/classNames'
import { Input } from '@/shared/ui/Input/Input'
import { Button, ThemeButton } from '@/shared/ui/Button/Button'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'
import {
  DynamicModuleLoader,
  ReducersList
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import {
  getCommentFormError,
  getCommentFormText
} from '../../model/selectors/addCommentFormSelectors'
import {
  addCommentFormActions,
  addCommentFormReducer
} from '../../model/slice/addCommentFormSlice'
import { HStack } from '@/shared/ui/Stack'

export interface AddCommentFormProps {
  className?: string
  onSendComment: (text: string) => void
}

const reducers: ReducersList = {
  addCommentForm: addCommentFormReducer
}

const AddCommentForm = memo(
  ({ className, onSendComment }: AddCommentFormProps) => {
    const { t } = useTranslation()
    const dispatch = useAppDispatch()
    const text = useSelector(getCommentFormText)
    const error = useSelector(getCommentFormError)

    const onCommentTextChange = useCallback(
      (value: string) => {
        dispatch(addCommentFormActions.setText(value))
      },
      [dispatch]
    )

    const onCommentSend = useCallback(() => {
      if (text) {
        onSendComment(text)
        onCommentTextChange('')
      }
    }, [dispatch, onCommentTextChange, text])

    return (
      <DynamicModuleLoader reducers={reducers}>
        <HStack
          data-testid="AddCommentForm"
          justify="between"
          max
          className={classNames(cls.AddCommentForm, {}, [className])}
        >
          <Input
            data-testid="AddCommentForm.Input"
            className={cls.input}
            placeholder={t('Введите текст комментария')}
            value={text}
            onChange={onCommentTextChange}
          />
          <Button
            data-testid="AddCommentForm.Button"
            onClick={onCommentSend}
            theme={ThemeButton.OUTLINE}
          >
            {t('Отправить')}
          </Button>
        </HStack>
      </DynamicModuleLoader>
    )
  }
)
export default AddCommentForm
