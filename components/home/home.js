import React, { useEffect } from "react";

export const Home = (props) => {
  const { setShowNavigation, setStylePath } = props;

  useEffect(() => {
    setStylePath("../../static/css/home.css");
    setShowNavigation(false);
  }, []);

  return (
    <div>
      <span className="greetings">
        <h1 color="promary">Hello, my name is SHISEN.</h1>
      </span>
      <p className="subtitle">Welcome to my website!</p>
    </div>
  );
};
