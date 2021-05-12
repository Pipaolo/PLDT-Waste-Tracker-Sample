import { MouseEventHandler } from "react";
import classnames from "classnames";

interface LogoProps {
  className?: string;
  onClick?: MouseEventHandler;
}

export const Logo = (props: LogoProps) => {
  return (
    <img
      className={classnames(["cursor-pointer", props.className ?? ""])}
      onClick={props.onClick}
      src={"https://my.pldthome.com/Assets/images/header/default/logo.png"}
    />
  );
};
