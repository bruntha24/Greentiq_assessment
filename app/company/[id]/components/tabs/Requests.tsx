"use client";

import React, { useState, useEffect, useRef } from "react";
import { Pencil, Trash2, Plus, X, ChevronDown, RotateCw } from "lucide-react";
import { CheckboxTable, Column } from "../CheckboxTable";
import styles from "./Request.module.css";

import {
  fetchRequests,
  createRequest,
  updateRequest,
  deleteRequests,
  RequestType,
} from "@/api/company/request";

export default function Requests() {
  const [requests, setRequests] = useState<RequestType[]>([]);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const filterRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState<RequestType>({
    title: "",
    status: "Open",
    createdDate: "",
    priority: "Medium",
  });

  /* ======================
     FETCH DATA FROM BACKEND
  ====================== */
  useEffect(() => {
    const loadRequests = async () => {
      try {
        const data = await fetchRequests();
        setRequests(data);
      } catch (err) {
        console.error("Failed to fetch requests:", err);
      }
    };
    loadRequests();
  }, []);

  /* ======================
     SELECTION
  ====================== */
  const toggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectedIds.length === requests.length) setSelectedIds([]);
    else setSelectedIds(requests.map((r) => r._id!));
  };

  /* ======================
     CRUD OPERATIONS
  ====================== */
  const handleAddSubmit = async () => {
    try {
      const created = await createRequest(formData);
      setRequests((prev) => [...prev, created]);
      closeAll();
    } catch (err) {
      console.error(err);
    }
  };

  const handleEditSubmit = async () => {
    if (!selectedIds[0]) return;
    try {
      const updated = await updateRequest(selectedIds[0], formData);
      setRequests((prev) =>
        prev.map((r) => (r._id === updated._id ? updated : r))
      );
      closeAll();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteConfirm = async () => {
    try {
      await deleteRequests(selectedIds);
      setRequests((prev) => prev.filter((r) => !selectedIds.includes(r._id!)));
      closeAll();
    } catch (err) {
      console.error(err);
    }
  };

  const closeAll = () => {
    setShowAdd(false);
    setShowEdit(false);
    setShowDelete(false);
    setSelectedIds([]);
    setShowFilter(false);
    setFormData({ title: "", status: "Open", createdDate: "", priority: "Medium" });
  };

  useEffect(() => {
    if (showEdit && selectedIds.length === 1) {
      const req = requests.find((r) => r._id === selectedIds[0]);
      if (req) setFormData(req);
    }
  }, [showEdit, selectedIds, requests]);

  /* ======================
     CLICK OUTSIDE TO CLOSE FILTER
  ====================== */
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
        setShowFilter(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /* ======================
     TABLE COLUMNS
  ====================== */
  const columns: Column<RequestType>[] = [
    { header: "Title", accessor: "title" },
    {
      header: "Status",
      accessor: (row) => (
        <span
          className={`${styles.statusBadge} ${styles[row.status.replace(" ", "").toLowerCase()]}`}
        >
          {row.status}
        </span>
      ),
    },
    { header: "Created Date", accessor: "createdDate" },
    {
      header: "Priority",
      accessor: (row) => (
        <span className={`${styles.priority} ${styles[row.priority.toLowerCase()]}`}>
          {row.priority}
        </span>
      ),
    },
  ];

  if (!requests.length) return <p>Loading requests...</p>;

  return (
    <div className={styles.card}>
      <CheckboxTable<RequestType>
        data={requests}
        columns={columns}
        selectedIds={selectedIds}
        onToggleSelect={toggleSelect}
        onToggleSelectAll={toggleSelectAll}
        rowIdKey="_id"
        tableClassName={styles.table}
        rowClassName={(row, selected) => (selected ? styles.rowSelected : "")}
      />

      {/* ===== BOTTOM TOOLBAR ===== */}
      <div className={styles.toolbar}>
        <div className={styles.leftActions}>
          <button className={styles.textBtn} onClick={() => setShowAdd(true)}>
            <Plus size={16} /> Add
          </button>

          <button
            className={styles.textBtn}
            disabled={!selectedIds.length}
            onClick={() => setShowDelete(true)}
          >
            <Trash2 size={16} /> Delete
          </button>

          <div ref={filterRef} className={`${styles.filterWrap} ${showFilter ? styles.active : ""}`}>
            <button
              className={styles.textBtn}
              onClick={() => setShowFilter((prev) => !prev)}
            >
              Filter <ChevronDown size={14} />
            </button>

            {showFilter && (
              <div className={styles.dropdown}>
                <button>Low → High</button>
                <button>High → Low</button>
                <button>Reset</button>
              </div>
            )}
          </div>
        </div>

        <div className={styles.rightActions}>
          <button
            className={styles.iconBtn}
            disabled={selectedIds.length !== 1}
            onClick={() => setShowEdit(true)}
          >
            <Pencil size={18} />
          </button>

          <button className={styles.iconBtn}>
            <RotateCw size={18} />
          </button>
        </div>
      </div>

      {/* ===== MODALS ===== */}
      {(showAdd || showEdit || showDelete) && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <button className={styles.closeBtn} onClick={closeAll}>
              <X size={18} />
            </button>

            {showDelete ? (
              <>
                <h3>Delete Request</h3>
                <p>Are you sure you want to delete {selectedIds.length} request(s)?</p>
                <div className={styles.modalActions}>
                  <button onClick={handleDeleteConfirm}>Delete</button>
                  <button onClick={closeAll}>Cancel</button>
                </div>
              </>
            ) : (
              <>
                <h3>{showAdd ? "Add Request" : "Edit Request"}</h3>

                <input
                  placeholder="Title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                />

                <select
                  value={formData.status}
                  onChange={(e) =>
                    setFormData({ ...formData, status: e.target.value as any })
                  }
                >
                  <option>Open</option>
                  <option>In Progress</option>
                  <option>Closed</option>
                </select>

                <input
                  type="date"
                  value={formData.createdDate}
                  onChange={(e) =>
                    setFormData({ ...formData, createdDate: e.target.value })
                  }
                />

                <select
                  value={formData.priority}
                  onChange={(e) =>
                    setFormData({ ...formData, priority: e.target.value as any })
                  }
                >
                  <option>High</option>
                  <option>Medium</option>
                  <option>Low</option>
                </select>

                <div className={styles.modalActions}>
                  <button onClick={showAdd ? handleAddSubmit : handleEditSubmit}>
                    Save
                  </button>
                  <button onClick={closeAll}>Cancel</button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
