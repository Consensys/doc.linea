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
        ub-in-page="66fd19777582bd0f0b3f8314"
        className={theme === "dark" ? "getfeedback-hidden" : undefined}
        ref={feedbackContRef}
      />
      {/*Dark*/}
      <div
        ub-in-page="66fd1931467c23680b03167d"
        className={theme === "light" ? "getfeedback-hidden" : undefined}
        ref={feedbackContRef}
      />
    </div>
  );
};

export default GetFeedback;