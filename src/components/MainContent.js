import { stylesheet } from "astroturf";

const styles = stylesheet`
  .main {
    width: [95%, 95%, 90%];
    max-width: [450px, 600px, 800px, 1200px];
    margin: 1.5rem auto 3rem;
    padding-bottom: 3rem;
    color: primary;
    background: linear-gradient(to bottom, #28282875, #1B1B1B75);
    border: 1px solid black;
    border-radius: 0.5rem;
    backdrop-filter: blur(5px);
    box-shadow: 3px 3px 12px 4px #121212CC;
    color: primary;
    font-family: sans;
    font-size: 1rem;
    line-height: normal;

    p,
    h1, h2, h3,
    & > img, & figure > figcaption {
      margin-right: 2rem;
      margin-left: 2rem;
      margin-top: 0.75em;
      margin-bottom: 0.75em;
    }

    a {
      transition: color 250ms ease-in-out;

      &:link,
      &:visited {
        color: inherit;
      }

      &:hover, &:focus {
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

    h1, h2, h3 {
      font-family: title;
    }

    hr {
      margin: 1rem auto;
      height: 0px;
      width: 90%;
      border: 0px;
      border-bottom: 1px solid theme(colors.primary);
      opacity: 0.25;
    }

    figure, & > img, div[class="remark-highlight"] {
      width: 90%;
      margin: 1.5rem auto;
    }

    & > img, & figure > img {
      height: auto;
    }

    figure {
      display: flex;
      flex-direction: column;

      img {
        object-fit: contain;
        width: 100%;
      }

      figcaption {
        margin: 1.5rem 0px;
        font-size: 0.8em;
      }
    }

    ul, ol {
      margin: 0.75em 2rem;
      padding: 0px;

    }

    :not(li) > ul, :not(li) > ol {
      margin-left: 3rem;
    }

    li > ul, li > ol {
      margin: 0.1em 1.5em;
    }
  }
`;

export default function MainContent({
  children,
  className = "",
  style = undefined
}) {
  return (
    <main
      className={className ? `${styles.main} ${className}` : styles.main}
      style={style}>
      {children}
    </main>
  );
}
