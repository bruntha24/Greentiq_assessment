"use client";

import React, { useEffect, useState } from "react";
import { CheckboxTable, Column } from "../CheckboxTable";
import { Plus, Trash2, Filter, X, Pencil, RotateCw } from "lucide-react";
import {
  fetchProjects,
  createProject,
  updateProject,
  deleteProjects,
  Project,
} from "@/api/company/project";
import styles from "./Projects.module.css";

const initialFormState: Project = {
  _id: undefined,
  name: "",
  client: "",
  status: "Planned",
  priority: "Medium",
  startDate: "",
  endDate: "",
};

export default function ProjectsComponent() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [form, setForm] = useState<Project>(initialFormState);
  const [openModal, setOpenModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const loadProjects = async () => {
    const data = await fetchProjects();
    setProjects(data);
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const columns: Column<Project>[] = [
    { header: "Project Name", accessor: "name" },
    { header: "Client", accessor: "client" },
    {
      header: "Status",
      accessor: (row) => (
        <span
          className={
            row.status === "Completed"
              ? styles.statusCompleted
              : row.status === "In Progress"
              ? styles.statusProgress
              : styles.statusPlanned
          }
        >
          {row.status}
        </span>
      ),
    },
    {
      header: "Priority",
      accessor: (row) => (
        <span
          className={
            row.priority === "High"
              ? styles.priorityHigh
              : row.priority === "Medium"
              ? styles.priorityMedium
              : styles.priorityLow
          }
        >
          {row.priority}
        </span>
      ),
    },
    { header: "Start Date", accessor: "startDate" },
    { header: "End Date", accessor: "endDate" },
  ];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = async () => {
    if (!form.name || !form.client) return;

    editingId
      ? await updateProject(editingId, form)
      : await createProject(form);

    setOpenModal(false);
    setForm(initialFormState);
    setEditingId(null);
    setSelectedIds([]);
    await loadProjects();
  };

  const handleDelete = async () => {
    await deleteProjects(selectedIds);
    setDeleteModal(false);
    setSelectedIds([]);
    await loadProjects();
  };

  return (
    <div className={styles.card}>
      <CheckboxTable<Project>
        data={projects}
        columns={columns}
        rowIdKey="_id"
        tableClassName={styles.table}
        selectedIds={selectedIds}
        onToggleSelect={(id) =>
          setSelectedIds((prev) =>
            prev.includes(id)
              ? prev.filter((x) => x !== id)
              : [...prev, id]
          )
        }
        onToggleSelectAll={() =>
          setSelectedIds(
            selectedIds.length === projects.length
              ? []
              : projects.map((p) => p._id!)
          )
        }
      />

      {/* BOTTOM CONTROLS */}
      <div className={styles.bottomControls}>
        <div className={styles.actionButtons}>
          <button
            className={styles.actionBtn}
            onClick={() => {
              setForm(initialFormState);
              setEditingId(null);
              setOpenModal(true);
            }}
          >
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

        <div className={styles.rightIcons}>
          <Pencil
            size={18}
            onClick={() => {
              if (selectedIds.length !== 1) return;
              const project = projects.find((p) => p._id === selectedIds[0]);
              if (!project) return;
              setForm(project);
              setEditingId(project._id!);
              setOpenModal(true);
            }}
          />

          <RotateCw
            size={18}
            onClick={() => {
              setSelectedIds([]);
              setForm(initialFormState);
              setEditingId(null);
            }}
          />
        </div>
      </div>

      {/* ADD / EDIT MODAL */}
      {openModal && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <div className={styles.modalHeader}>
              <h3>{editingId ? "Edit Project" : "Add Project"}</h3>
              <X
                onClick={() => {
                  setOpenModal(false);
                  setForm(initialFormState);
                  setEditingId(null);
                }}
              />
            </div>

            <div className={styles.modalBody}>
              <input
                className={styles.input}
                name="name"
                placeholder="Project name"
                value={form.name}
                onChange={handleChange}
              />
              <input
                className={styles.input}
                name="client"
                placeholder="Client"
                value={form.client}
                onChange={handleChange}
              />
              <select
                className={styles.input}
                name="status"
                value={form.status}
                onChange={handleChange}
              >
                <option>Planned</option>
                <option>In Progress</option>
                <option>Completed</option>
              </select>
              <select
                className={styles.input}
                name="priority"
                value={form.priority}
                onChange={handleChange}
              >
                <option>High</option>
                <option>Medium</option>
                <option>Low</option>
              </select>
              <input
                className={styles.input}
                type="date"
                name="startDate"
                value={form.startDate}
                onChange={handleChange}
              />
              <input
                className={styles.input}
                type="date"
                name="endDate"
                value={form.endDate}
                onChange={handleChange}
              />
            </div>

            <div className={styles.modalFooter}>
              <button
                className={styles.secondaryBtn}
                onClick={() => {
                  setOpenModal(false);
                  setForm(initialFormState);
                  setEditingId(null);
                }}
              >
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
              <h3>Delete Projects</h3>
              <X onClick={() => setDeleteModal(false)} />
            </div>
            <p>Do you want to delete the selected project(s)?</p>
            <div className={styles.modalFooter}>
              <button
                className={styles.secondaryBtn}
                onClick={() => setDeleteModal(false)}
              >
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
