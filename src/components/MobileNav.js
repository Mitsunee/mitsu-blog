import { stylesheet } from "astroturf";

import { navRoutes } from "@utils/routes";
import NavItem from "@components/NavItem";

const styles = stylesheet`
  .nav {
    padding: 0px 18px;
    width: 100%;
    color: primary;
    background-color: background-black;
    backdrop-filter: blur(5px);
    box-shadow: 0px 3px 12px 4px #121212CC;
    font-family: title;
    border: 1px solid transparent;

    animation-name: slideDown;
    animation-timing-function: ease-in-out;
    animation-duration: 250ms;
    transform-origin: left top;
    overflow: hidden;
  }

  @keyframes slideDown {
    0% {
      transform: scaleY(0);
    }
    100% {
      transform: scaleY(1);
    }
  }

  .navItemsWrapper {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    min-height: calc(100vh - 50px);
    margin: 0px;
    padding: 0px;

    & > li {
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 0px !important;
      max-width: 100%;
      width: 100%;
      max-height: 4em;
      & > a {
        width: 100%;
        height: 100%;
      }
    }
  }
`;

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
