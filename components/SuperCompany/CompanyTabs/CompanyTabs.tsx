"use client";

import React from "react";
import "./CompanyTabs.css";

const tabs = ["Company", "More", "Interest", "Note", "Market data", "Misc"];

const CompanyTabs = () => {
  return (
    <div className="company-tabs">
      {tabs.map((tab, index) => (
        <div
          key={tab}
          className={`tab ${index === 0 ? "active" : ""}`}
        >
          {tab}
        </div>
      ))}
    </div>
  );
};

export default CompanyTabs;
