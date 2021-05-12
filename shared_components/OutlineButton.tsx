import { MouseEventHandler, ReactNode } from "react";
import classnames from "classnames";
interface ButtonProps {
  classNames?: string;
  children?: ReactNode;
  onClick: MouseEventHandler;
}

export const OutlineButton = (props: ButtonProps) => {
  return (
    <button
      className={classnames([
        "cursor-pointer py-2 px-4 rounded-full ripple-bg-white hover:elevation-4 transition duration-300 border-2 border-pldt-red focus:outline-none",
        props.classNames ?? "",
      ])}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};
