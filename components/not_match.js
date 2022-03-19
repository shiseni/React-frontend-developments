import React, { useEffect } from "react";

export const NoMatch = (props) => {
  const { setShowNavigation, setStylePath } = props;

  useEffect(() => {
    setShowNavigation(false);
    setStylePath(null);
  }, []);

  return <h1>Page not match, Sowwy *~*</h1>;
};
