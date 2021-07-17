import { MouseEventHandler } from "react";
import Image, { ImageProps } from "next/image";
import classnames from "classnames";

interface LogoProps {
  className?: string;
  onClick?: MouseEventHandler;
  width?: number;
  height?: number;
  layout?: "fixed" | "intrinsic" | "responsive";
}

export const Logo = (props: LogoProps) => {
  console.log(props.height || 150);
  return (
    <Image
      className={classnames(["cursor-pointer", props.className ?? ""])}
      onClick={props.onClick}
      src="/pldt_logo.png"
      alt="PLDT LOGO"
      width={props.width || 150}
      height={props.height || 30}
      layout={props.layout || "responsive"}
    ></Image>
  );
};
