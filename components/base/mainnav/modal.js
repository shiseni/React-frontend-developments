import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { footer } from "./functions";
import { Mobile } from "./type_of_screen";
import ListOutlinedIcon from "@mui/icons-material/ListOutlined";

const ModalSection = (props) => {
  const { section, active_type, currentKey } = props;
  let active = "";
  if (currentKey == section.key) active = "active-";
  return (
    <li className={active + "pskb-" + section.type + "-" + section.key}>
      <Link to={section.link}>
        <span>{section.name.toUpperCase()}</span>
      </Link>
      {footer(section.type, active_type)}
    </li>
  );
};

const ModalNav = (props) => {
  const { sections, show, unmoant, currentKey } = props;

  if (show) {
    return (
      <div className="modal">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-body">
              <ul id="mobile-mainnav-style" onClick={unmoant}>
                {sections.map((section) => (
                  <ModalSection key={section.id.toString()} section={section} currentKey={currentKey} />
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
  const [currentKey, setCurrentKey] = useState(null);
  const location = useLocation();
  const sections = main_nav_bottom.first_line.concat(main_nav_bottom.second_line);

  useEffect(() => {
    sections.forEach((element) => {
      element.link == location.pathname ? setCurrentKey(element.key) : null;
    });
    return () => {
      setCurrentKey(null);
    };
  });

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
          <ListOutlinedIcon color="action" display="block" sx={{ fontSize: 48 }} />
        </button>
      </div>
      <ModalNav sections={sections} show={showModal} unmoant={unMoant} currentKey={currentKey} />
    </Mobile>
  );
};
