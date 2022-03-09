import React from "react";
import { activeSection } from "./functions";
import { DesktopAndAbove } from "./type_of_screen";

const FooterSection = (props) => {
  let footer = [];
  for (let i = 1; i < 5; i++) {
    footer.push(<div key={i} className={`pskf${i}-${props.active_type}`} />);
  }
  return footer;
};

export const Footer = (props) => {
  return (
    <DesktopAndAbove>
      <div className="nav_footer">
        <div style={{ display: "flex" }}>
          <FooterSection active_type={activeSection(props.data)} />
        </div>
      </div>
    </DesktopAndAbove>
  );
};
