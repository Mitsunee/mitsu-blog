import { stylesheet } from "astroturf";

//import { useThemeBreakpoint } from "@utils/hooks/useThemeBreakpoint";
import { useFooterFixed } from "@utils/hooks/useFooterFixed";
import { IconGithub, IconTwitter } from "@components/icons";

const styles = stylesheet`
  .footer {
    display: flex;
    flex-direction: [column, column, row];
    justify-content: space-between;
    align-items: center;
    grid-gap: 1.5rem;
    width: 100%;
    height: 50px;
    margin-top: 1.5rem;
    padding: [1.5rem, 1.5rem, 0px] 20px 0px;
    color: primary;
    background-color: #10101075;
    backdrop-filter: blur(5px);
    box-shadow: 0px -3px 12px 4px #121212CC;
    user-select: none;
    font-family: sans;

    &.fixed {
      position: fixed;
      bottom: 0px;
      left: 0px;
      right: 0px;
    }
  }

  .socials {
    display: flex;
    flex-direction: row;
    grid-gap: 1em;
  }

  .socialIcon {
    width: 1.5em;
    height: 1.5em;
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
`;

export default function Footer() {
  //const [currentBreakpoint, breakpoints] = useThemeBreakpoint();
  const footerFixed = useFooterFixed();

  return (
    <footer
      className={
        footerFixed ? `${styles.footer} ${styles.fixed}` : styles.footer
      }>
      <div>© {new Date().getUTCFullYear()} Mitsunee</div>
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
      <div className={styles.footerSpacer} />
    </footer>
  );
}