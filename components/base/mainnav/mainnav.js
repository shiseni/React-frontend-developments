import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { footer } from "./functions";
import { DesktopAndAbove, TabletAndAbove } from "./type_of_screen";

const BottomSection = (props) => {
  const { section, currentKey, currentType } = props;
  let active = "";
  section.key == currentKey ? (active = "active-") : null;
  return (
    <>
      {section.id !== 1 ? <li className={active + "divider-" + section.type}></li> : null}
      <li className={active + "mainnav-" + section.type + "-" + section.key}>
        <Link to={section.link}>
          <span>{section.name.toUpperCase()}</span>
        </Link>
        {footer(section.type, currentType)}
      </li>
    </>
  );
};

const Bottom = (props) => {
  const { main_nav_bottom, currentKey, currentType } = props;
  return (
    <div className="psknav-buttom">
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
  const { main_nav_header } = props;
  return (
    <div className="psknav-header">
      {main_nav_header.map((section) => (
        <div key={section.id} className={"pskh-" + section.type}>
          {section.name}
        </div>
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
      <div className="psknav">
        <DesktopAndAbove>
          <Upper main_nav_header={main_nav_header} />
        </DesktopAndAbove>
        <TabletAndAbove>
          <Bottom main_nav_bottom={main_nav_bottom} currentKey={currentKey} currentType={currentType} />
        </TabletAndAbove>
      </div>
    </div>
  );
};
