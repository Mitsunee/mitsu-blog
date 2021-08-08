import { useState } from "react";

import styles from "./Navbar.module.css";
import { useInView } from "@utils/hooks/useInView";
import { useThemeBreakpoint } from "@utils/hooks/useThemeBreakpoint";
import { navRoutes } from "@utils/routes";
import NavItem from "./NavItem";
import MobileNav from "./MobileNav";
import IconHamburger from "@components/icons/IconHamburger";

export default function Navbar({ headerRef }) {
  const hideLogo = useInView(headerRef, true);
  const [currentBreakpoint, breakpoints] = useThemeBreakpoint();
  const [openNav, setOpenNav] = useState(false);

  const isMobile =
    openNav || currentBreakpoint <= breakpoints[hideLogo ? 1 : 2];

  const handleHamburgerPress = () => {
    setOpenNav(state => {
      if (state) {
        // restore scroll and close nav
        document.body.style.overflow = "";
        return false;
      }

      // lock scrolling
      document.body.style.overflow = "hidden";

      // scroll past header
      const navPos = Math.ceil(window.innerHeight * 0.075) + 1;
      if (navPos > document.documentElement.scrollTop) {
        setTimeout(
          () => window.scrollTo({ top: navPos, behaviour: "smooth" }),
          1
        );
      }

      // open nav
      return true;
    });
  };

  return (
    <>
      <nav className={styles.nav}>
        <div className={styles.logoWrapper}>
          <img
            src="/assets/logo3.png"
            alt="Mitsunee"
            className={
              hideLogo ? `${styles.logo} ${styles.logoHidden}` : styles.logo
            }
          />
        </div>
        {!isMobile ? (
          <ul className={styles.itemsWrapper}>
            {navRoutes.map(navRoute => (
              <NavItem key={navRoute.name} route={navRoute} />
            ))}
          </ul>
        ) : (
          <>
            <div className={styles.spacer} />
            <IconHamburger
              className={styles.hamburger}
              onClick={handleHamburgerPress}
              open={openNav}
            />
          </>
        )}
      </nav>
      {isMobile && <MobileNav open={openNav} />}
    </>
  );
}
