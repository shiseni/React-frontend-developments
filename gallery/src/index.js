import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "../../static/css/gallery.css";

const DevMode = true;

const Photo = (props) => {
  let photo = props.photo;
  return (
    <div className="gallery">
      <a href="#">
        <div className="gallery-regular-thumb">
          <LazyLoadImage
            alt={photo.name}
            className="gallery"
            height={"100%"}
            width={"100%"}
            effect="blur"
            key={photo.id}
            src={`/static/images/${photo.name}`}
            placeholderSrc={"../static/bg_grd.png"}
            threshold={100}
            title={photo.desc}
          />
          <p>
            <span style={{ float: `right` }}>{photo.desc}</span>
          </p>
        </div>
      </a>
    </div>
  );
};

const Gallery = () => {
  const [photos, setPhotos] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadError, setLoadError] = useState(false);

  const fetching = () => {
    let api = "/url_api";
    DevMode ? (api = "/static/images/photos.json") : null;
    fetch(api)
      .then((res) => res.json())
      .then(
        (result) => {
          DevMode ? console.log(`Dev mode\nTest photos: `, result) : null;
          setPhotos(result);
          setIsLoaded(true);
          setLoadError(false);
        },
        (error) => {
          console.log("Error:\n", error);
          setPhotos([]);
          setIsLoaded(false);
          setLoadError(true);
        }
      );
  };

  useEffect(() => {
    fetching();
  }, []);

  const galleryContent = () => {
    if (loadError) return <span>Error</span>;
    if (!isLoaded) return <span>Gallery loading</span>;
    return (
      <>
        {photos.map((photo) => (
          <Photo key={photo.id} photo={photo} />
        ))}
      </>
    );
  };

  return (
    <>
      <div className={`gallery-scroll${loadError || !isLoaded ? " empty" : ""}`}>{galleryContent()}</div>
    </>
  );
};

ReactDOM.render(<Gallery />, document.querySelector(".col-xs-9"));
