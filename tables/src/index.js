import React from 'react';
import ReactDOM from 'react-dom';
import MediaQuery from 'react-responsive'

function mediaContent(source, size) {
  let param = false;
  let wrapper_class = "media-content";
  let type = source.split('.').pop();
  if (size == "full") {
    wrapper_class = wrapper_class + "-modal";
    param = true;
  }
  if (type == "jpg" || type == "png" || type == "gif") {
    return <img className={wrapper_class} src={source} />
  } else if (type == "mp4" || type == "avi" || type == "wmv") {
    return (
      <video className={wrapper_class} autoPlay={param} muted loop={param}>
        <source src={source} type='video/mp4; codecs="avc1.42E01E, mp4a.40.2"' />
      </video>
    )
  }
}

class Preview extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (!this.props.isOpen) return null;

    let table = this.props.table;
    let media_content = mediaContent(table.src_big, "full");
    return ReactDOM.createPortal(
      <div className="modal-preview">
        <div className="modal-background" onClick={() => this.props.show_modal(false)} />
        <div className="modal-wrapper">
          <h2>{table.name}</h2>
          <button className="close-button" onClick={() => this.props.show_modal(false)}>X</button>
          <div className="media-content-wrapper">
            <div style={{ display: "flex" }}>
              <div style={{ display: "contents" }}>{media_content}</div>
              <div>
                <div className='description' style={{ width: "300px", padding: "5px", maxHeight: "460px", overflow: "auto", background: "#e5e5e5", margin: "0 10px" }}>{table.info}</div>
                <div style={{ margin: "20px auto", textAlign: "center" }}>
                  <a href={table.link} style={{ color: "black", padding: "10px 15px", background: "#c6cace", borderRadius: "3px" }}>
                    Подробнее
                  </a>
                </div>
              </div>
            </div>
            <div style={{ background: "#dddddd", height: "70px", width: "100%", padding: "5px", borderRadius: "3px" }}>чонить здесь, но я не знаю что</div>
          </div>
        </div>
      </div>,
      document.body
    );
  }
}

class Button extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (!this.props.visible) return null;
    return <button className="preview-button" onClick={() => this.props.show_modal(true)}>Быстрый просмотр</button>
  }
}

class Desk extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      buttonVisible: false,
      showModal: false,
    }
  }

  enableButton = () => {
    this.setState({ buttonVisible: true });
  }

  disableButton = () => {
    this.setState({ buttonVisible: false });
  }

  showModal = (value) => {
    this.setState({ showModal: value });
  }

  render() {
    let table = this.props.table;
    let media_content = mediaContent(table.src, "preview");
    return (
      <>
        <div className="cd-item" onMouseEnter={this.enableButton} onMouseLeave={this.disableButton}>
          <div className='table-wrapper'>
            {media_content}
            <div className="table-name-wrapper">
              <span>{table.name}</span>
            </div>
          </div>
          <MediaQuery minWidth={1166}><Button visible={this.state.buttonVisible} show_modal={this.showModal}></Button></MediaQuery>
        </div>
        <MediaQuery minWidth={1166}><Preview table={table} isOpen={this.state.showModal} show_modal={this.showModal} /></MediaQuery>
      </>
    )
  }
}

class Table extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="margin-site">
        <div className="group-flex">
          {this.props.data.map(table => (
            <Desk key={table.id} table={table} />
          ))}
        </div>
      </div>
    )
  }
}

ReactDOM.render(<Table data={table_data} />, document.querySelector(".col-xs-9"));