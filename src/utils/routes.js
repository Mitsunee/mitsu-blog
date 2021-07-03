// this file is specifically for the navbar routes
// NextJS will automatically make routes for all files in ./pages

export default [
  {
    name: "Home",
    path: "/",
    test: /^\/$/
  },
  {
    name: "Blog",
    path: "/blog/",
    test: /^\/blog\/.*/
  },
  {
    name: "Speedruns",
    path: "/speedrun/",
    test: /^\/speedrun\/$/
  },
  {
    name: "Support Me",
    path: "/support/",
    test: /^\/support\/$/
  }
];
