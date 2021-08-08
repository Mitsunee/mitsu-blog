import { useState } from "react";
import { stylesheet } from "astroturf";

import { useInView } from "@utils/hooks/useInView";
import { useThemeBreakpoint } from "@utils/hooks/useThemeBreakpoint";
import { navRoutes } from "@utils/routes";
import NavItem from "@components/NavItem";
import MobileNav from "@components/MobileNav";
import { IconHamburger } from "@components/icons";

const styles = stylesheet`
  .nav {
    display: flex;
    flex-direction: row;
    align-items: center;
    position: sticky;
    top: -1px;
    z-index: 1000;
    height: 50px;
    padding: 0px 20px;
    color: primary;
    background-color: background-black;
    backdrop-filter: blur(5px);
    box-shadow: 0px 3px 12px 4px #121212CC;
    user-select: none;
    font-family: title;
  }

  .logoWrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  }

  .logo {
    display: block;
    margin: 0px [15px, 20px, 40px, 40px] 0px 0px;
    width: 200px;
    max-width: 25vw;
    height: auto;
    transition: width 0.25s ease-in-out, opacity 0.25s ease-in-out;

    &.logoHidden {
      width: 0px;
      opacity: 0;
    }
  }

  .itemsWrapper {
    display: flex;
    flex-direction: row;
    flex-grow: 1;
    height: 100%;
    margin: 0;
    padding: 0;
  }

  .spacer {
    flex-grow: 1;
    height: 100%;
  }

  .hamburger {
    height: 32px;
    width: 32px;
    fill: white;
    cursor: pointer;

    &:hover {
      fill: #bbb;
    }
    &:focus {
      /* remove this block if there's a good way to blur on press */
    }
  }
`;

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
