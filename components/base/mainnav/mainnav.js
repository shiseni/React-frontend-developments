import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { DesktopAndAbove, TabletAndAbove } from "./type_of_screen";
import { MainNavButton, MainNavLine, MainNavFooter, MainNavHeader } from "../../constants";

const BottomSection = (props) => {
  const { section, currentKey, currentType } = props;
  return (
    <>
      {section.id !== 0 ? <MainNavLine type={section.key == currentKey ? section.type : null} /> : null}
      <MainNavButton type={section.key == currentKey ? section.type : null}>
        <Link to={section.link}>
          <span>{section.name.toUpperCase()}</span>
        </Link>
        <MainNavFooter type={section.type === currentType ? section.type : null} />
      </MainNavButton>
    </>
  );
};

const Bottom = (props) => {
  const { main_nav_bottom, currentKey, currentType } = props;
  return (
    <div className="mainnav-bottom">
      <ul>
        {main_nav_bottom.first_line.map((section) => (
          <BottomSection key={section.id.toString()} section={section} currentKey={currentKey} currentType={currentType} />
        ))}
      </ul>
      <ul>
        {main_nav_bottom.second_line.map((section) => (
          <BottomSection key={section.id.toString()} section={section} currentKey={currentKey} currentType={currentType} />
        ))}
      </ul>
    </div>
  );
};

const Upper = (props) => {
  const { main_nav_header, currentType } = props;
  return (
    <div className="mainnav-header">
      {main_nav_header.map((section) => (
        <MainNavHeader type={section.type === currentType ? section.type : null}>{section.name}</MainNavHeader>
      ))}
    </div>
  );
};

export const MainNav = () => {
  const [currentKey, setCurrentKey] = useState(null);
  const [currentType, setCurrentType] = useState(null);
  const location = useLocation();

  useEffect(() => {
    let sections = main_nav_bottom.first_line.concat(main_nav_bottom.second_line);
    sections.forEach((element) => {
      element.link == location.pathname ? (setCurrentKey(element.key), setCurrentType(element.type)) : null;
      element.sub !== undefined
        ? element.sub.forEach((subElement) => {
            subElement.link == location.pathname ? (setCurrentKey(subElement.key), setCurrentType(subElement.type)) : null;
          })
        : null;
    });
    return () => {
      setCurrentKey(null);
      setCurrentType(null);
    };
  });

  return (
    <div className="bw-doc" id="mainnav">
      <div className="mainnav">
        <DesktopAndAbove>
          <Upper main_nav_header={main_nav_header} currentKey={currentKey} currentType={currentType} />
        </DesktopAndAbove>
        <TabletAndAbove>
          <Bottom main_nav_bottom={main_nav_bottom} currentKey={currentKey} currentType={currentType} />
        </TabletAndAbove>
      </div>
    </div>
  );
};
