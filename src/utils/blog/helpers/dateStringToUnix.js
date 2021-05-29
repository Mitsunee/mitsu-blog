import dateStringRegex from "./dateString.regex";

export default function dateStringToUnix(dateString) {
  const res = dateString.match(dateStringRegex);

  // error check
  if (res === null || !res.groups) return false;

  const match = res.groups;

  // date
  const day = +match.day;
  const monthIndex = +match.month - 1;
  const year = +match.year;

  // optional time
  const timezone = match.hour != null ? +match.timezone : null;
  const hour = match.hour != null ? +match.hour - timezone : null;
  const minute = match.hour != null ? +match.minute : null;

  if (hour === null) {
    return { date: Date.UTC(year, monthIndex, day), hasTime: false };
  }
  return { date: Date.UTC(year, monthIndex, day, hour, minute), hasTime: true };
}
