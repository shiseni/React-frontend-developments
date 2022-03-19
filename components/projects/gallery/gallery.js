import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";

const DevMode = true;

const Photo = (props) => {
  let photo = props.photo;
  return (
    <div className="gallery">
      <Link to={`photos/${photo.id}`}>
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
      </Link>
    </div>
  );
};

export const Gallery = (props) => {
  const [photos, setPhotos] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadError, setLoadError] = useState(false);
  const { setShowNavigation, setStylePath } = props;

  const fetching = () => {
    let api = "/url_api";
    DevMode ? (api = "/static/images/photos.json") : null;
    fetch(api)
      .then((res) => res.json())
      .then(
        (result) => {
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
    setStylePath("../../static/css/gallery.css");
    fetching();
    setShowNavigation(true);
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
