import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

const useDesktopMediaQuery = () => useMediaQuery({ query: "(min-width: 1167px)" });

const useTabletAndBelowMediaQuery = () => useMediaQuery({ query: "(max-width: 1166px)" });

const Desktop = ({ children }) => {
  const isDesktop = useDesktopMediaQuery();

  return isDesktop ? children : null;
};

const TabletAndBelow = ({ children }) => {
  const isTabletAndBelow = useTabletAndBelowMediaQuery();

  return isTabletAndBelow ? children : null;
};

function Arrow(props) {
  if (props.visible) {
    if (props.expand) {
      return (
        <span className="arrow-wrapper" onClick={props.clickHandle}>
          <img className="arrow" src="/static/up.svg" alt="arrow" />
        </span>
      );
    } else {
      return (
        <span className="arrow-wrapper" onClick={props.clickHandle}>
          <img className="arrow" src="/static/down.svg" alt="arrow" />
        </span>
      );
    }
  } else {
    return null;
  }
}

const SubChapter = (props) => {
  const { subChapter, currentType } = props;
  return (
    <li className={`nav-item-container-sub nav-${currentType}${subChapter.link == window.location.pathname ? ` active-${currentType}` : ""}`}>
      {subChapter.img ? <img src={subChapter.img} /> : null}
      <Link to={subChapter.link}>
        <p>{subChapter.name}</p>
      </Link>
    </li>
  );
};

const Chapter = (props) => {
  const { data, expand, currentType } = props;
  const [contentVisible, setContentVisible] = useState(data.sub !== undefined && expand);

  function toggleContentVisible() {
    setContentVisible(!contentVisible);
  }

  return (
    <li>
      <div className={`nav-item-container nav-${currentType}${data.link == window.location.pathname ? ` active-${currentType}` : ""}`}>
        {data.img ? <img src={data.img} /> : null}
        <Link to={data.link}>
          <p>{data.name}</p>
        </Link>
        {expand ? null : <Arrow visible={data.hasOwnProperty("sub")} expand={contentVisible} clickHandle={toggleContentVisible} />}
      </div>
      <ul>{contentVisible ? data.sub.map((subChapter) => <SubChapter key={subChapter.id} subChapter={subChapter} currentType={currentType} />) : ""}</ul>
    </li>
  );
};

const DesktopMenu = (props) => {
  const { currentType, currentKey, expand } = props;
  let navData = main_nav_bottom.first_line.concat(main_nav_bottom.second_line);
  return <ul className="nav-content">{navData.map((item) => (item.key == currentKey ? <Chapter key={item.id} data={item} expand={expand} currentType={currentType} /> : null))}</ul>;
};

const TabletAndBelowMenu = (props) => {
  const [contentVisible, setContentVisible] = useState(false);
  const { currentType, currentKey, currentName } = props;
  let navData = main_nav_bottom.first_line.concat(main_nav_bottom.second_line);

  const toggleContentVisible = () => {
    setContentVisible(!contentVisible);
  };

  const chapterTitle = () => {
    let chapter_title;
    if (!contentVisible) {
      navData.forEach((chapter) => {
        if (window.location.pathname == chapter.link) {
          chapter_title = chapter.name;
        }
        if (chapter.hasOwnProperty("sub")) {
          chapter.sub.forEach((sub_chapter) => {
            if (window.location.pathname == sub_chapter.link) {
              chapter_title = chapter.name + " / " + sub_chapter.name;
            }
          });
        }
      });
    }
    return chapter_title;
  };

  return (
    <>
      <div className="menu">
        <button type="button" className={"nav-title" + " active-" + currentType} onClick={toggleContentVisible}>
          <Arrow visible={true} expand={contentVisible} />
          <span>
            {contentVisible ? <span style={{ fontWeight: "bold" }}>{currentName}</span> : null}
            <span>{chapterTitle()}</span>
          </span>
        </button>
      </div>
      {contentVisible ? <DesktopMenu currentKey={currentKey} currentType={currentType} currentName={currentName}></DesktopMenu> : null}
    </>
  );
};

export const Navigate = () => {
  const [currentKey, setCurrentKey] = useState(null);
  const [currentType, setCurrentType] = useState(null);
  const [currentName, setCurrentName] = useState(null);
  const location = useLocation();

  useEffect(() => {
    let navData = main_nav_bottom.first_line.concat(main_nav_bottom.second_line);
    navData.forEach((element) => {
      element.link == location.pathname ? (setCurrentKey(element.key), setCurrentType(element.type), setCurrentName(element.name)) : null;
      element.sub !== undefined
        ? element.sub.forEach((subElement) => {
            subElement.link == location.pathname ? (setCurrentKey(subElement.key), setCurrentType(subElement.type), setCurrentName(subElement.name)) : null;
          })
        : null;
    });
    return () => {
      setCurrentKey(null);
      setCurrentType(null);
      setCurrentName(null);
    };
  });

  return (
    <div className="subnav-container">
      <div className="nav-bar">
        <div className={`nav-container left-line-${currentType}`}>
          <Desktop>
            <DesktopMenu currentKey={currentKey} currentType={currentType} expand={true}></DesktopMenu>
          </Desktop>
          <TabletAndBelow>
            <TabletAndBelowMenu currentKey={currentKey} currentType={currentType} currentName={currentName}></TabletAndBelowMenu>
          </TabletAndBelow>
        </div>
      </div>
    </div>
  );
};
