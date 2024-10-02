import React, { useState, useEffect, useRef } from "react";
import { useColorMode } from "@docusaurus/theme-common";

const GetFeedback = (props) => {
  const feedbackContRef = useRef();
  const { colorMode } = useColorMode();
  const [theme, setTheme] = useState();

  useEffect(() => {
    setTheme(colorMode);
  }, [colorMode]);

  useEffect(() => {
    setTheme(window?.localStorage?.getItem("theme") || colorMode);
    window.usabilla.load("w.usabilla.com", "3ab372ce5993");
  }, []);

  return (
    <div className="getfeedback-container">
      {/*Light*/}
      <div
        ub-in-page="66fbd0c790845616a838f8a9"
        className={theme === "dark" ? "getfeedback-hidden" : undefined}
        ref={feedbackContRef}
      />
      {/*Dark*/}
      <div
        ub-in-page="66fd14d8a1d073225e4ca10f"
        className={theme === "light" ? "getfeedback-hidden" : undefined}
        ref={feedbackContRef}
      />
    </div>
  );
};

export default GetFeedback;