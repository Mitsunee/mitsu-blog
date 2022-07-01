import spacetime from "spacetime";
import { useState, useEffect } from "react";

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

export function useFormattedDate(epoch) {
  const [str, setStr] = useState(
    spacetime(epoch, "Europe/Berlin").format("nice-full-24")
  );

  useEffect(() => {
    if (typeof window == "undefined") return; // NO SSR
    setStr(spacetime(epoch).format("nice-full-24"));
  }, [epoch]);

  return str;
}

export function epochToDateTime(epoch) {
  return spacetime(epoch).format("iso-utc");
}
