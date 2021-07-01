import React, { useEffect } from "react";
import { Button } from "antd";
import * as faceapi from "face-api.js";

import Header from "../../components/Header/Header";

import "./Session.scss";

const Welcome = () => {
  function isFaceDetectionModelLoaded() {
    return !!faceapi.nets.tinyFaceDetector.params;
  }

  async function onPlay() {
    const videoEl = document.querySelector(".session__video");

    if (videoEl.paused || videoEl.ended || !isFaceDetectionModelLoaded())
      return setTimeout(() => onPlay());

    const options = new faceapi.TinyFaceDetectorOptions({
      inputSize: 224,
      scoreThreshold: 0.5,
    });

    // const ts = Date.now();

    const result = await faceapi
      .detectSingleFace(videoEl, options)
      .withFaceExpressions();

    console.log(result);

    // updateTimeStats(Date.now() - ts);

    // if (result) {
    //   const canvas = $("#overlay").get(0);
    //   const dims = faceapi.matchDimensions(canvas, videoEl, true);

    //   const resizedResult = faceapi.resizeResults(result, dims);
    //   const minConfidence = 0.05;
    //   if (withBoxes) {
    //     faceapi.draw.drawDetections(canvas, resizedResult);
    //   }
    //   faceapi.draw.drawFaceExpressions(canvas, resizedResult, minConfidence);
    // }

    setTimeout(() => onPlay());

    return true;
  }

  async function collectData() {
    await faceapi.loadFaceExpressionModel("/");
    onPlay();
  }

  useEffect(() => {
    const video = document.querySelector(".session__video");
    if (navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((stream) => {
          video.srcObject = stream;
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
        <video className="session__video" autoPlay />
        <div className="session__box">
          <Button
            onClick={collectData}
            type="primary"
            shape="round"
            size="large"
            block
          >
            Start my CGTherapy
          </Button>
        </div>
      </div>
    </>
  );
};

export default Welcome;
