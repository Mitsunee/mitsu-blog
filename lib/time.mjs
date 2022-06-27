import spacetime from "spacetime";

export function padTimezone(str) {
  // match input
  const match = str.match(
    /^UTC(?<sign>\+|-)(?<hours>\d{1,2})(?::(?<minutes>\d{2}))?$/i
  );
  if (!match) throw new Error();

  // extract params
  const { sign, hours } = match.groups;
  const minutes = match.groups.minutes || "00";

  return `${sign}${hours}:${minutes}`;
}

export function dateToEpoch(str) {
  try {
    // match input
    const match = str.match(
      /^(?<date>\d{4}-\d{2}-\d{2}) (?<time>\d{2}:\d{2}) (?<timezone>UTC(?:\+|-)\d{1,2}(?::\d{2})?)$/i
    );
    if (!match) throw new Error();

    // extract params
    const { date, time } = match.groups;
    const timezone = padTimezone(match.groups.timezone);

    return spacetime(`${date}T${time}:00${timezone}`).epoch;
  } catch {
    throw new Error(`Couldn't parse Date '${str}'`);
  }
}
