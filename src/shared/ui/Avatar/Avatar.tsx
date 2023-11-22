import { classNames } from "../../../shared/lib/classNames/classNames";
import cls from "./Avatar.module.scss";

interface AvatarProps {
className?: string;
src?: string;
}

export const Avatar = ({ className, src }: AvatarProps) => {
  return (
    <img src={src} className={classNames(cls.Avatar, {}, [className])}/>

    
  )
};
