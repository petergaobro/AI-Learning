import twcm from "../libs/twcm";
import { useMemo } from "react";
import infoDarkGreen from "../../public/img/svg/info_dark_green.svg";
import infoGreen from "../../public/img/svg/info_green.svg";
import infoBlue from "../../public/img/svg/info_blue.svg";
import Image from "next/image";

type InfoIconProps = {
  color?: "green" | "dark-green" | "blue";
  dataTip: string | undefined;
  className?: string;
};

export const ttStyle = {
  "--tooltip-tail": "10px",
  "--tooltip-tail-offset": "22px",
  "--tooltip-color": "#292524",
  "--tooltip-text-color": "white",
} as React.CSSProperties;

const InfoIcon = (props: InfoIconProps) => {
  const { color, dataTip, className = "" } = props;

  const icon = useMemo(() => {
    switch (color) {
      case "dark-green":
        return infoDarkGreen;
      case "blue":
        return infoBlue;
      default:
      case "green":
        return infoGreen;
    }
  }, [color]);

  return (
    <button
      className={twcm("tooltip tooltip-bottom flex-shrink-0 p-1", className)}
      tabIndex={-1}
      style={{
        visibility: !!dataTip ? undefined : "hidden",
        ...ttStyle,
      }}
      data-tip={dataTip}
    >
      <Image src={icon} alt="info" />
    </button>
  );
};

export default InfoIcon;
