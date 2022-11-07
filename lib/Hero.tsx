import webIconUrl from "iconoir/icons/internet.svg";
import githubIconUrl from "iconoir/icons/github.svg";
import npmIconUrl from "iconoir/icons/npm.svg";
import twitterIconUrl from "iconoir/icons/twitter.svg";
import youtubeIconUrl from "iconoir/icons/youtube.svg";
import discordIconUrl from "iconoir/icons/discord.svg";
// TEMP: waiting for iconoir to have a proper mastodon icon
import mastodonIconUrl from "iconoir/icons/chat-bubble-check.svg";
import { Section } from "./Section";
import { SocialsBar, SocialsBarItem } from "./SocialsBar";
import styles from "./Hero.module.css";

const logoUrl = "/assets/logo.svg";
const steamIconUrl = "/assets/icons/steam.svg";

export function Hero({ description }: { description: string }) {
  return (
    <>
      <Section>
        <img src={logoUrl} alt="Mitsunee" className={styles.logo} />
        <p>{description}</p>
      </Section>
      <SocialsBar>
        <SocialsBarItem
          src={webIconUrl}
          title="Website"
          href="https://www.mitsunee.com"
        />
        <SocialsBarItem
          src={githubIconUrl}
          title="Github"
          href="https://github.com/Mitsunee"
        />
        <SocialsBarItem
          src={npmIconUrl}
          title="npm"
          href="https://www.npmjs.com/~mitsunee"
        />
        <SocialsBarItem
          src={mastodonIconUrl}
          hover="#6364FF"
          title="Mastodon"
          href="https://ieji.de/@mitsunee"
          rel="me"
        />
        <SocialsBarItem
          src={twitterIconUrl}
          hover="#1DA1F2"
          title="Twitter"
          href="https://twitter.com/Mitsunee"
        />
        <SocialsBarItem
          src={youtubeIconUrl}
          hover="red"
          title="YouTube"
          href="https://www.youtube.com/channel/UC0Yut3Dj47oaVMTlL_NM6IA"
        />
        <SocialsBarItem
          src={discordIconUrl}
          hover="#5865F2"
          title="Discord Server"
          href="https://discord.gg/ZncPkjw"
        />
        <SocialsBarItem
          src={steamIconUrl}
          title="Steam"
          href="https://steamcommunity.com/id/mitsunee/"
        />
      </SocialsBar>
    </>
  );
}
