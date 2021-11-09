import React, { useState } from "react";
import axios from "axios";

export const Filter = ({
  cameraValue,
  setResp,
  setIsLoading,
  rover
}) => {
  const [camera, setCamera] = useState(null);
  const [sol, setSol] = useState(null);

  const loadingData = () => {
    setIsLoading(true);
    if (rover && camera && sol) {
      axios
        .get(
          `https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos?sol=${sol}&camera=${camera}&api_key=v4wYOuFtIO4XoUAhIICg6mDKDyAw9S3694fgo9BA`
        )
        .then((res) => {
          setResp(res.data);
        })
        .catch((error) => {
          console.error("Error", error);
        })
        .finally(() => setIsLoading(false));
    }
  };

  return (
    <div className="select_block__filter">
      <select
        defaultValue="default"
        className="select_camera"
        onChange={(e) => setCamera(e.target.value)}
      >
        <option disabled value="default">
          Choose the camera
        </option>
        {cameraValue?.map((cameraItem) => (
          <option key={cameraItem.id} value={cameraItem?.value}>{cameraItem?.label}</option>
        ))}
      </select>
      <input
        type="number"
        onChange={(e) => setSol(e.target.value)}
        placeholder="Enter sol number"
        className="input_sol"
      />
      {camera && sol ? (
        <button className="button_explore__active" onClick={loadingData}>Explore</button>
      ) : (
        <button className="button_explore__disabled" disabled>Explore</button>
      )}
    </div>
  );
};