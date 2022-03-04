import React from 'react';
import ReactDOM from 'react-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';

const Photo = (props) => {
  let photo = props.photo;
  return (
    <div className="gallery">
      <a href={`${photo_link + photo.id}.html`}>
        <div className="gallery-regular-thumb">
          <LazyLoadImage
            alt={photo.name}
            className="gallery"
            height={"100%"}
            width={"100%"}
            effect="blur"
            key={photo.id}
            src={dir + photo.name}
            placeholderSrc={"../static/bg_grd.png"}
            threshold={100}
            title={photo.desc} />
          <p>
            <span style={{ float: `left` }}>{photo.id}.</span>
            <span style={{ float: `right` }}>{photo.size.width}x{photo.size.height}</span>
          </p>
        </div>
      </a>
    </div>
  )
}

class Filter extends React.Component {
  render() {
    const { filter, checked, onChange } = this.props;
    return (
      <label
        key={filter.id}
        htmlFor={filter.short}
        title={filter.title}>
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          id={filter.short} />
        {filter.full}</label>
    )
  }
}

class Filters extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      all: true
    }
    /*this.state = {
      all: true,
      ac: false,
      ps: false,
      md: false,
      ow: false,
      ms: false,
      vw: false,
      gs: false,
      ot: false,
      fn: false
    }*/
  }

  componentDidMount() {
    filters_data.map((filter) => {
      this.setState({
        [filter.short]: false
      })
    })
  }

  get_index(key) {
    let bin_string = '';
    if (key !== 'all') {
      for (let i = 0; i < filters_data.length; i++) {
        key = filters_data[i].short;
        if (this.state[key] == true)
          bin_string = '1' + bin_string
        else
          bin_string = '0' + bin_string
      }
      this.setState({ all: false });
    } else {
      bin_string = 0;
      for (let i = 0; i < filters_data.length; i++) {
        if (this.state.all == true) {
          bin_string = bin_string + '1';
        }
        key = filters_data[i].short;
        if (key !== 'all') {
          this.setState({ [key]: false });
        }
      }
    }

    return parseInt(bin_string, 2)
  }

  filtered_array(key) {
    this.state[key] = !this.state[key];
    //this.setState({ [key]: !this.state[key] });
    let enabled_index = this.get_index(key);
    this.props.fetch(enabled_index);
  }

  render() {
    return (
      <div className="panel-filter">
        <label htmlFor="all"><input
          type="checkbox"
          checked={this.state.all}
          onChange={() => this.filtered_array("all")}
          id="all" />Все</label>
        {filters_data.map((filter) => {
          return (
            <Filter
              key={filter.id}
              filter={filter}
              checked={this.state[filter.short]}
              onChange={() => this.filtered_array(filter.short)} />
          )
        })}
      </div>
    )
  }
}

class Gallery extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      photos: [],
      issetFilters: false,
      isLoaded: false,
      hasCategories: true,
      loadError: false
    }
  }

  fetch = (digit) => {
    if (digit !== 0) {
      if (!this.state.issetFilters) digit = '';
      fetch("../../photo/src/photos.json")
        .then((res) => res.json())
        .then((result) => {
          console.log(`Dev mode\nTest photos: `, result);
          this.setState({
            photos: result,
            isLoaded: true,
            hasCategories: true
          });
        }, (error) => {
          console.log(error);
          this.setState({
            isLoaded: false,
            loadError: true
          })
        })
    } else {
      this.setState({
        photos: [],
        hasCategories: false
      })
    }
  }

  componentDidMount() {
    //typeof filters_data !== 'undefined' ? this.setState({ issetFilters: true }) : '';
    typeof filters_data !== 'undefined' ? this.state.issetFilters = true : '';
    this.fetch(511);
  }

  galleryContent() {
    const { photos, isLoaded, hasCategories, loadError } = this.state;
    if (loadError) return <span>Произошла ошибка</span>
    if (!isLoaded) return <span>Галерея загружается</span>
    if (!hasCategories) return <span>Нет выбранных категорий</span>
    return (
      <>
        {photos.map((photo) =>
          <Photo key={photo.id} photo={photo} />
        )}
      </>
    )
  }

  render() {
    const { loadError, isLoaded, hasCategories, issetFilters } = this.state;
    return (
      <div className='gallery-content'>
        {issetFilters ? <Filters fetch={this.fetch} /> : ''}
        <div className={`gallery-scroll${!issetFilters ? ' without-filters' : ''}${loadError || !isLoaded || !hasCategories ? ' empty' : ''}`}>
          {this.galleryContent()}
        </div>
      </div>
    )
  }
}

ReactDOM.render(<Gallery />, document.querySelector(".gallery-block"));