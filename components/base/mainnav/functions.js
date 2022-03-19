import React from "react";

export function footer(type, active_section) {
  if (type == "production") return <div className={`footer1-${active_section}`} />;
  if (type == "service") return <div className={`footer2-${active_section}`} />;
  if (type == "support") return <div className={`footer3-${active_section}`} />;
  if (type == "wholesale") return <div className={`footer4-${active_section}`} />;
}
