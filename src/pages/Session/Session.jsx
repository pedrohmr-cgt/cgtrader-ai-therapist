/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Button } from "antd";
import * as faceapi from "face-api.js";

import moods from "../../data/moods";
import Header from "../../components/Header/Header";

import "./Session.scss";

const STATUS_WAITING = 0;
const STATUS_LISTENING = 1;
const STATUS_PROCESSING = 2;
const STATUS_DONE = 3;

const MOOD_NEUTRAL = "neutral";
const MOOD_HAPPY = "happy";
const MOOD_SAD = "sad";
const MOOD_FEARFUL = "fearful";
const MOOD_DISGUESTED = "disgusted";
const MOOD_SURPRISED = "surprised";

const Welcome = () => {
  const [status, setStatus] = useState(STATUS_WAITING);
  const [processing, setProcessing] = useState(0);
  const [mood, setMood] = useState(null);

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

  function shuffleArray(array) {
    const newArray = [...array];
    // eslint-disable-next-line no-plusplus
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = newArray[i];
      newArray[i] = newArray[j];
      newArray[j] = temp;
    }

    return newArray;
  }

  function incrementProcessing() {
    const processingIncrease = Math.round(Math.random() * 30);
    if (processing + processingIncrease >= 100) {
      const shuffleMood = shuffleArray(Object.keys(moods));
      setStatus(STATUS_DONE);
      setMood(shuffleMood[0]);
      setProcessing(0);
    } else {
      setProcessing(processing + processingIncrease);
    }

    return true;
  }

  function processData() {
    setStatus(STATUS_PROCESSING);
    incrementProcessing();

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
  // : <span>06 sec</span>
  function renderListeningBox() {
    return (
      <div className="session__box">
        <div className="session__box-listening">Listening...</div>
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
        <h2 className="session__box-question">{processing}% Processed...</h2>
      </div>
    );
  }

  function getMoodList() {
    if (!moods[mood]) {
      return null;
    }

    return moods[mood].map((_mood) => <li>{_mood}</li>);
  }

  function getMoodIcon() {
    switch (mood) {
      case "neutral":
        return "1F610";

      case "sad":
        return "1F614";

      case "angry":
        return "1F621";

      case "fearful":
        return "1F628";

      case "disgusted":
        return "1F922";

      case "surprised":
        return "1F631";

      default:
        return "1F603";
    }
  }

  function renderResultBox() {
    return (
      <div className="session__box">
        <p className="session__box-paragraph">Condition:</p>
        <div className="session__box-emoji">&#x1F641;</div>
        <p className="session__box-paragraph">Tips for well being:</p>
        <ul className="session__box-tips">{getMoodList()}</ul>
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

  useEffect(() => {
    if (processing > 0) {
      setTimeout(incrementProcessing, 500);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [processing]);

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
