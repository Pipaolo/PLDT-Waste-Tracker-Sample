import { MouseEventHandler, ReactNode } from "react";
import classnames from "classnames";
interface ButtonProps {
  className?: string | "";
  children?: ReactNode;
  onClick: MouseEventHandler;
}

export const OutlineButton = (props: ButtonProps) => {
  return (
    <button
      className={classnames([
        props.className,
        "cursor-pointer py-2 px-4 rounded-full ripple-bg-white hover:elevation-4 transition duration-300 border-2 border-pldt-red focus:outline-none",
      ])}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};
