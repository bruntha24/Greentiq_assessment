"use client";

import React from "react";
import { Search } from "lucide-react";
import "./Searchbar.css";

const Searchbar = () => {
  return (
    <div className="header-searchbar">
      <Search size={16} className="search-icon" />
      <input
        type="text"
        placeholder="Search companies, contacts, data..."
        className="search-input"
      />
    </div>
  );
};

export default Searchbar;   