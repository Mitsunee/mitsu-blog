import cc from "classcat";
import iconLeft from "iconoir/icons/nav-arrow-left.svg";
import iconRight from "iconoir/icons/nav-arrow-right.svg";
import { clamp } from "@foxkit/util/clamp";
import { MouseEvent, PropsWithChildren } from "react";

import { ActionButton } from "./ActionButton";
import styles from "./Pagination.module.css";

interface PaginationProps {
  page: number;
  length: number;
  setPage: (n: number) => void;
  className?: string;
}

export function Pagination({
  page,
  length,
  setPage,
  className
}: PaginationProps) {
  if (length < 2) return null;

  const handleSetPage = (n: number, e: MouseEvent<HTMLElement>) => {
    e.preventDefault();
    e.currentTarget.blur();
    setPage(clamp({ min: 1, value: n, max: length }));
  };

  const Wrapper = ({ children }: PropsWithChildren) => (
    <div className={cc([styles.wrapper, className])}>
      <ActionButton
        onClick={e => handleSetPage(page - 1, e)}
        icon={iconLeft.src as string}
        mode="mask"
        title="Previous Page"
        disabled={page <= 1}
      />
      {children}
      <ActionButton
        onClick={e => handleSetPage(page + 1, e)}
        icon={iconRight.src as string}
        mode="mask"
        title="Next Page"
        disabled={page >= length}
      />
    </div>
  );

  const PageButton = ({ toPage }: { toPage: number }) => (
    <ActionButton
      onClick={e => handleSetPage(toPage, e)}
      className={toPage == page ? styles.btnCurr : ""}>
      {toPage}
    </ActionButton>
  );

  return length < 8 ? (
    <Wrapper>
      {Array.from({ length }, (_, idx: number) => (
        <PageButton key={idx + 1} toPage={idx + 1} />
      ))}
    </Wrapper>
  ) : (
    <Wrapper>
      <PageButton toPage={1} />
      {page > 3 && <ActionButton className={styles.btnBlank}>…</ActionButton>}
      {[
        clamp({ min: 2, value: page - 1, max: length - 3 }),
        clamp({ min: 3, value: page, max: length - 2 }),
        clamp({ min: 4, value: page + 1, max: length - 1 })
      ].map(n => (
        <PageButton key={n} toPage={n} />
      ))}
      {page < length - 2 && (
        <ActionButton className={styles.btnBlank}>…</ActionButton>
      )}
      <PageButton toPage={length} />
    </Wrapper>
  );
}
