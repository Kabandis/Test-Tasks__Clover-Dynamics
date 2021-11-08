import "./App.scss";
import React, { useState } from "react";

import { Filter } from "./Filter";
import pic1 from "./assets/img/1.jpg"
import pic2 from "./assets/img/2.jpg"
import pic3 from "./assets/img/3.jpg"
import errorIcon from "./assets/img/error.png"

function App() {
  const [rover, setRover] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [resp, setResp] = useState(null);
  const [numberPhotoShow, setNumberPhotoShow] = useState(1);

  const curiosityValue = [
    {
      value: "fhaz",
      label: "Front Hazard Avoidance Camera",
    },
    {
      value: "rhaz",
      label: "Rear Hazard Avoidance Camera",
    },
    {
      value: "mast",
      label: "Mast Camera",
    },
    {
      value: "chemcam",
      label: "Chemistry and Camera Complex",
    },
    {
      value: "mahli",
      label: "Mars Hand Lens Imager",
    },
    {
      value: "mardi",
      label: "Mars Descent Imager",
    },
    {
      value: "navcam",
      label: "Navigation Camera",
    },
  ];

  const opportunityValue = [
    {
      value: "fhaz",
      label: "Front Hazard Avoidance Camera",
    },
    {
      value: "rhaz",
      label: "Rear Hazard Avoidance Camera",
    },
    {
      value: "navcam",
      label: "Navigation Camera",
    },
    {
      value: "pancam",
      label: "Panoramic Camera",
    },
    {
      value: "minites",
      label: "Miniature Thermal Emission Spectrometer (Mini-TES)",
    },
  ];

  const spiritValue = [
    {
      value: "fhaz",
      label: "Front Hazard Avoidance Camera",
    },
    {
      value: "rhaz",
      label: "Rear Hazard Avoidance Camera",
    },
    {
      value: "navcam",
      label: "Navigation Camera",
    },
    {
      value: "pancam",
      label: "Panoramic Camera",
    },
    {
      value: "minites",
      label: "Miniature Thermal Emission Spectrometer (Mini-TES)",
    },
  ];

  const roverHadler = (roverName) => {
    setRover(roverName);
    setResp(null);
  };

  return (
    <div className="app">
      <div className="button_block">
        <img 
          className={rover === "curiosity" ? "image_color button_block__item" : "image_nocolor button_block__item"} 
          src={pic1}
          alt="curiosity" 
          onClick={() => roverHadler("curiosity")}
        />
        <img 
          className={rover === "opportunity" ? "image_color button_block__item" : "image_nocolor button_block__item"}
          src={pic2}
          alt="opportunity"
          onClick={() => roverHadler("opportunity")}
        />
        <img 
          className={rover === "spirit" ? "image_color button_block__item" : "image_nocolor button_block__item"}
          src={pic3}
          alt="spirit"
          onClick={() => roverHadler("spirit")}
        />
      </div>
      <div className="select_block">
        {!rover && <span className="select_block__header">Choose your rover and explore Mars</span>}
        {rover === "curiosity" && (
          <Filter
            cameraValue={curiosityValue}
            setResp={setResp}
            setIsLoading={setIsLoading}
            rover={rover}
          />
        )}
        {rover === "opportunity" && (
          <Filter
            cameraValue={opportunityValue}
            setResp={setResp}
            setIsLoading={setIsLoading}
            rover={rover}
          />
        )}
        {rover === "spirit" && (
          <Filter
            cameraValue={spiritValue}
            setResp={setResp}
            setIsLoading={setIsLoading}
            rover={rover}
          />
        )}
      </div>
      <div className="photo_block">
        {resp?.photos?.length && !isLoading ? (
          resp.photos.map((photoItem, index) => {
            if (index <= numberPhotoShow - 1) {
              return <img className="photo" src={photoItem?.img_src} key={photoItem.id} alt="Rover" />;
            }
            return null
          })
        ) : rover && (
          <div className="photo_error">
            <img className="photo_error__icon"src={errorIcon} alt="error_icon" />
            <span className="photo_error__text">No photos found. Please try another options</span>
          </div>
        )}
        {!!resp?.photos?.length && numberPhotoShow < resp?.photos?.length && (
          <button className="button_load_more" onClick={() => setNumberPhotoShow(numberPhotoShow + 1)}>
            Load more...
          </button>
        )}
      </div>
    </div>
  );
}

export default App;