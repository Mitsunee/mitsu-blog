import { stylesheet } from "astroturf";

const styles = stylesheet`
  .loadingWrapper {
    text-align: center;
    font-size: 16px;
    color: primary;
    h1 {
      font-size: 3em;
      text-align: center;
      margin: 1em auto 1.5em;
    }
  }

  .spinner {
    margin: 0px auto;
    height: 5em;
    width: 5em;
    position: relative;
    animation-name: spinnerAnimation;
    animation-duration: 3s;
    animation-iteration-count: infinite;
    animation-timing-function: linear;

    &:after,&:before {
      content: '';
      position: absolute;
      top: 0px;
      left: 0px;
      width: 100%;
      height: 100%;
      border: 5px solid theme(colors.primary);
      border-radius: 50%;
      animation-name: spinnerAnimation;
      animation-duration: 2s;
      animation-iteration-count: infinite;
      animation-timing-function: ease-in-out;
    }

    &:after {
      clip-path: polygon(100% 0, 100% 50%, 0 50%, 0 0);
      animation-delay: -1s;
    }

    &:before {
      clip-path: polygon(0 0, 50% 0, 50% 100%, 0% 100%);
    }
  }

  @keyframes spinnerAnimation {
    0% {transform: rotate(0deg)}
    100% {transform: rotate(360deg)}
  }
`;

export default function Loading() {
  return (
    <div className={styles.loadingWrapper}>
      <h1>Loading</h1>
      <div className={styles.spinner}></div>
    </div>
  );
}
