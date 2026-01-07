"use client";

import React, { useState } from "react";
import {
  Gauge,
  Building2,
  Users,
  Calendar,
  DollarSign,
  Clipboard,
  MessageSquare,
  AtSign,
  MessageCircle,
  BarChart3,
  Target,
  Wrench,
  HelpCircle,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";

import "./Sidebar.css";

const Sidebar = () => {
  const [activeIndex, setActiveIndex] = useState(1);
  const [collapsed, setCollapsed] = useState(true);

  const navItems = [
    { icon: <Gauge size={22} />, label: "Dashboard", hint: "Go to Dashboard" },
    { icon: <Building2 size={22} />, label: "Companies", hint: "Manage Companies" },
    { icon: <Users size={22} />, label: "Contacts", hint: "View Contacts" },
    { icon: <Calendar size={22} />, label: "Calendar", hint: "Open Calendar" },
    { icon: <DollarSign size={22} />, label: "Finance", hint: "Finance Overview" },
    { icon: <Clipboard size={22} />, label: "Documents", hint: "View Documents" },
    { icon: <MessageSquare size={22} />, label: "Chat", hint: "Open Chat" },
    { icon: <AtSign size={22} />, label: "Email", hint: "Check Emails" },
    { icon: <MessageCircle size={22} />, label: "Notes", hint: "Your Notes" },
    { icon: <BarChart3 size={22} />, label: "Reports", hint: "View Reports" },
    { icon: <Target size={22} />, label: "Targets", hint: "Set Targets" },
    { icon: <Wrench size={22} />, label: "Settings", hint: "App Settings" },
  ];

  return (
    <aside className={`sidebar ${collapsed ? "collapsed" : "expanded"}`}>
      {/* Logo */}
      <div className="sidebar-logo">
        L {!collapsed && <span className="logo-text">LOGO</span>}
      </div>

      {/* Navigation */}
      <div className="sidebar-nav">
        {navItems.map((item, index) => (
          <div className="sidebar-item" key={index}>
            <button
              className={`sidebar-btn ${activeIndex === index ? "active" : ""}`}
              onClick={() => setActiveIndex(index)}
            >
              {item.icon}
              {!collapsed && <span className="sidebar-label">{item.label}</span>}
            </button>

            {collapsed && (
              <span className="sidebar-tooltip">{item.hint}</span>
            )}
          </div>
        ))}
      </div>

      {/* Bottom Utilities */}
      <div className="sidebar-utils">
        <div className="sidebar-item">
          <button className="sidebar-btn">
            <HelpCircle size={22} />
            {!collapsed && <span className="sidebar-label">Help</span>}
          </button>
          {collapsed && (
            <span className="sidebar-tooltip">Help & Support</span>
          )}
        </div>

        <div className="sidebar-item">
          <button
            className="sidebar-btn"
            onClick={() => setCollapsed((p) => !p)}
          >
            {collapsed ? <ChevronRight size={22} /> : <ChevronLeft size={22} />}
            {!collapsed && (
              <span className="sidebar-label">Collapse</span>
            )}
          </button>
          {collapsed && (
            <span className="sidebar-tooltip">Expand Sidebar</span>
          )}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
