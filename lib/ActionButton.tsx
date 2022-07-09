import cc from "classcat";
import { CSSProperties, MouseEventHandler, PropsWithChildren } from "react";
import styles from "./ActionButton.module.css";

interface PropsBase {
  className?: string;
  onClick?: MouseEventHandler<HTMLElement>;
  style?: CSSProperties & { "--hover": string };
  disabled?: boolean;
}
interface PropsNoIcon extends PropsBase {
  // This is probably a dumb hack, but it sure beats a type error lol
  icon?: undefined;
  mode?: undefined;
  title?: undefined;
}
interface PropsWithIcon extends PropsBase {
  icon: string;
  mode?: "img" | "mask";
  title: string;
}
type ActionButtonProps = PropsWithChildren<PropsNoIcon | PropsWithIcon>;
type IconMaskStyle = CSSProperties & { "--bg": string };

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
      <div className={styles.inner}>
        {icon &&
          (mode == "mask" ? (
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
          ))}
        <span>{children}</span>
      </div>
    </button>
  );
}
