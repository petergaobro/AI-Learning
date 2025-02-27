import twcm from "../libs/twcm";
import type { Color } from "../utils/color";
import { textColor, colorise } from "../utils/color";
import type { LinkProps } from "next/link";
import Link from "next/link";
import type { ComponentPropsWithoutRef, HTMLProps, ReactNode } from "react";

export interface ButtonProps extends ComponentPropsWithoutRef<"button"> {
  color?: Color;
  inverse?: boolean;
  compact?: boolean;
  href?: string;
  linkProps?: HTMLProps<HTMLAnchorElement>;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
}

const Button = (props: ButtonProps) => {
  const {
    className = "",
    color = "primary",
    inverse = false,
    compact = false,
    href,
    children,
    linkProps = {},
    startIcon,
    endIcon,
    ...ButtonProps
  } = props;

  return (
    <LinkWrapper href={href} linkProps={linkProps}>
      <button
        className={twcm(
          "inline-flex border-collapse items-stretch border-2 p-0 text-sm",
          "disabled:cursor-not-allowed disabled:opacity-50",
          [colorise("border", color)],
          [compact ? "font-regular" : "font-semibold"],
          [!inverse && colorise("bg", color)],
          [!inverse && textColor(color)],
          [inverse && `bg-white ${colorise("text", color)}`],
          className
        )}
        {...ButtonProps}
      >
        {startIcon && (
          <div
            className={twcm(
              "flex w-12 flex-col items-center justify-center pr-px",
              [inverse && colorise("bg", color)]
            )}
          >
            {startIcon}
          </div>
        )}
        <div
          className={twcm([
            compact ? "my-auto py-px px-2" : "my-auto py-3 px-5",
          ])}
        >
          {children}
        </div>
        {endIcon && (
          <div
            className={twcm(
              "flex w-12 flex-col items-center justify-center pl-px",
              [inverse && colorise("bg", color)]
            )}
          >
            {endIcon}
          </div>
        )}
      </button>
    </LinkWrapper>
  );
};

const LinkWrapper = (props: ButtonProps) => {
  const { href, linkProps, children } = props;
  const nextLinkProps = linkProps as Omit<
    React.AnchorHTMLAttributes<HTMLAnchorElement>,
    keyof LinkProps
  > &
    LinkProps;

  if (href)
    return (
      <Link {...nextLinkProps} href={href}>
        {children}
      </Link>
    );
  return children as JSX.Element;
};

export default Button;
