"use client";

import React, { useState } from "react";

// Tab Navigation and Tab Contents
import TabNavigation from "./components/TabNavigation";
import CompanyInfo from "./components/tabs/CompanyInfo";
import Activities from "./components/tabs/Activities";
import Contacts from "./components/tabs/Contacts";
import Sales from "./components/tabs/Sales";
import Requests from "./components/tabs/Requests";

// Reusable components for checkboxes and actions
import TabActionBar from "./components/TabActionBar";
import { CheckboxTable } from "./components/CheckboxTable";

const CompanyPage = () => {
  const [activeTab, setActiveTab] = useState("Company");

  // Mock company data
  const companyData = {
    name: "SuperCompany Ltd ASA",
    department: "Stockholm Branch",
    address: "123 Main Street",
    country: "Sweden",
    phone: "+46 123 456 789",
    email: "info@supercompany.com",
    category: "Technology",
    code: "SC-98",
    vat: "SE556677",
    businessType: "SaaS",
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Tabs */}
      <div className="mt-4 px-6">
        <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>

      {/* Tab Content */}
      <div className="mt-6 px-6">
        {activeTab === "Company" && <CompanyInfo company={companyData} />}
        {activeTab === "Activities" && <Activities />}
        {activeTab === "Contacts" && <Contacts />}
        {activeTab === "Sales" && <Sales />}
        {activeTab === "Requests" && <Requests />}
      </div>
    </div>
  );
};

export default CompanyPage;
