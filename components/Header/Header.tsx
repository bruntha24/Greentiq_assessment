"use client";

import React from "react";
import Left from "./Left/Left";
import Searchbar from "./Searchbar/Searchbar";
import Right from "./Right/Right";
import "./Header.css";

const Header = () => {
  return (
    <header className="header-container">
      <Left />
      <Searchbar />
      <Right />
    </header>
  );
};

export default Header;
