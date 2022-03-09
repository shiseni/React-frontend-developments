import React from "react";
import { footer, activeSection } from "./functions";
import { DesktopAndAbove, TabletAndAbove } from "./type_of_screen";

const BottomSection = (props) => {
  const { section, active_type } = props;
  let active = "";
  if (current_section == section.key) active = "active-";
  return (
    <>
      {section.id == 1 ? null : <li className={active + "divider-" + section.type}></li>}
      <li className={active + "pskb-" + section.type + "-" + section.key}>
        <a href={section.link}>
          <span>{section.name.toUpperCase()}</span>
        </a>
        {footer(section.type, active_type)}
      </li>
    </>
  );
};

const Bottom = (props) => {
  const { data } = props;
  return (
    <div className="psknav-buttom">
      <ul>
        {data.first_line.map((section) => (
          <BottomSection key={section.id.toString()} section={section} active_type={activeSection(data)} />
        ))}
      </ul>
      <ul>
        {data.second_line.map((section) => (
          <BottomSection key={section.id.toString()} section={section} active_type={activeSection(data)} />
        ))}
      </ul>
    </div>
  );
};

const Header = (props) => {
  const { data } = props;
  return (
    <div className="psknav-header">
      {data.map((section) => (
        <div className={"pskh-" + section.type}>{section.name}</div>
      ))}
    </div>
  );
};

export const MainNav = (props) => {
  return (
    <div className="psknav">
      <DesktopAndAbove>
        <Header data={props.main_nav_header} />
      </DesktopAndAbove>
      <TabletAndAbove>
        <Bottom data={props.main_nav_bottom} />
      </TabletAndAbove>
    </div>
  );
};
