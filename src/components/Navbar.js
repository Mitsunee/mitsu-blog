import { stylesheet } from "astroturf";
import { useRouter } from "next/router";

import { useInView } from "@utils/hooks/useInView";
import { useThemeBreakpoint } from "@utils/hooks/useThemeBreakpoint";
import { navRoutes } from "@utils/routes";
import NavItem from "@components/NavItem";

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
    background-color: #10101075;
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
    width: 100%;
    max-width: 25vw;
    height: auto;
    transition: width 0.25s ease-in-out;
  }

  .navItemsWrapper {
    display: flex;
    flex-direction: row;
    flex-grow: 1;
    height: 100%;
    margin: 0;
    padding: 0;
  }

  .navSpacer {
    flex-grow: 1;
    height: 100%;
  }
`;

export default function Navbar({ headerRef }) {
  const router = useRouter();
  const hideLogo = useInView(headerRef, true);
  const [currentBreakpoint, breakpoints] = useThemeBreakpoint();

  return (
    <nav className={styles.nav}>
      <div className={styles.logoWrapper}>
        <img
          src="/assets/logo3.png"
          alt="Mitsunee"
          className={styles.logo}
          style={{
            width: hideLogo ? "0px" : "200px",
            margin: hideLogo ? 0 : ""
          }}
        />
      </div>
      {currentBreakpoint > breakpoints[hideLogo ? 1 : 2] ? (
        <ul className={styles.navItemsWrapper}>
          {navRoutes.map(({ name, path, test }) => (
            <NavItem
              key={name}
              name={name}
              path={path}
              isCurrentRoute={test.test(router.asPath)}
            />
          ))}
        </ul>
      ) : (
        <>
          <div className={styles.navSpacer} />
          <button>PLACEHOLDER BUTTON</button>
        </>
      )}
    </nav>
  );
}
