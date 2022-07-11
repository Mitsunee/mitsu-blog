import { PropsWithChildren } from "react";
import { AutoLink } from "./AutoLink";
import { Headline } from "./Headline";

import styles from "./PostCard.module.css";
import { Section } from "./Section";
import { Tag, TagList } from "./Tags";
import { TimeDisplay } from "./TimeDisplay";

type PostCardListProps = PropsWithChildren<{
  title: string;
  pageInfo?: PostListInfo | false;
}>;
type PostCardProps = PostMeta & { tags: TagMap };

export function PostCardList({
  children,
  title,
  pageInfo = false
}: PostCardListProps) {
  return (
    <Section>
      <Headline>{title}</Headline>
      {pageInfo && (
        <p>
          {`Post ${pageInfo.current.from} - ${pageInfo.current.to} (of ${pageInfo.total.posts})`}
        </p>
      )}
      <div className={styles.grid}>{children}</div>
    </Section>
  );
}

// TODO: support meta images when implemented
export function PostCard(props: PostCardProps) {
  return (
    <article className={styles.card}>
      <h1>
        <AutoLink href={`/post/${props.slug}`}>{props.title}</AutoLink>
      </h1>
      {props.description.split("\n").map((text, i) => (
        <p key={`${props.slug}-${i}`}>{text}</p>
      ))}
      <TimeDisplay time={props.date} />
      <TagList>
        {Object.entries(props.tags).map(([slug, text]) => (
          <Tag slug={slug} key={slug} text={text} />
        ))}
      </TagList>
    </article>
  );
}
