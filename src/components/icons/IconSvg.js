import { stylesheet } from "astroturf";

const styles = stylesheet`
  .icon {
    display: flex;
    justify-content: center;
    align-items: center;
    svg {
      width: auto;
      height: 100%;
    }
  }
`;

export default function IconSvg({ children, href, className, viewBox }) {
  const hrefExternal = href?.startsWith("http");

  if (href)
    return hrefExternal ? (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={className ? `${styles.icon} ${className}` : styles.icon}>
        <svg xmlns="https://www.w3.org/2000/svg" viewBox={viewBox}>
          {children}
        </svg>
      </a>
    ) : (
      <a
        href={href}
        className={className ? `${styles.icon} ${className}` : styles.icon}>
        <svg xmlns="https://www.w3.org/2000/svg" viewBox={viewBox}>
          {children}
        </svg>
      </a>
    );

  return (
    <div className={className ? `${styles.icon} ${className}` : styles.icon}>
      <svg xmlns="https://www.w3.org/2000/svg" viewBox={viewBox}>
        {children}
      </svg>
    </div>
  );
}
