import React from "react";
import { bool } from "prop-types";
import { Typography } from "antd";

import "./Header.scss";

const { Title } = Typography;

const Header = ({ dark }) => (
  <div className="header">
    <Title level={3}>
      <div className={`header__logo${dark ? "--dark" : ""}`}>cgtherapy</div>
    </Title>
  </div>
);

Header.propTypes = {
  dark: bool,
};

Header.defaultProps = {
  dark: false,
};

export default Header;
