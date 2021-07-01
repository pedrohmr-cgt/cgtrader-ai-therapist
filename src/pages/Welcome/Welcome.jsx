import React from "react";
import { Typography } from "antd";

import Header from "../../components/Header/Header";

import "./Welcome.scss";

const { Title } = Typography;

const Welcome = () => (
  <>
    <Header dark />
    <div className="welcome">
      <div className="welcome__message">
        <Title level={2}>Welcome to your personal safespace.</Title>
        <Title level={5}>
          AI Powered 10 seconds therapy sessions for everyone!
        </Title>
      </div>
      <div className="welcome__alert">
        Please give us permission to use your camera and microphone to begin
      </div>
    </div>
  </>
);

export default Welcome;
