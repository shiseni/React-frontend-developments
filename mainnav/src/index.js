import React from 'react';
import ReactDOM from 'react-dom';
import { useMediaQuery } from "react-responsive"

const DesktopAndAbove = ({ children }) => {
  const isDesktop = useMediaQuery({ query: "(min-width: 1301px)" })
  return isDesktop ? children : null
}

const TabletAndAbove = ({ children }) => {
  const isTablet = useMediaQuery({ query: "(min-width: 691px)" })
  return isTablet ? children : null
}

const Mobile = ({ children }) => {
  const isMobile = useMediaQuery({ query: "(max-width: 690px)" })
  return isMobile ? children : null
}

function footer(type, active_section) {
  if (type == "production") return <div className={`footer1-${active_section}`} />
  if (type == "service") return <div className={`footer2-${active_section}`} />
  if (type == "support") return <div className={`footer3-${active_section}`} />
  if (type == "wholesale") return <div className={`footer4-${active_section}`} />
}

function activeSection(props) {
  let active = '';
  let sections = props.first_line.concat(props.second_line);
  sections.forEach(element => {
    if (element.key == current_section) return active = element.type
  });
  return active;
}

const BottomSection = (props) => {
  let section = props.section;
  let active = '';
  if (current_section == section.key) active = "active-";
  return (
    <>
      {section.id == 1 ? null : <li className={active + "divider-" + section.type}></li>}
      <li className={active + "pskb-" + section.type + "-" + section.key}>
        <a href={section.link}>
          <span>{section.name.toUpperCase()}</span>
        </a>
        {footer(section.type, props.active_type)}
      </li>
    </>
  )
}

const Bottom = (props) => {
  let active_type = activeSection(props.data);
  return (
    <div className="psknav-buttom">
      <ul>
        {props.data.first_line.map(section => (
          <BottomSection key={section.id.toString()} section={section} active_type={active_type} />
        ))}
      </ul>
      <ul>
        {props.data.second_line.map(section => (
          <BottomSection key={section.id.toString()} section={section} active_type={active_type} />
        ))}
      </ul>
    </div>
  )
}

const HeaderSection = (props) => {
  return <div className={"pskh-" + props.type}>{props.name}</div>
}

class Header extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="psknav-header">
        {this.props.data.map(section => (
          <HeaderSection key={section.id.toString()} type={section.type} name={section.name} />
        ))}
      </div>
    )
  }
}

const MainNav = (props) => {
  return (
    <div className="psknav">
      <DesktopAndAbove><Header data={props.main_nav_header} /></DesktopAndAbove>
      <TabletAndAbove><Bottom data={props.main_nav_bottom} /></TabletAndAbove>
    </div>
  )
}

const ModalSection = (props) => {
  const { section, active_type } = props;
  let active = '';
  if (current_section == section.key) active = "active-";
  return (
    <li className={active + "pskb-" + section.type + "-" + section.key}>
      <a href={section.link}>
        <span>{section.name.toUpperCase()}</span>
      </a>
      {footer(section.type, active_type)}
    </li>
  )
}

class ModalNav extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillUnmount() {
    this.props.unmoant();
  }

  render() {
    if (this.props.show) {
      let sections = this.props.data.first_line.concat(this.props.data.second_line);
      let active_type = activeSection(this.props.data);
      return (
        <div className="modal">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-body">
                <ul id="mobile-mainnav-style">
                  {sections.map(section => (
                    <ModalSection key={section.id.toString()} section={section} active_type={active_type} />
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div style={{ touchAction: "none", flexGrow: "1" }} onClick={this.props.unmoant} />
        </div>
      )
    }
    return null
  }
}

class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
    };
  }

  toggleShowModal = () => {
    this.setState((prevState) => {
      return { showModal: !prevState.showModal };
    });
  }

  unMoant = () => {
    this.setState({ showModal: false });
  }

  render() {
    return (
      <Mobile>
        <div id="mobile_image">
          <button onClick={this.toggleShowModal}>
            <img src="/static/mobile_ico3.svg" />
          </button>
        </div>
        <ModalNav data={main_nav_bottom} show={this.state.showModal} unmoant={this.unMoant} />
      </Mobile>
    )
  }
}

const FooterSection = (props) => {
  let footer = []
  for (let i = 1; i < 5; i++) {
    footer.push(<div key={i} className={`pskf${i}-${props.active_type}`} />)
  }
  return footer
}


const Footer = (props) => {
  let active_type = activeSection(props.data)
  return (
    <DesktopAndAbove>
      <div className="nav_footer">
        <div style={{ "display": "flex" }}>
          <FooterSection active_type={active_type} />
        </div>
      </div>
    </DesktopAndAbove>
  )
}

ReactDOM.render(<MainNav main_nav_header={main_nav_header} main_nav_bottom={main_nav_bottom} />, document.querySelector("#mainnav"));
ReactDOM.render(<Modal data={main_nav_bottom} />, document.querySelector(".header-nav"));
ReactDOM.render(<Footer data={main_nav_bottom} />, document.querySelector("#navfooter"));