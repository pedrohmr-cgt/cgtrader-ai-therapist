/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Button } from "antd";
import * as faceapi from "face-api.js";

import Header from "../../components/Header/Header";

import "./Session.scss";

const STATUS_WAITING = 0;
const STATUS_LISTENING = 1;
const STATUS_PROCESSING = 2;
const STATUS_DONE = 3;

const Welcome = () => {
  const [status, setStatus] = useState(STATUS_WAITING);

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

  function clearData() {
    setStatus(STATUS_WAITING);
  }

  function collectData() {
    setStatus(STATUS_LISTENING);
    // await faceapi.loadFaceExpressionModel("/");
    // onPlay();
  }

  function processData() {
    setStatus(STATUS_PROCESSING);
    setTimeout(() => {
      setStatus(STATUS_DONE);
    }, 1000);

    return true;
  }

  function renderStartButton() {
    return (
      <Button
        onClick={collectData}
        type="primary"
        shape="round"
        size="large"
        block
      >
        Start my CGTherapy
      </Button>
    );
  }

  function renderListeningBox() {
    return (
      <div className="session__box">
        <div className="session__box-listening">
          Listening: <span>06 sec</span>
        </div>
        <div className="session__box-answer">
          Please answer while looking at the camera
        </div>
        <h2 className="session__box-question">How do you feel right now?</h2>
        <Button
          onClick={processData}
          type="ghost"
          shape="round"
          size="large"
          block
        >
          Stop Session
        </Button>
      </div>
    );
  }

  function renderProcessingBox() {
    return (
      <div className="session__box">
        <div className="session__box-listening session__box-processing">
          Listening: <span>Done</span>
        </div>
        <div className="session__box-answer">
          We are processing your therapy session
        </div>
        <h2 className="session__box-question">89% Processed...</h2>
      </div>
    );
  }

  function renderResultBox() {
    return (
      <div className="session__box">
        <p className="session__box-paragraph">Condition:</p>
        <div className="session__box-emoji">&#x1F603;</div>
        <p className="session__box-paragraph">Tips for well being:</p>
        <ul className="session__box-tips">
          <li>
            Breathe in slowly. Deep breaths come from the diaphragm, not the
            chest. It may help to visualize your breath rising from deep in your
            belly.
          </li>
          <li>
            Hold it. Hold your breath for a count of three, then let it out
            slowly.
          </li>
          <li>
            Consider a mantra. Some people find it helpful to repeat a mantra,
            like &ldquo;I am calm&rdquo; or &ldquo;I am relaxed.&rdquo;
          </li>
          <li>
            Consider a mantra. Some people find it helpful to repeat a mantra,
            like &ldquo;I am calm&rdquo; or &ldquo;I am relaxed.&rdquo;
          </li>
        </ul>
        <Button
          onClick={clearData}
          type="primary"
          shape="round"
          size="large"
          block
        >
          Start another CGTherapy
        </Button>
      </div>
    );
  }

  function renderBox() {
    switch (status) {
      case STATUS_LISTENING:
        return renderListeningBox();

      case STATUS_PROCESSING:
        return renderProcessingBox();

      case STATUS_DONE:
        return renderResultBox();

      default:
        return renderStartButton();
    }
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
        <div className="session__container">{renderBox()}</div>
      </div>
    </>
  );
};

export default Welcome;
