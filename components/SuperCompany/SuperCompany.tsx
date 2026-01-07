"use client";

import React, { useEffect, useState } from "react";
import CompanyHeader from "./CompanyHeader/CompanyHeader";
import CompanyTabs from "./CompanyTabs/CompanyTabs";
import CompanyDetails from "./CompanyDetails/CompanyDetails";
import CompanyPreferences from "./CompanyPreferences/CompanyPreferences";
import CompanyForm from "./CompanyForm/CompanyForm";

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

const API = "http://localhost:4000/api/company";

const SuperCompany = () => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [mode, setMode] = useState<"view" | "edit" | "add">("view");

  useEffect(() => {
    fetch(API)
      .then((res) => res.json())
      .then((data: Company[]) => setCompanies(data))
      .catch((err) => console.error(err));
  }, []);

  if (companies.length === 0 && mode !== "add")
    return <p>Loading companies...</p>;

  const currentCompany = companies[currentIndex];

  const handleSave = async (data: any) => {
    if (mode === "edit") {
      const res = await fetch(`${API}/${currentCompany._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const updated = await res.json();
      const updatedCompanies = [...companies];
      updatedCompanies[currentIndex] = updated;
      setCompanies(updatedCompanies);
    } else if (mode === "add") {
      const res = await fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const created = await res.json();
      setCompanies([...companies, created]);
      setCurrentIndex(companies.length); // new company
    }
    setMode("view");
  };

  const handleDelete = async () => {
    if (!currentCompany) return;
    await fetch(`${API}/${currentCompany._id}`, { method: "DELETE" });
    const filtered = companies.filter((_, i) => i !== currentIndex);
    setCompanies(filtered);
    setCurrentIndex(0);
    setMode("view");
  };

  return (
    <div className="super-company">
      <CompanyHeader
        onEdit={() => setMode("edit")}
        onAdd={() => setMode("add")}
        onSave={() => {}}
        onDelete={handleDelete}
        isEditing={mode !== "view"}
      />

      <CompanyTabs />

      {mode === "view" && currentCompany && (
        <CompanyDetails company={currentCompany} />
      )}

      {(mode === "edit" || mode === "add") && (
        <CompanyForm
          company={mode === "edit" ? currentCompany : null}
          onSubmit={handleSave}
        />
      )}

      <CompanyPreferences
        companies={companies}
        currentIndex={currentIndex}
        setCurrentIndex={setCurrentIndex}
      />
    </div>
  );
};

export default SuperCompany;
