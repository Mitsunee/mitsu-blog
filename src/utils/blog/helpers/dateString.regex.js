const dateStringRegex = /^(?<day>0?[1-9]|[1-2]\d|3[0-1])\.(?<month>0?[1-9]|[1][0-2])\.(?<year>19([7-9]\d)|20[\d]{2})(?: (?<hour>0?[\d]|1\d|2[0-3]):(?<minute>[0-5]\d) (?<timezone>-(?:12|(?:1[0-1]|0?\d)(?:\.[72]5|\.[50]0?)?)|\+(?:14|(?:1[0-3]|0?\d)(?:\.[72]5|\.[50]0?)?)))?$/;

export default dateStringRegex;

/***
readable version: (note the important spaces in the anonymous group wrapping
                   hour and minute as well as the one in front of the timezone
                   group (line 16 and 20))

/^
  (?<day>0?[1-9]|[1-2]\d|3[0-1])
  \.
  (?<month>0?[1-9]|[1][0-2])
  \.
  (?<year>19([7-9]\d)|20[\d]{2})
  (?: (?<hour>
    0?[\d]|1\d|2[0-3]
  ):(?<minute>
    [0-5]\d
  ) (?<timezone>
    -(?:12|(?:1[0-1]|0?\d)(?:\.[72]5|\.[50]0?)?)
    |\+(?:14|(?:1[0-3]|0?\d)(?:\.[72]5|\.[50]0?)?)
  ))?
$/

matches:
day 01 to 31 with optional leading zero
month 01 to 12 with optional leading zero
year 1970 to 2099 with no optional digits
optional time (default 00:00) with
  hour 00 to 23 with optional leading zero
  minute 00 to 59 with required leading zero
  timezone offset from -12 to +14 in steps of .25
    decimal offset is optional, integers gets matched
    offset of 0.00 may be specified as .0 as well (tho note the above)
    offset of 0.50 may be specified as .5 as well
like the german timeformat

Examples:
25.12.1995
29.05.2021 14:12 +02
3.11.2010 8:07 -3.75

***/
