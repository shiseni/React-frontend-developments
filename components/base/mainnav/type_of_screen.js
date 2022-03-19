import { useMediaQuery } from "react-responsive";

export const DesktopAndAbove = ({ children }) => {
  const isDesktop = useMediaQuery({ query: "(min-width: 1301px)" });
  return isDesktop ? children : null;
};

export const TabletAndAbove = ({ children }) => {
  const isTablet = useMediaQuery({ query: "(min-width: 691px)" });
  return isTablet ? children : null;
};

export const Mobile = ({ children }) => {
  const isMobile = useMediaQuery({ query: "(max-width: 690px)" });
  return isMobile ? children : null;
};
