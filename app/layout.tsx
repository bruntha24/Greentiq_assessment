"use client";

import React, { useState } from "react";
import "./globals.css";

// Components
import Sidebar from "@/components/Sidebar/Sidebar";
import Header from "@/components/Header/Header";
import SuperCompany from "@/components/SuperCompany/SuperCompany";

// Company Tabs Components
import TabNavigation from "@/app/company/[id]/components/TabNavigation";
import Activities from "@/app/company/[id]/components/tabs/Activities";
import Contacts from "@/app/company/[id]/components/tabs/Contacts";
import Sales from "@/app/company/[id]/components/tabs/Sales";
import Requests from "@/app/company/[id]/components/tabs/Requests";
import Projects from "@/app/company/[id]/components/tabs/Projects";

import RTS from "@/components/RTS/RTS";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [activeTab, setActiveTab] = useState("Sales");

  const companyData = {
    name: "SuperCompany Ltd ASA",
    department: "Stockholm Branch",
    };

  return (
    <html lang="en">
      <body className="antialiased font-sans flex min-h-screen">
        {/* Sidebar */}
        <Sidebar />

        {/* Page content wrapper */}
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <Header />

          {/* Main content */}
          <main className="main-content flex-1 overflow-y-auto">
            <div className="content-wrapper">
              <div className="content-grid">
                {/* LEFT COLUMN */}
                <div className="left-column">
                  <SuperCompany />

                  <div className="company-section">
                    <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />

                    
                    {activeTab === "Activities" && <Activities />}
                    {activeTab === "Contacts" && <Contacts />}
                    {activeTab === "Projects" && <Projects />}
                    {activeTab === "Sales" && <Sales />}
                    {activeTab === "Requests" && <Requests />}
                  </div>
                </div>

                {/* RIGHT COLUMN */}
                <div className="right-column">
                  <RTS />
                </div>
              </div>
            </div>

            {children}
          </main>
        </div>
      </body>
    </html>
  );
}   