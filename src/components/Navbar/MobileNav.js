import styles from "./MobileNav.module.css";
import { navRoutes } from "@utils/routes";
import NavItem from "./NavItem";

export default function MobileNav({ open = false }) {
  return open ? (
    <nav className={styles.nav}>
      <ul className={styles.navItemsWrapper}>
        {navRoutes.map(navRoute => (
          <NavItem key={navRoute.name} route={navRoute} />
        ))}
      </ul>
    </nav>
  ) : (
    <></>
  );
}
