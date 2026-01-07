"use client";

import React from "react";
import {
  Building2,
  ChevronDown,
  Menu,
  Search,
  Plus,
  Users,
  Clipboard,
  Settings,
  LogOut,
} from "lucide-react";
import "./Left.css";

const Left = () => {
  return (
    <div className="header-left">
      {/* ---------- New pill ---------- */}
      <div className="dropdown-wrapper">
        <button className="new-pill">
          <Building2 size={16} />
          <span>New</span>
          <ChevronDown size={14} />
        </button>

        <div className="pill-dropdown">
          <button>
            <Plus size={14} /> Company
          </button>
          <button>
            <Users size={14} /> Contact
          </button>
          <button>
            <Clipboard size={14} /> Activity
          </button>
        </div>
      </div>

      {/* ---------- Menu + Search ---------- */}
      <div className="dropdown-wrapper">
        <button className="circle-btn combo-btn">
          <Menu size={15} />
          <Search size={15} />
        </button>

        <div className="circle-dropdown">
          <button>
            <Search size={14} /> Search
          </button>
          <button>
            <Settings size={14} /> Settings
          </button>
          <button className="danger">
            <LogOut size={14} /> Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Left;
