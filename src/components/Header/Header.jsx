import React from "react";
import { bool } from "prop-types";

import "./Header.scss";

const Header = ({ dark }) => (
  <div className="header">
    <div className={`header__logo${dark && "--dark"}`}>CGTHERAPIST</div>
  </div>
);

Header.propTypes = {
  dark: bool,
};

Header.defaultProps = {
  dark: false,
};

export default Header;
