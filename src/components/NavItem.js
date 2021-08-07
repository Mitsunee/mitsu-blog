import Link from "next/link";
import { stylesheet } from "astroturf";
import { useRouter } from "next/router";

const styles = stylesheet`
  .navItem {
    flex-grow: 1;
    max-width: 250px;
    border-bottom: 3px solid transparent;
    list-style: none;
    transition: border-color 250ms ease-in-out;

    a {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 100%;
      text-decoration: none;
      font-weight: 700;
      transition: color 250ms ease-in-out;
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

export default function NavItem({ route }) {
  const router = useRouter();
  const { path, name, test } = route;
  const isCurrentRoute = test.test(router.asPath);

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
