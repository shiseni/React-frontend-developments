import React, { useState } from "react";
import { footer, activeSection } from "./functions";
import { Mobile } from "./type_of_screen";

const ModalSection = (props) => {
  const { section, active_type } = props;
  let active = "";
  if (current_section == section.key) active = "active-";
  return (
    <li className={active + "pskb-" + section.type + "-" + section.key}>
      <a href={section.link}>
        <span>{section.name.toUpperCase()}</span>
      </a>
      {footer(section.type, active_type)}
    </li>
  );
};

const ModalNav = (props) => {
  const { data, show, unmoant } = props;

  if (show) {
    let sections = data.first_line.concat(data.second_line);
    return (
      <div className="modal">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-body">
              <ul id="mobile-mainnav-style">
                {sections.map((section) => (
                  <ModalSection key={section.id.toString()} section={section} active_type={activeSection(data)} />
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div style={{ touchAction: "none", flexGrow: "1" }} onClick={unmoant} />
      </div>
    );
  }
  return null;
};

export const Modal = () => {
  const [showModal, setShowModal] = useState(false);

  const toggleShowModal = () => {
    setShowModal(!showModal);
  };

  const unMoant = () => {
    setShowModal(false);
  };

  return (
    <Mobile>
      <div id="mobile_image">
        <button onClick={toggleShowModal}>
          <img src="/static/mobile_ico3.svg" />
        </button>
      </div>
      <ModalNav data={main_nav_bottom} show={showModal} unmoant={unMoant} />
    </Mobile>
  );
};
