import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Navigation, Keyboard, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

function rgb2hsl(color) {
  let red = parseInt(color.substring(0, 2), 16) / 255,
    green = parseInt(color.substring(2, 4), 16) / 255,
    blue = parseInt(color.substring(4, 6), 16) / 255;
  let max = Math.max(red, green, blue),
    min = Math.min(red, green, blue);
  let hue,
    saturation,
    lightness = (max + min) / 2;
  if (max == min) hue = saturation = 0;
  else {
    let d = max - min;
    saturation = lightness > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case red:
        hue = (green - blue) / d + (green < blue ? 6 : 0);
        break;
      case green:
        hue = (blue - red) / d + 2;
        break;
      case blue:
        hue = (red - green) / d + 4;
        break;
    }
    hue /= 6;
  }
  return [hue, saturation, lightness];
}

function changeColor(color) {
  let HSL = rgb2hsl(color);
  let font_color;
  if ((HSL[0] < 0.55 && HSL[2] >= 0.5) || (HSL[0] >= 0.55 && HSL[2] >= 0.75)) font_color = "#000000";
  else font_color = "#FFFFFF";
  return font_color;
}

function CloseButton(color) {
  return (
    <svg width="35" height="35" viewBox="0 0 350 350" fill={color}>
      <path d="M165,0.008C74.019,0.008,0,74.024,0,164.999c0,90.977,74.019,164.992,165,164.992s165-74.015,165-164.992     C330,74.024,255.981,0.008,165,0.008z M165,299.992c-74.439,0-135-60.557-135-134.992S90.561,30.008,165,30.008     s135,60.557,135,134.991C300,239.436,239.439,299.992,165,299.992z" />
      <path d="M165,130.008c-8.284,0-15,6.716-15,15v99.983c0,8.284,6.716,15,15,15s15-6.716,15-15v-99.983     C180,136.725,173.284,130.008,165,130.008z" />
      <path d="M165,70.011c-3.95,0-7.811,1.6-10.61,4.39c-2.79,2.79-4.39,6.66-4.39,10.61s1.6,7.81,4.39,10.61     c2.79,2.79,6.66,4.39,10.61,4.39s7.81-1.6,10.609-4.39c2.79-2.8,4.391-6.66,4.391-10.61s-1.601-7.82-4.391-10.61     C172.81,71.61,168.95,70.011,165,70.011z" />
    </svg>
  );
}

function RemoveStyle(element, target) {
  document.querySelector(element).style.removeProperty(target);
}

function SwitchStyle(element, value, target) {
  document.querySelector(element).style[target] = value;
}

function FontColor(color) {
  let fontColor;
  fontColor = changeColor(color.substr(1));
  return fontColor;
}

const Description = (props) => {
  const { descriptionVisible, ShowDescription, HideDescription, description, accentColor, secondColor } = props;
  SwitchStyle(".swiper-pagination-progressbar-fill", secondColor, "background");
  SwitchStyle(".swiper-pagination", `0px 0px 40px 5px ${secondColor}`, "box-shadow");
  SwitchStyle(".swiper-pagination", accentColor, "background");
  SwitchStyle(".swiper-button-next", secondColor, "color");
  SwitchStyle(".swiper-button-prev", secondColor, "color");
  SwitchStyle("html", accentColor, "background");
  SwitchStyle(".bg", `0px 0px 100px 0px ${secondColor}`, "box-shadow");
  SwitchStyle("#mainnav", "none", "display");
  SwitchStyle("#brand_image a img", `drop-shadow(4px 4px 2px ${secondColor})`, "filter");

  return (
    <div className="description">
      <div className={`desc${descriptionVisible ? " visible" : " hidden"}`} onClick={HideDescription} onMouseLeave={HideDescription} style={{ background: secondColor }}>
        <p style={{ color: FontColor(secondColor) }}>{description}</p>
      </div>
      <div className={`info-button${!descriptionVisible ? " visible" : " hidden"}`} onMouseEnter={ShowDescription}>
        {CloseButton(secondColor)}
      </div>
    </div>
  );
};

const Photo = (props) => {
  let photo = props.photo;
  const [descriptionVisible, switchdescriptionVisible] = useState(false);
  const [accentColor] = useState(photo.accentColor.first);
  const [secondColor] = useState(photo.accentColor.second);

  return (
    <>
      <div className="close-button">
        <Link to="/projects/gallery">
          <img src="/static/close.svg" />
        </Link>
      </div>
      <LazyLoadImage
        key={photo.id}
        alt={props.isActive ? photo.desc : null}
        height="100%"
        width="100%"
        effect="blur"
        src={`/static/images/${photo.name}`}
        placeholderSrc="/static/loading.svg"
        style={{ maxWidth: 1920 }}
      />
      {props.isActive ? (
        <Description
          descriptionVisible={descriptionVisible}
          ShowDescription={() => switchdescriptionVisible(true)}
          HideDescription={() => switchdescriptionVisible(false)}
          description={photo.desc}
          accentColor={accentColor}
          secondColor={secondColor}
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

  useEffect(() => {
    if (swiper) {
      let index = currentPhotoIndex - 1;
      document.title = `${index + 1}. Gallery`;
      swiper.slideTo(index);
    }
  });

  return (
    <>
      <Swiper
        onSwiper={setSwiper}
        modules={[Navigation, Keyboard, Pagination]}
        onSlideChangeTransitionEnd={ChangeActiveIndex}
        navigation={true}
        pagination={{ type: "progressbar" }}
        keyboard={{ enabled: true }}
        grabCursor={true}
        resistanceRatio={0.7}
        rewind={true}
        speed={300}
        style={{ height: "100%" }}
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

export const PhotosWrapper = (props) => {
  const { id } = useParams();
  const [photos, setPhotos] = useState([]);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(id);
  const { setShowNavigation, setStylePath } = props;

  const fetching = () => {
    fetch("/static/images/photos.json")
      .then((res) => res.json())
      .then(
        (result) => {
          setPhotos(result);
        },
        (error) => {
          console.log("Error:\n", error);
        }
      );
  };

  useEffect(() => {
    setStylePath("../../../static/css/photo.css");
    fetching();
    setShowNavigation(false);
    return () => {
      RemoveStyle("html", "background");
      RemoveStyle("#mainnav", "display");
      RemoveStyle(".bg", "box-shadow");
      RemoveStyle("#brand_image a img", "filter");
    };
  }, []);

  const changeCurrentIndex = (currentNumPhoto) => {
    document.title = `${currentNumPhoto}. Gallery`;
    setCurrentPhotoIndex(currentNumPhoto);
  };

  return (
    <div className="gallery-photo-block" style={{ height: "100%" }}>
      <Photos photos={photos} currentPhotoIndex={currentPhotoIndex} changeCurrentIndex={changeCurrentIndex} />
    </div>
  );
};
