import classNames from "classnames";

interface IProps {
  children?: React.ReactNode;
  className?: string;
}

export const Container = (props: IProps) => {
  return <div className={classNames([props.className])}>{props.children}</div>;
};
