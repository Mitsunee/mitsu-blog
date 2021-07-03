import { useRef } from "react";
import { stylesheet } from "astroturf";

import Navbar from "@components/Navbar";

const styles = stylesheet`
  .wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    z-index: 1001;
    width: 100%;
    height: 7.5vh;
    padding: 0.75vh [15px, 20px, 40px, 40px];
    background-color: accent;
    background-image:
      radial-gradient(circle at center left, theme(colors.accent-yellow), transparent 33%),
      radial-gradient(circle at center right, theme(colors.accent-pink), transparent 33%);
    box-shadow: 0px 3px 12px 4px #121212CC;
    user-select: none;
  }

  .logoWrapper {
    height: 100%;
    position: relative;
  }

  .logo {
    display: block;
    position: relative;
    z-index: 2;
    width: auto;
    max-width: 90%;
    height: 100%;
  }

  .logoShadow {
    display: block;
    position: absolute;
    top: 0;
    z-index: 1;
    width: auto;
    max-width: 90%;
    height: 100%;
    filter: blur(3px) brightness(0.45);
  }
`;

export default function Header() {
  const headerRef = useRef(null);

  return (
    <>
      <header className={styles.wrapper} ref={headerRef}>
        <div className={styles.logoWrapper}>
          <img src="/assets/logo3.png" alt="Mitsunee" className={styles.logo} />
          <img
            src="/assets/logo3.png"
            alt="Mitsunee"
            className={styles.logoShadow}
          />
        </div>
      </header>
      <Navbar headerRef={headerRef} />
    </>
  );
}