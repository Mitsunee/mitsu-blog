import { stylesheet } from "astroturf";

const styles = stylesheet`
  .main {
    width: [98%, 95%, 90%];
    max-width: [450px, 600px, 800px, 1200px];
    margin: 1.5em auto 3em;
    padding: 2em;
    padding-bottom: 3em;
    color: primary;
    background-color: #10101075;
    backdrop-filter: blur(5px);
    box-shadow: 3px 3px 12px 4px #121212CC;
    color: primary;
    font-family: sans;
    font-size: 16px;
    line-height: normal;

    & :first-child {
      margin-top: 0px;
    }

    & :last-child {
      margin-bottom: 0px;
    }

    a {
      &:link,
      &:visited {
        color: inherit;
      }
      &:hover {
        color: accent;
      }
      &:active {
        color: accent-pink;
      }
    }

    p {
      font-size: inherit;
      line-height: 1.2em;
    }

    div[class="remark-highlight"] {
      width: 90%;
      margin: 1.5em auto;
    }
  }
`;

export default function MainContent({
  children,
  className = "",
  style = undefined
}) {
  return (
    <section
      className={className ? `${styles.main} ${className}` : styles.main}
      style={style}>
      {children}
    </section>
  );
}
