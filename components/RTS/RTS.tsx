"use client";

import React, { useEffect, useState } from "react";
import {
  MessageSquare,
  DollarSign,
  Calendar,
  Clipboard,
  Sparkles,
  ChevronDown,
  Pencil,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import "./RTS.css";

const API_URL = "http://localhost:4000/api/company/rts";

interface Activity {
  date: string;
  text: string;
}

interface RTSItem {
  _id: string;
  details: {
    company: string;
    contact: string;
    saleDate: string;
    owner: string;
    saleType: string;
    status: string;
  };
  activities: Activity[];
  stakeholders: string[];
}

const RTS = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [rtsList, setRtsList] = useState<RTSItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const [details, setDetails] = useState({
    company: "",
    contact: "",
    saleDate: "",
    owner: "",
    saleType: "",
    status: "",
  });

  const [activities, setActivities] = useState<Activity[]>([]);
  const [stakeholders, setStakeholders] = useState<string[]>([]);

  /* ===== FETCH RTS ===== */
  useEffect(() => {
    const fetchRTS = async () => {
      try {
        const res = await fetch(API_URL);
        const data: RTSItem[] = await res.json();
        setRtsList(data);
        if (data.length > 0) {
          setCurrentIndex(0);
          loadRTS(data[0]);
        }
      } catch (err) {
        console.error("RTS load failed", err);
      }
    };
    fetchRTS();
  }, []);

  const loadRTS = (rts: RTSItem) => {
    setDetails(rts.details);
    setActivities(rts.activities || []);
    setStakeholders(rts.stakeholders || []);
  };

  /* ===== NAVIGATION (FIXED) ===== */
  const handlePrev = () => {
    if (currentIndex === 0) return;
    const idx = currentIndex - 1;
    setCurrentIndex(idx);
    loadRTS(rtsList[idx]);
  };

  const handleNext = () => {
    if (currentIndex >= rtsList.length - 1) return;
    const idx = currentIndex + 1;
    setCurrentIndex(idx);
    loadRTS(rtsList[idx]);
  };

  /* ===== SAVE ===== */
  const handleSave = async () => {
    const rtsId = rtsList[currentIndex]._id;
    await fetch(`${API_URL}/${rtsId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ details, activities, stakeholders }),
    });
    setIsEditing(false);
  };

  return (
    <aside className="rts-container">
      {/* HEADER ICONS */}
      <div className="rts-header">
        <MessageSquare size={16} />
        <DollarSign size={16} />
        <Calendar size={16} />
        <Clipboard size={16} />
        <Sparkles size={16} />
        <ChevronDown size={16} />
      </div>

      {/* MAIN TITLE */}
      <div className="rts-main-title">
        <div className="rts-name">45 Components – RTS</div>
        <div className="rts-value">17 344 EUR</div>
      </div>

      {/* DETAILS */}
      <div className="rts-details">
        {Object.entries(details).map(([key, value]) => (
          <div className="detail-row" key={key}>
            <span className="label">
              {key.replace(/([A-Z])/g, " $1")}
            </span>
            {isEditing ? (
              <input
                value={value}
                onChange={(e) =>
                  setDetails({ ...details, [key]: e.target.value })
                }
              />
            ) : (
              <span className="value">{value}</span>
            )}
          </div>
        ))}
      </div>

      <div className="rts-divider" />

      {/* ACTIVITIES */}
      <div className="section">
        <div className="section-title">Activities</div>
        {activities.map((a, i) => (
          <div className="activity-row" key={i}>
            {isEditing ? (
              <>
                <input
                  value={a.date}
                  onChange={(e) =>
                    setActivities((prev) =>
                      prev.map((x, idx) =>
                        idx === i ? { ...x, date: e.target.value } : x
                      )
                    )
                  }
                />
                <input
                  value={a.text}
                  onChange={(e) =>
                    setActivities((prev) =>
                      prev.map((x, idx) =>
                        idx === i ? { ...x, text: e.target.value } : x
                      )
                    )
                  }
                />
              </>
            ) : (
              <>
                <span>{a.date}</span>
                <span>{a.text}</span>
              </>
            )}
          </div>
        ))}
      </div>

      <div className="rts-divider" />

      {/* STAKEHOLDERS */}
      <div className="section">
        <div className="section-title">Stakeholders</div>
        {stakeholders.map((s, i) =>
          isEditing ? (
            <input
              key={i}
              value={s}
              onChange={(e) =>
                setStakeholders((prev) =>
                  prev.map((x, idx) => (idx === i ? e.target.value : x))
                )
              }
            />
          ) : (
            <div key={i} className="stakeholder">{s}</div>
          )
        )}
      </div>

      {/* FOOTER */}
      <div className="rts-footer-controls">
        <div className="rts-edit-actions">
          <button
            className={`rts-edit-btn ${isEditing ? "active" : ""}`}
            onClick={() => setIsEditing(!isEditing)}
          >
            <Pencil size={16} />
          </button>

          {isEditing && (
            <button className="rts-save-btn" onClick={handleSave}>
              Save
            </button>
          )}
        </div>

        <div className="rts-arrow-group">
          <button
            className="rts-arrow-btn"
            onClick={handlePrev}
            disabled={currentIndex === 0 || isEditing}
          >
            <ChevronLeft size={16} />
          </button>

          <button
            className="rts-arrow-btn"
            onClick={handleNext}
            disabled={currentIndex === rtsList.length - 1 || isEditing}
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </aside>
  );
};

export default RTS;    