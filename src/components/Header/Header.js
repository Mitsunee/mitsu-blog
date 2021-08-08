import { useRef } from "react";

import styles from "./Header.module.css";
import Navbar from "@components/Navbar/Navbar";

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
