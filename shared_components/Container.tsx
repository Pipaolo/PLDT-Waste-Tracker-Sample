import classNames from "classnames";

interface IProps {
  children: React.ReactNode;
  className?: string;
}

export const Container = (props: IProps) => {
  return (
    <div className={classNames(["w-full h-full p-4", props.className])}>
      {props.children}
    </div>
  );
};
