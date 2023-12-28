import { memo } from "react";
import { classNames } from "shared/lib/classNames/classNames";
import cls from "./ArticleDetailsPage.module.scss";

interface ArticleDetailsPageProps {
className?: string;
}

const ArticleDetailsPage = ({ className }: ArticleDetailsPageProps) => {
  return (
    <div className={classNames(cls.ArticleDetailsPage, {}, [className])}>
      ARTICLE DETAILS PAGE
    </div>
  )
};
export default memo(ArticleDetailsPage)