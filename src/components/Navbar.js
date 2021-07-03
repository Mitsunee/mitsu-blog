import { stylesheet } from "astroturf";
import { useRouter } from "next/router";

import { useInView } from "@utils/hooks/useInView";
import { useThemeBreakpoint } from "@utils/hooks/useThemeBreakpoint";

const styles = stylesheet`
  .nav {
    display: flex;
    flex-direction: row;
    align-items: center;
    position: sticky;
    top: -1px;
    height: 50px;
    z-index: 1000;
    color: primary;
    background-color: #121212F0;
    box-shadow: 0px 3px 12px 4px #121212CC;
    user-select: none;
  }

  .logoWrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;

  }

  .logo {
    display: block;
    margin: 0px [5px, 10px, 15px, 20px];
    width: 100%;
    max-width: 25vw;
    height: auto;
    transition: width 0.25s ease-in-out;
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
      {
        // DEBUG
        `${currentBreakpoint > breakpoints[1] ? "desktop" : "mobile"} ${
          router.asPath
        }`
      }
    </nav>
  );
}
