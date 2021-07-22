import classNames from "classnames";
import { MouseEventHandler, ReactNode } from "react";

interface ButtonProps {
  className?: string | "";
  children?: ReactNode;
  onClick: MouseEventHandler;
}

export const MainButton = (props: ButtonProps) => {
  return (
    <div
      className={classNames([
        props.className,
        "cursor-pointer py-2 px-4 hover:elevation-4 transition duration-300",
      ])}
      onClick={props.onClick}
    >
      {props.children}
    </div>
  );
};
