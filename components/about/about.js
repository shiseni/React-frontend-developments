import React, { useEffect } from "react";

export const About = (props) => {
  const { setShowNavigation } = props;

  useEffect(() => {
    setShowNavigation(false);
  }, []);

  return <h1>About Page</h1>;
};
