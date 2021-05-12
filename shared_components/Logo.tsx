import { MouseEventHandler } from "react";
import Image, { ImageProps } from "next/image";
import classnames from "classnames";

interface LogoProps {
  className?: string;
  onClick?: MouseEventHandler;
}

export const Logo = (props: LogoProps) => {
  return (
    <Image
      className={classnames(["cursor-pointer", props.className ?? ""])}
      onClick={props.onClick}
      src="/pldt_logo.png"
      alt="PLDT LOGO"
      width={150}
      height={30}
      layout="responsive"
    ></Image>
  );
};
