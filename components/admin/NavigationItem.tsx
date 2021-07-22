import classNames from "classnames";
import { ReactNode } from "react";
import Link from "next/link";

interface IProps {
  route: string;
  name: string;
  className?: string | "";
  children?: ReactNode;
}

export const NavigationItem = (props: IProps) => {
  return (
    <Link href={props.route} passHref={true}>
      <a
        className={classNames([
          "p-4 cursor-pointer duration-300 transition-all",
          "hover:bg-gray-400 rounded-lg hover:text-white",
          props.className,
        ])}
      >
        {props.name}
      </a>
    </Link>
  );
};
