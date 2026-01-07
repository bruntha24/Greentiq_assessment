"use client";

import React from "react";
import {
  Bell,
  User,
  HelpCircle,
  Eraser,
  Settings,
  LogOut,
  UserCircle,
  Menu,
} from "lucide-react";
import "./Right.css";

const Right = () => {
  return (
    <div className="header-right">
      {/* -------- Notifications -------- */}
      <div className="dropdown-wrapper">
        <button className="icon-btn">
          <Bell size={17} />
          <span className="badge">3</span>
        </button>

        <div className="right-dropdown">
          <div className="dropdown-title">Notifications</div>
          <button>New company added</button>
          <button>Activity assigned</button>
          <button>Payment received</button>
        </div>
      </div>

      {/* -------- User -------- */}
      <div className="dropdown-wrapper">
        <button className="icon-btn">
          <User size={17} />
        </button>

        <div className="right-dropdown">
          <button>
            <UserCircle size={14} /> Profile
          </button>
          <button>
            <Settings size={14} /> Settings
          </button>
          <button className="danger">
            <LogOut size={14} /> Logout
          </button>
        </div>
      </div>

      {/* -------- Menu (MISSING ICON FIXED) -------- */}
      <div className="dropdown-wrapper">
        <button className="icon-btn">
          <Menu size={18} />
        </button>
      </div>

      {/* -------- Help -------- */}
      <div className="dropdown-wrapper">
        <button className="icon-btn">
          <HelpCircle size={17} />
        </button>

        <div className="right-dropdown">
          <button>Help Center</button>
          <button>Documentation</button>
          <button>Contact Support</button>
        </div>
      </div>

      {/* -------- Eraser -------- */}
      <div className="dropdown-wrapper">
        <button className="icon-btn">
          <Eraser size={17} />
        </button>

        <div className="right-dropdown">
          <button>Clear Filters</button>
          <button>Reset View</button>
        </div>
      </div>
    </div>
  );
};

export default Right;
