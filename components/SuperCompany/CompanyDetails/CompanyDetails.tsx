"use client";

import React from "react";
import "./CompanyDetails.css";

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

interface CompanyDetailsProps {
  company: Company | null;
}

const CompanyDetails: React.FC<CompanyDetailsProps> = ({ company }) => {
  if (!company) return <p>Loading company details...</p>;

  return (
    <div className="company-details">
      <div className="details-grid">
        <div>
          <div className="row"><span>Postal</span><span>{company.postal}</span></div>
          <div className="row"><span>Country</span><span>{company.country}</span></div>
          <div className="row"><span>Phone</span><a href={`tel:${company.phone}`}>{company.phone}</a></div>
          <div className="row"><span>Webaddress</span><a href={`https://${company.webaddress}`} target="_blank">{company.webaddress}</a></div>
          <div className="row"><span>E-mail</span><a href={`mailto:${company.email}`}>{company.email}</a></div>
        </div>

        <div>
          <div className="row"><span>Category</span><span>{company.category}</span></div>
          <div className="row"><span>Code</span><span>{company.code}</span></div>
          <div className="row"><span>Number</span><span>{company.number}</span></div>
          <div className="row"><span>VAT No.</span><span>{company.vatNo}</span></div>
          <div className="row"><span>Business</span><span>{company.business}</span></div>
        </div>
      </div>
    </div>
  );
};

export default CompanyDetails;
