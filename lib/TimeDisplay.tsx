import { useFormattedDate, epochToDateTime } from "./time";

export function TimeDisplay({ time }: { time: number }) {
  const date = useFormattedDate(time);
  const datetime = epochToDateTime(time);

  return <time dateTime={datetime}>{date}</time>;
}
