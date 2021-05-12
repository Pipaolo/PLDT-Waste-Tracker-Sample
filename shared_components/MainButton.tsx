import { MouseEventHandler, ReactNode } from "react";

interface ButtonProps {
  classNames?: string;
  children?: ReactNode;
  onClick: MouseEventHandler;
}

export const MainButton = (props: ButtonProps) => {
  return (
    <div
      className={
        props.classNames ??
        "cursor-pointer py-2 px-4 rounded-full bg-pldt-red ripple-bg-red-400 hover:elevation-4 transition duration-300"
      }
      onClick={props.onClick}
    >
      {props.children}
    </div>
  );
};
