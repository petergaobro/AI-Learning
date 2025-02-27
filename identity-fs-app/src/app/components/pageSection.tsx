import type { ClassValue } from "clsx";
import type { ReactNode } from "react";

type PageSectionProps = {
  children?: ReactNode;
  className?: string;
  wrapperClassName?: string;
  bgImgClassName?: ClassValue;
};

const PageSection = ({
  children,
  className = "",
  wrapperClassName = "",
  bgImgClassName = "",
}: PageSectionProps) => {
  return (
    <div
      className={`w-full overflow-hidden ${wrapperClassName} ${bgImgClassName}`}
    >
      <div
        className={`m-auto w-[98%] md:my-2 md:w-full md:max-w-screen-lg ${className}`}
      >
        {children}
      </div>
    </div>
  );
};

export default PageSection;
