import React from "react";
import "./TabNav.css";

interface Props {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const tabs = ["Activities", "Contacts", "Projects", "Sales", "Requests"];

const TabNavigation: React.FC<Props> = ({ activeTab, setActiveTab }) => {
  return (
    <div className="table-tabs-wrapper">
      <div className="table-tabs">
        {tabs.map((tab) => {
          const isActive = activeTab === tab;

          return (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`table-tab ${isActive ? "active" : ""}`}
            >
              {tab}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default TabNavigation;
