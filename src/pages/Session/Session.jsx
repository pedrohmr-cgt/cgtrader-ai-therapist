import React, { useEffect } from "react";

import Header from "../../components/Header/Header";

import "./Session.scss";

const Welcome = () => {
  const collectData = () => {
    console.log("Collecting data");
  };

  useEffect(() => {
    const video = document.querySelector(".session__video");
    if (navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((stream) => {
          video.srcObject = stream;
          collectData();
        })
        .catch(() => {
          console.log("Something went wrong!");
        });
    }
  }, []);

  return (
    <>
      <Header />
      <div className="session">
        {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
        <video className="session__video" autoPlay="true" />
      </div>
    </>
  );
};

export default Welcome;
