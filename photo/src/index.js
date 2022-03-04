import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import { Navigation, Keyboard, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { LazyLoadImage } from "react-lazy-load-image-component";

import "swiper/css";
import "swiper/css/navigation";

/*const getTestPhotos = () => { 
  let num;
  let array_images = [];
  for (let i = 1; i < 221; i++) {
    num = i;
    for (let k = 0; k < 2; k++)
      if (i.toString().length < 3)
        i = "0" + i;
    array_images.push({
      id: num,
      name: `poisk_company_${i}.jpg`,
      desc: `Placeholder ${num}`,
      size: {
        width: 1280,
        height: 960
      }
    })
  }
  return array_images;
}*/

const Description = (props) => {
  const { descriptionVisible, ShowDescription, HideDescription, description } = props;
  return (
    <div className="description">
      <div className={`desc${descriptionVisible ? " visible" : " hidden"}`} onClick={HideDescription} onMouseLeave={HideDescription}>
        {description}
      </div>
      <div className={`info-button${descriptionVisible ? " hidden" : " visible"}`} onMouseEnter={ShowDescription}>
        <img src="/static/photo/info.png" />
      </div>
    </div>
  );
};

const Photo = (props) => {
  const [descriptionVisible, switchdescriptionVisible] = useState(false);
  let photo = props.photo;
  let photo_name;
  let extension = photo.name.split(".").pop();

  extension !== "jpg" ? (photo_name = photo.name + ".jpg") : (photo_name = photo.name);

  return (
    <>
      <LazyLoadImage
        key={photo.id}
        alt={props.isActive ? photo.desc : null}
        title={props.isActive ? photo.desc : null}
        height="100%"
        width="100%"
        effect="blur"
        src={path_album + `${photo_name}`}
        placeholderSrc="/static/loading.svg"
        style={{ maxWidth: photo.size.width }}
      />
      {props.isActive ? (
        <Description
          descriptionVisible={descriptionVisible}
          ShowDescription={() => switchdescriptionVisible(true)}
          HideDescription={() => switchdescriptionVisible(false)}
          description={photo.desc}
        />
      ) : null}
    </>
  );
};

const Photos = (props) => {
  const { photos, currentPhotoIndex, changeCurrentIndex } = props;
  const [swiper, setSwiper] = useState(null);

  function ChangeActiveIndex() {
    let active;
    swiper?.activeIndex !== undefined ? (active = swiper?.activeIndex + 1) : (active = currentPhotoIndex);
    changeCurrentIndex(active);
  }

  const InitActiveIndex = () => {
    if (swiper?.isEnd) {
      let index = currentPhotoIndex - 1;
      document.title = `${index + 1}. Фотографии`;
      swiper.slideTo(index);
    }
  };

  return (
    <>
      <div className="close-button">
        <a href={url_close}>
          <img src="/static/photo/close.png" />
        </a>
      </div>
      <Swiper
        onSwiper={setSwiper}
        modules={[Navigation, Keyboard, Pagination]}
        onAfterInit={InitActiveIndex()}
        onSlideChangeTransitionEnd={ChangeActiveIndex}
        navigation={true}
        pagination={{ type: "fraction" }}
        keyboard={{ enabled: true }}
        grabCursor={true}
      >
        {photos.map((photo) => {
          return (
            <SwiperSlide key={photo.id}>
              {({ isPrev, isActive, isNext }) => {
                if (isPrev || isActive || isNext) return <Photo photo={photo} isActive={isActive} />;
              }}
            </SwiperSlide>
          );
        })}
      </Swiper>
    </>
  );
};

const PhotosWrapper = () => {
  const navigate = useNavigate();
  const [photos, setPhotos] = useState([]);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(photo_index);

  const fetching = () => {
    if (photos == "") {
      fetch(url_api)
        .then((res) => res.json())
        .then(
          (result) => {
            setPhotos(result);
          },
          (error) => {
            console.log(error);
            fetch("../../photo/src/photos.json") //comment this fetch before build
              .then((res) => res.json())
              .then((result) => {
                console.log(`Dev mode\nTest photos: `, result);
                setPhotos(result);
              });
          }
        );
    }
  };

  useEffect(() => {
    fetching();
  });

  const changeCurrentIndex = (currentNumPhoto) => {
    document.title = `${currentNumPhoto}. Фотографии`;
    setCurrentPhotoIndex(currentNumPhoto);
    //navigate(`/${section}/photo/${currentNumPhoto}.html`);
  };

  return (
    <div className="gallery-photo-block">
      <Routes>
        <Route
          path="/photo_gallery.html"
          element={<Photos photos={photos} currentPhotoIndex={currentPhotoIndex} changeCurrentIndex={changeCurrentIndex} />}
        />
        <Route
          path={`/${section}/photo/:${currentPhotoIndex}.html`}
          element={<Photos photos={photos} currentPhotoIndex={currentPhotoIndex} changeCurrentIndex={changeCurrentIndex} />}
        />
      </Routes>
    </div>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <PhotosWrapper />
    </BrowserRouter>
  </React.StrictMode>,
  document.querySelector(".gallery-photo-container")
);
