import React from "react";

export function footer(type, active_section) {
  if (type == "category") return <div className={`footer1-${active_section}`} />;
  if (type == "projects") return <div className={`footer2-${active_section}`} />;
}
