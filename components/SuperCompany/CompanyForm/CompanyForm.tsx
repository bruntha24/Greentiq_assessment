"use client";

import React, { useState, useEffect } from "react";
import "../CompanyDetails/CompanyDetails.css"; // ✅ relative path to CSS

interface CompanyFormProps {
  company: any | null;
  onSubmit: (data: any) => void;
}

const emptyCompany = {
  postal: "",
  country: "",
  phone: "",
  webaddress: "",
  email: "",
  category: "",
  code: "",
  number: "",
  vatNo: "",
  business: "",
};

const CompanyForm: React.FC<CompanyFormProps> = ({ company, onSubmit }) => {
  const [formData, setFormData] = useState(emptyCompany);

  useEffect(() => {
    if (company) setFormData(company);
  }, [company]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="company-details">
      <div className="details-grid">
        {Object.keys(formData).map((key) => (
          <div className="row" key={key}>
            <span>{key}</span>
            <input
              type="text"
              name={key}
              value={formData[key as keyof typeof formData]}
              onChange={handleChange}
            />
          </div>
        ))}
      </div>
      <button className="save-btn" onClick={() => onSubmit(formData)}>
        Save
      </button>
    </div>
  );
};

export default CompanyForm;
