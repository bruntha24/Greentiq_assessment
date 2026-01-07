"use client";

import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "./CompanyPreferences.css";

interface Company {
  _id: string;
  postal: string;
  country: string;
  phone: string;
  webaddress: string;
  email: string;
  category: string;
  code: string;
  number: string;
  vatNo: string;
  business: string;
}

interface CompanyPreferencesProps {
  companies: Company[];
  currentIndex: number;
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>;
}

const CompanyPreferences: React.FC<CompanyPreferencesProps> = ({
  companies,
  currentIndex,
  setCurrentIndex,
}) => {
  if (companies.length === 0) return <p>Loading preferences...</p>;

  const company = companies[currentIndex];

  const prevCompany = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? companies.length - 1 : prev - 1
    );
  };

  const nextCompany = () => {
    setCurrentIndex((prev) =>
      prev === companies.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <div className="company-preferences">
      <div className="prefs-left">
        <label>
          <input type="checkbox" /> Stop
        </label>
        <label>
          <input type="checkbox" /> No mailings
        </label>
      </div>

      <div className="prefs-right">
        <span className="updated-text">
          Updated: 18/09/2023 {company.code}
        </span>
        <div className="prefs-arrows">
          <button className="arrow-btn" onClick={prevCompany}>
            <ChevronLeft size={20} />
          </button>
          <button className="arrow-btn" onClick={nextCompany}>
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CompanyPreferences;
