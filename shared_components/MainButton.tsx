import classNames from 'classnames';
import { ButtonHTMLAttributes } from 'react';
import { MouseEventHandler, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string | '';
  children?: ReactNode;
  onClick?: MouseEventHandler;
}

export const MainButton = (props: ButtonProps) => {
  return (
    <button
      className={classNames([
        props.className,
        'cursor-pointer py-2 px-4 hover:elevation-4 transition duration-300',
      ])}
      onClick={props.onClick}
      {...props}
    >
      {props.children}
    </button>
  );
};
