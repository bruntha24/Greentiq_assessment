"use client";

import React, { useEffect, useState } from "react";
import { CheckboxTable, Column } from "../CheckboxTable";
import styles from "./Activities.module.css";
import { Plus, Trash2, Filter, X, Pencil, RotateCw } from "lucide-react";
import {
  fetchActivities,
  createActivity,
  updateActivity,
  deleteActivities,
  Activity,
} from "@/api/company/activity";

const initialFormState: Activity = {
  title: "",
  type: "Call",
  status: "Pending",
  assignedTo: "",
  dueDate: "",
  createdDate: "",
};

export default function Activities() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [form, setForm] = useState<Activity>(initialFormState);
  const [openModal, setOpenModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const loadActivities = async () => {
    const data = await fetchActivities();
    setActivities(data);
  };

  useEffect(() => {
    loadActivities();
  }, []);

  /* TABLE COLUMNS — NO BOTTOM ICONS HERE */
  const columns: Column<Activity>[] = [
    { header: "Title", accessor: "title" },
    { header: "Type", accessor: "type" },
    {
      header: "Status",
      accessor: (row) => (
        <span
          className={
            row.status === "Completed"
              ? styles.statusCompleted
              : styles.statusPending
          }
        >
          {row.status}
        </span>
      ),
    },
    { header: "Assigned To", accessor: "assignedTo" },
    { header: "Due Date", accessor: "dueDate" },
    { header: "Created Date", accessor: "createdDate" },
  ];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = async () => {
    if (!form.title || !form.assignedTo) return;

    editingId
      ? await updateActivity(editingId, form)
      : await createActivity(form);

    setOpenModal(false);
    setEditingId(null);
    setSelectedIds([]);
    await loadActivities();
  };

  const handleDelete = async () => {
    await deleteActivities(selectedIds);
    setDeleteModal(false);
    setSelectedIds([]);
    await loadActivities();
  };

  return (
    <div className={styles.card}>
      <CheckboxTable<Activity>
        data={activities}
        columns={columns}
        rowIdKey="_id"
        tableClassName={styles.table}
        selectedIds={selectedIds}
        onToggleSelect={(id) =>
          setSelectedIds((prev) =>
            prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
          )
        }
        onToggleSelectAll={() =>
          setSelectedIds(
            selectedIds.length === activities.length
              ? []
              : activities.map((a) => a._id!)
          )
        }
      />

      {/* ✅ SALES STYLE BOTTOM BAR */}
      <div className={styles.bottomControls}>
        {/* LEFT — Add / Delete / Filter */}
        <div className={styles.actionButtons}>
          <button className={styles.actionBtn} onClick={() => setOpenModal(true)}>
            <Plus size={16} /> Add
          </button>

          <button
            className={`${styles.actionBtn} ${
              !selectedIds.length ? styles.disabled : ""
            }`}
            onClick={() => setDeleteModal(true)}
          >
            <Trash2 size={16} /> Delete
          </button>

          <button className={styles.actionBtn}>
            <Filter size={16} /> Filter
          </button>
        </div>

        {/* RIGHT — Edit / Reset (Sales Exact) */}
        <div className={styles.rightActions}>
          <Pencil
            size={18}
            onClick={() => {
              if (!selectedIds.length) return;
              const row = activities.find(a => a._id === selectedIds[0]);
              if (!row) return;
              setEditingId(row._id!);
              setForm(row);
              setOpenModal(true);
            }}
          />

          <RotateCw
            size={18}
            onClick={() => {
              setEditingId(null);
              setForm(initialFormState);
            }}
          />
        </div>
      </div>

      {/* ADD / EDIT MODAL */}
      {openModal && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <div className={styles.modalHeader}>
              <h3>{editingId ? "Edit Activity" : "Add Activity"}</h3>
              <X onClick={() => setOpenModal(false)} />
            </div>

            <div className={styles.modalBody}>
              <input name="title" placeholder="Title" value={form.title} onChange={handleChange} />
              <select name="type" value={form.type} onChange={handleChange}>
                <option>Call</option>
                <option>Meeting</option>
                <option>Email</option>
                <option>Task</option>
              </select>
              <select name="status" value={form.status} onChange={handleChange}>
                <option>Pending</option>
                <option>Completed</option>
              </select>
              <input name="assignedTo" placeholder="Assigned To" value={form.assignedTo} onChange={handleChange} />
              <input type="date" name="dueDate" value={form.dueDate} onChange={handleChange} />
            </div>

            <div className={styles.modalFooter}>
              <button className={styles.secondaryBtn} onClick={() => setOpenModal(false)}>
                Cancel
              </button>
              <button className={styles.primaryBtn} onClick={handleSave}>
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* DELETE MODAL */}
      {deleteModal && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <div className={styles.modalHeader}>
              <h3>Delete Activities</h3>
              <X onClick={() => setDeleteModal(false)} />
            </div>
            <p>Do you want to delete the selected activity(s)?</p>
            <div className={styles.modalFooter}>
              <button className={styles.secondaryBtn} onClick={() => setDeleteModal(false)}>
                Cancel
              </button>
              <button className={styles.primaryBtn} onClick={handleDelete}>
                Yes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
