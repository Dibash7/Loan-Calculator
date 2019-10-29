import React from "react";
import "../App.css";

const Header = () => (
  <header className="header">
    <div className="text-box">
      <h1 className="heading-primary">
        <span className="heading-primary-main">Hey There</span>
        <span className="heading-primary-sub">Click the below button</span>
      </h1>
      <a href="#loan" className="btn btn-white btn-animated">
        Calculate Loan
      </a>
    </div>
  </header>
);

export default Header;
