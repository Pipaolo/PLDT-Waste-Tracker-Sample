import classNames from "classnames";

interface IProps {
  className?: string | "";
}

export const Divider = (props: IProps) => {
  return (
    <div
      className={classNames([
        "h-1 w-full bg-gray-300 rounded-full",
        props.className,
      ])}
    ></div>
  );
};
