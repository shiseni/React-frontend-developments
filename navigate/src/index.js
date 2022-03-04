import React from 'react';
import ReactDOM from 'react-dom';
import { useMediaQuery } from "react-responsive"

const useDesktopMediaQuery = () =>
  useMediaQuery({ query: "(min-width: 1167px)" })

const useTabletAndBelowMediaQuery = () =>
  useMediaQuery({ query: "(max-width: 1166px)" })

const Desktop = ({ children }) => {
  const isDesktop = useDesktopMediaQuery()

  return isDesktop ? children : null
}

const TabletAndBelow = ({ children }) => {
  const isTabletAndBelow = useTabletAndBelowMediaQuery()

  return isTabletAndBelow ? children : null
}

function Arrow(props) {
  if (props.visible) {
    if (props.expand) {
      return <span className="arrow-wrapper" onClick={props.clickHandle} ><img className="arrow" src="/static/up.svg" alt="arrow"/></span>
    } else {
      return <span className="arrow-wrapper" onClick={props.clickHandle} ><img className="arrow" src="/static/down.svg" alt="arrow"/></span>
    }
  } else {
    return null
  }
}

class Chapter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      contentVisible: (props.data.sub !== undefined) && props.expand
    };
    this.toggleContentVisible = this.toggleContentVisible.bind(this);
  }
  
  toggleContentVisible() {
    if (this.props.data.sub !== undefined) {
      this.setState((prevState) => {
        return { contentVisible: !prevState.contentVisible };
      });
    }
  }

  activeChapter(chapter_link) {
    let section = this.props.section;
    if (chapter_link == section.current_link) {
      return " nav-" + section.type + " active-" + section.type;
    } else {
      return " nav-" + section.type;
    }
  }

  renderSub(item) {
    if (this.state.contentVisible) {
      return (
        item.sub.map(sub_chapter => (
        <li key = {sub_chapter.id.toString()} className={"nav-item-container-sub" + this.activeChapter(sub_chapter.link)}>
          <a href={sub_chapter.link}>
            { sub_chapter.img? <img src={sub_chapter.img} />: null }
            <p>{sub_chapter.name}</p>
          </a>
        </li>
        ))
      )
    }
  }
  
  render() {
      return (
        <li>
          <div className={"nav-item-container" + this.activeChapter(this.props.data.link)}>
            <a href={this.props.data.link}>
              { this.props.data.img? <img src={this.props.data.img} />: null }
              <p>{this.props.data.name}</p>
            </a>
            {this.props.expand ? null: <Arrow visible={this.props.data.hasOwnProperty("sub")} expand={this.state.contentVisible} clickHandle={this.toggleContentVisible}/>}
          </div>
          <ul>
            {this.renderSub(this.props.data)}
          </ul>
        </li>
      )
  }
}


const DesktopMenu = (props) => {
  return (
      <ul className="nav-content">
        {props.data.map(item => (
          <Chapter key={ item.id } data={item} expand = {props.expand} section={props.section} />
        ))}
      </ul>
 );
}

class TabletAndBelowMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      contentVisible: false,
    };
    this.toggleContentVisible = this.toggleContentVisible.bind(this);
  }

  toggleContentVisible() {
    this.setState((prevState) => {
      return { contentVisible: !prevState.contentVisible };
    });
  }
  
  chapterTitle() {
    let chapter_title;
    if (!this.state.contentVisible) {
      let current_link = this.props.section.current_link;

      this.props.data.forEach(chapter => {
        if (current_link == chapter.link) {
          chapter_title = " / " + chapter.name;
        }
        if (chapter.hasOwnProperty("sub")) {
          chapter.sub.forEach(sub_chapter => {
            if (current_link == sub_chapter.link) {
              chapter_title = " / " + chapter.name + " / " + sub_chapter.name;
            }
          })
        }
      })
    }
    return chapter_title;
  }

  render() {
    const menu_title = <div className="menu">
        <button type="button" className={"nav-title" + " active-" + this.props.section.type} onClick={this.toggleContentVisible}>
        <Arrow visible={true} expand={this.state.contentVisible}/>
          <span>
            <span style={{ 'fontWeight': 'bold' }}>{this.props.section.name}</span><span >{this.chapterTitle() }</span>
          </span>
        </button>
      </div>;
    return (
      <>
        {menu_title}
        { this.state.contentVisible ? <DesktopMenu data = {this.props.data} section = {this.props.section} ></DesktopMenu> : null }
      </>
    );
  }
}

const TypeOfScreen = (props) => {
  return (
    <div>
    <div className={"nav-container" + " left-line-" + props.section.type}>
      <Desktop><DesktopMenu data = {props.data} section = {props.section} expand={true}></DesktopMenu></Desktop>
      <TabletAndBelow><TabletAndBelowMenu data = {props.data} section = {props.section}></TabletAndBelowMenu></TabletAndBelow>
    </div>
    </div>
  )
}

ReactDOM.render(<TypeOfScreen data = {window.navigation_data} section = {window.section}/>, document.querySelector(".nav-bar"));
