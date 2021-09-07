// this file is specifically for the navbar routes
// NextJS will automatically make routes for all files in ./pages

export const navRoutes = [
  {
    name: "Home",
    path: "/",
    test: /^\/$/
  },
  {
    name: "Projects",
    path: "/projects/",
    test: /^\/projects\/$/
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

export const footerRoutes = [
  { name: "Contact", path: "/contact/" },
  { name: "Credits", path: "/credits/" }
];
