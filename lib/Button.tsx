import cc from "classcat";
import { CSSProperties, MouseEventHandler, PropsWithChildren } from "react";
import { AutoLink } from "./AutoLink";
import styles from "./Button.module.css";

interface PropsBase {
  className?: string | string[];
  style?: CSSProperties & { "--hover"?: string };
  disabled?: boolean;
}
interface ActionButtonBase extends PropsBase {
  onClick?: MouseEventHandler<HTMLElement>;
}
interface LinkButtonBase extends PropsBase {
  href: string;
  target?: "_blank";
}

interface NoIcon {
  // This is probably a dumb hack, but it sure beats a type error lol
  icon?: undefined;
  mode?: undefined;
  title?: undefined;
}
interface WithIcon {
  icon: string;
  mode?: "img" | "mask";
  title: string;
}

type ActionButtonProps = PropsWithChildren<
  (ActionButtonBase & NoIcon) | (ActionButtonBase & WithIcon)
>;
type LinkButtonProps = PropsWithChildren<
  (LinkButtonBase & NoIcon) | (LinkButtonBase & WithIcon)
>;

type IconMaskStyle = CSSProperties & { "--bg": string };

function ButtonIcon({ icon, title, mode }: WithIcon) {
  return mode == "mask" ? (
    <span
      className={styles.mask}
      style={{ "--bg": `url('${icon}')` } as IconMaskStyle}
      title={title}
      data-button-icon-type="mask"
    />
  ) : (
    <img
      src={icon}
      className={styles.img}
      alt={title}
      title={title}
      data-button-icon-type="img"
    />
  );
}

export function ActionButton({
  children,
  onClick,
  className,
  style,
  disabled = false,
  icon,
  title,
  mode
}: ActionButtonProps) {
  return (
    <button
      onClick={onClick}
      className={cc([styles.button, disabled && styles.disabled, className])}
      style={style}
      aria-disabled={disabled}>
      <span className={styles.inner}>
        {icon && <ButtonIcon icon={icon} mode={mode} title={title} />}
        {children && <span>{children}</span>}
      </span>
    </button>
  );
}

export function LinkButton({
  children,
  href,
  target,
  className,
  style,
  disabled = false,
  icon,
  title,
  mode
}: LinkButtonProps) {
  return (
    <AutoLink
      href={href}
      target={target}
      className={cc([
        styles.button,
        styles.link,
        disabled && styles.disabled,
        className
      ])}
      style={style}
      aria-disabled={disabled}>
      <span className={styles.inner}>
        {icon && <ButtonIcon icon={icon} mode={mode} title={title} />}
        {children && <span>{children}</span>}
      </span>
    </AutoLink>
  );
}
