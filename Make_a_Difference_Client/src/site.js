// Canonical site URL — used by Helmet canonical/OG tags across pages.
export const SITE_URL = "https://make-a-difference-90f54.web.app";

export const canonicalFor = (pathname = "/") => {
  const path = pathname.startsWith("/") ? pathname : `/${pathname}`;
  return `${SITE_URL}${path === "/" ? "" : path}`;
};
