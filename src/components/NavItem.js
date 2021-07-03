import Link from "next/link";
import { stylesheet } from "astroturf";

const styles = stylesheet`
  .navItem {
    flex-grow: 1;
    max-width: 250px;
    border-bottom: 3px solid transparent;
    list-style: none;

    a {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 100%;
      text-decoration: none;
      font-weight: 700;
    }

    &:not(:last-of-type) {
      margin-right: 8px;
    }

    &:not(.current) {
      a {
        color: primary;
      }
      &:hover {
        a {
          color: accent-pink;
        }
        border-color: accent-pink;
        cursor: pointer;
      }
    }

    &.current {
      a {
        color: accent;
      }
      border-color: theme(colors.accent);
    }
  }
`;

export default function NavItem({ name, path, isCurrentRoute = false }) {
  return (
    <li
      className={`${styles.navItem}${
        isCurrentRoute ? " " + styles.current : ""
      }`}>
      <Link href={path}>
        <a>{name}</a>
      </Link>
    </li>
  );
}
