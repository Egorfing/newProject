import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "shared/ui/Button/Button";

interface BugButtonProps {
className?: string;
}

// компонент для тестирования
export const BugButton = ({ className }: BugButtonProps) => {
const {t} = useTranslation()

const [error, setError] = useState(false)

const getThrow = () => setError(true)

useEffect(()=>{
  if(error){
    throw new Error()
  }
},[error])
  return (
    <Button onClick={getThrow}>{t('создать ошибку')}</Button>
  )
};
