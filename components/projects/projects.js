import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";
import MediaQuery from "react-responsive";
import Button from "@mui/material/Button";

function mediaContent(source, size) {
  let param = false;
  let wrapper_class = "media-content";
  let type = source.split(".").pop();
  if (size == "full") {
    wrapper_class = wrapper_class + "-modal";
    param = true;
  }
  if (type == "jpg" || type == "png" || type == "gif") {
    return <img className={wrapper_class} src={source} />;
  } else if (type == "mp4" || type == "avi" || type == "wmv") {
    return (
      <video className={wrapper_class} autoPlay={param} muted loop={param}>
        <source src={source} type='video/mp4; codecs="avc1.42E01E, mp4a.40.2"' />
      </video>
    );
  }
}

const Preview = (props) => {
  const { project, isOpen, show_modal } = props;
  let media_content = mediaContent(`./static/preview/${project.logo}`, "full");
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="modal-preview">
      <div className="modal-background" onClick={() => show_modal(false)} />
      <div className="modal-wrapper">
        <h2>{project.name}</h2>
        <button className="media-content-button close-button" onClick={() => show_modal(false)}>
          X
        </button>
        <div className="media-content-wrapper">
          <div className="media-content-" style={{ display: "flex" }}>
            <div style={{ display: "contents" }}>{media_content}</div>
            <div>
              <div className="description" style={{ width: "300px", padding: "5px", maxHeight: "460px", overflow: "auto", background: "#e5e5e5", margin: "0 10px" }}>
                {project.description}
              </div>
              <div className="media-content-button open-project-button" style={{ margin: "20px auto", textAlign: "center" }}>
                <Button variant="contained" color="primary" sx={{ backgroundColor: "#00b294" }}>
                  <Link to={project.link}>Open</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

const PreviewButton = (props) => {
  const { visible, show_modal } = props;

  if (!visible) return null;
  return (
    <Button variant="contained" color="primary" sx={{ backgroundColor: "#00b294" }} className="preview-button" onClick={() => show_modal(true)}>
      Preview
    </Button>
  );
};

const Project = (props) => {
  const [buttonVisible, setButtonVisible] = useState(false);
  const [isShowModal, setShowModal] = useState(false);
  const { project } = props;
  let media_content = mediaContent(`./static/preview/${project.logo}`, "preview");

  function showModal(value) {
    setShowModal(value);
  }

  return (
    <>
      <div className="cd-item" onMouseEnter={() => setButtonVisible(true)} onMouseLeave={() => setButtonVisible(false)}>
        <div className="table-wrapper">
          {media_content}
          <div className="table-name-wrapper">
            <Button variant="contained" sx={{ backgroundColor: "#00b294" }}>
              <Link to={project.link}>{project.name}</Link>
            </Button>
          </div>
        </div>
        <MediaQuery minWidth={1166}>
          <PreviewButton visible={buttonVisible} show_modal={showModal}></PreviewButton>
        </MediaQuery>
      </div>
      <MediaQuery minWidth={1166}>
        <Preview project={project} isOpen={isShowModal} show_modal={showModal} />
      </MediaQuery>
    </>
  );
};

export const Projects = (props) => {
  const { setShowNavigation, setStylePath } = props;
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    setStylePath("../../static/css/projects.css");
    setShowNavigation(false);
    let sections = main_nav_bottom.first_line.concat(main_nav_bottom.second_line);
    sections.forEach((element) => {
      element.name == "Projects" ? setProjects(element.sub) : null;
    });
  }, []);

  return (
    <div className="group-flex">
      {projects.map((project) => (
        <Project key={project.id} project={project} />
      ))}
    </div>
  );
};
