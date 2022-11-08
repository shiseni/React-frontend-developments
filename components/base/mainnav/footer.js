import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { DesktopAndAbove } from "./type_of_screen";
import { FooterLine } from "../../constants";

const FooterSection = (props) => {
  const { section, currentType } = props;
  return <FooterLine type={section.type === currentType ? section.type : null} />;
};

export const Footer = () => {
  const [currentType, setCurrentType] = useState(null);
  const location = useLocation();

  useEffect(() => {
    let sections = main_nav_bottom.first_line.concat(main_nav_bottom.second_line);
    sections.forEach((element) => {
      element.link == location.pathname ? setCurrentType(element.type) : null;
      element.sub !== undefined
        ? element.sub.forEach((subElement) => {
            subElement.link == location.pathname ? setCurrentType(subElement.type) : null;
          })
        : null;
    });
    return () => {
      setCurrentType(null);
    };
  });
  return (
    <DesktopAndAbove>
      <div className="bw-doc" id="nav-footer">
        <div className="nav-footer" style={{ display: "flex" }}>
          {main_nav_header.map((section) => {
            return <FooterSection section={section} currentType={currentType} />;
          })}
        </div>
      </div>
    </DesktopAndAbove>
  );
};
