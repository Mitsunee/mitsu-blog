import Link from "next/link";
import { useRouter } from "next/router";

import styles from "./NavItem.module.css";

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
