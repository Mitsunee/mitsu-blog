import spacetime from "spacetime";

export default function PostDate({ date, hasTime, className }) {
  const time = hasTime ? spacetime(date) : spacetime(date, "utc");
  const dateTime = hasTime ? time.format("iso") : time.format("iso-short");
  const timeText = hasTime
    ? time.format(
        "{day}, {month} {date-ordinal} {year}, {hour-24}:{minute-pad}"
      )
    : time.format("{day}, {month} {date-ordinal} {year}");
  return (
    <time dateTime={dateTime} className={className}>
      {timeText}
    </time>
  );
}
