import Link from "next/link";

import styles from "./Footer.module.css";
import { useThemeBreakpoint } from "@utils/hooks/useThemeBreakpoint";
import { useFooterFixed } from "@utils/hooks/useFooterFixed";
import { footerRoutes } from "@utils/routes";
import IconGithub from "@components/icons/IconGithub";
import IconTwitter from "@components/icons/IconTwitter";

export default function Footer() {
  const [currentBreakpoint, breakpoints] = useThemeBreakpoint();
  const footerFixed = useFooterFixed();

  return (
    <footer
      className={
        footerFixed ? `${styles.footer} ${styles.fixed}` : styles.footer
      }>
      <section>© {new Date().getUTCFullYear()} Mitsunee</section>
      <section className={styles.socials}>
        <IconTwitter
          href="https://twitter.com/Mitsunee"
          className={`${styles.socialIcon} ${styles.iconTwitter}`}
        />
        <IconGithub
          href="https://www.github.com/Mitsunee"
          className={`${styles.socialIcon} ${styles.iconGithub}`}
        />
      </section>
      {currentBreakpoint >= breakpoints[1] && (
        <div className={styles.footerSpacer} />
      )}
      <section className={styles.links}>
        {footerRoutes.map(({ name, path }) => (
          <Link key={name} href={path}>
            <a>{name}</a>
          </Link>
        ))}
      </section>
    </footer>
  );
}
