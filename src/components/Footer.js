import { stylesheet } from "astroturf";
import Link from "next/link";

import { useThemeBreakpoint } from "@utils/hooks/useThemeBreakpoint";
import { useFooterFixed } from "@utils/hooks/useFooterFixed";
import { footerRoutes } from "@utils/routes";
import { IconGithub, IconTwitter } from "@components/icons";

const styles = stylesheet`
  .footer {
    display: flex;
    flex-direction: [column, row];
    justify-content: space-between;
    align-items: center;
    grid-gap: 1.5rem;
    width: 100%;
    height: [unset, 50px];
    margin-top: 1.5rem;
    padding: [1.5rem, 0px] 20px;
    color: primary;
    background-color: background-black;
    backdrop-filter: blur(5px);
    box-shadow: 0px -3px 12px 4px #121212CC;
    user-select: none;
    font-family: title;

    &.fixed {
      position: fixed;
      bottom: 0px;
      left: 0px;
      right: 0px;
    }
  }

  .socials, .links {
    display: flex;
    flex-direction: row;
    grid-gap: 1em;
  }

  .socialIcon {
    width: 1.5em;
    height: 1.5em;
    transition: fill 250ms ease-in-out;
  }

  .iconGithub {
    fill: white;
    &:hover {
      fill: #bbb;
    }
  }

  .iconTwitter {
    fill: white;
    &:hover {
      fill: #009ef7;
    }
  }

  .footerSpacer {
    flex-grow: 1;
    height: 100%;
  }

  .links > a {
    color: primary;
    font-weight: 700;
    text-decoration: none;
    transition: all 250ms ease-in-out;

    &:hover {
      color: accent;
      text-decoration: underline;
    }
  }
`;

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
