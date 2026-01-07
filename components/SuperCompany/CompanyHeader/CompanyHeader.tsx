"use client";

import React, { useState } from "react";
import { Star, Pencil, MoreHorizontal, X } from "lucide-react";
import "./CompanyHeader.css";

interface Props {
  onEdit: () => void;
  onAdd: () => void;
  onSave?: () => void;
  onDelete: () => void;
  isEditing: boolean;
}

const CompanyHeader: React.FC<Props> = ({
  onEdit,
  onAdd,
  onSave,
  onDelete,
  isEditing,
}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [hoverTimer, setHoverTimer] = useState<NodeJS.Timeout | null>(null);

  const handleDelete = () => {
    onDelete();
    setShowDeleteModal(false);
  };

  // Open dropdown on hover
  const handleMouseEnter = () => {
    if (hoverTimer) {
      clearTimeout(hoverTimer);
      setHoverTimer(null);
    }
    setMenuOpen(true);
  };

  // Close dropdown when leaving
  const handleMouseLeave = () => {
    const timer = setTimeout(() => {
      setMenuOpen(false);
    }, 200); // small delay for smooth experience
    setHoverTimer(timer);
  };

  return (
    <div className="company-header">
      {/* Left Section */}
      <div className="company-left">
        <div className="company-logo">SC</div>
        <div>
          <div className="company-name">
            SuperCompany Ltd ASA
            <Star size={16} className="star-icon" />
          </div>
          <div className="company-subtext">Department Stockholm</div>
        </div>
      </div>

      {/* Actions */}
      <div className="company-actions">
        <button className="icon-btn red-icon" onClick={onEdit}>
          <Pencil size={16} />
        </button>

        <div
          style={{ position: "relative" }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <button className="icon-btn red-icon">
            <MoreHorizontal size={16} />
          </button>

          {menuOpen && (
            <div className="dropdown">
              {isEditing && onSave && (
                <button className="dropdown-btn save" onClick={onSave}>
                  Save
                </button>
              )}
              <button className="dropdown-btn add" onClick={onAdd}>
                Add Data
              </button>
              <button
                className="dropdown-btn delete"
                onClick={() => setShowDeleteModal(true)}
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Custom Delete Modal */}
      {showDeleteModal && (
        <div className="modal-overlay">
          <div className="modal">
            <button
              className="modal-close"
              onClick={() => setShowDeleteModal(false)}
            >
              <X size={18} />
            </button>
            <h3>Confirm Delete</h3>
            <p>Do you want to delete this data?</p>
            <div className="modal-actions">
              <button
                className="btn btn-cancel"
                onClick={() => setShowDeleteModal(false)}
              >
                Cancel
              </button>
              <button className="btn btn-delete" onClick={handleDelete}>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CompanyHeader;
