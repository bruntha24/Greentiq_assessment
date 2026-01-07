"use client";

import React, { useEffect, useState } from "react";
import { Plus, Pencil, RotateCw, X } from "lucide-react";
import { CheckboxTable, Column } from "../CheckboxTable";
import styles from "./Contacts.module.css";

import {
  fetchContacts,
  createContact,
  updateContact,
  deleteContacts,
  ContactType,
} from "@/api/company/contact";

export default function Contacts() {
  const [contacts, setContacts] = useState<ContactType[]>([]);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const hasSelection = selectedIds.length > 0;

  const [formData, setFormData] = useState<ContactType>({
    name: "",
    email: "",
    phone: "",
    message: "",
    status: "New",
  });

  /* ===== FETCH ===== */
  useEffect(() => {
    fetchContacts().then(setContacts).catch(console.error);
  }, []);

  /* ===== RESET ===== */
  const resetAll = () => {
    setSelectedIds([]);
    setFormData({
      name: "",
      email: "",
      phone: "",
      message: "",
      status: "New",
    });
  };

  const closeModal = () => {
    setOpenAdd(false);
    setOpenEdit(false);
    setOpenDelete(false);
    resetAll();
  };

  /* ===== CRUD ===== */
  const handleAdd = async () => {
    const created = await createContact(formData);
    setContacts((p) => [...p, created]);
    closeModal();
  };

  const handleEdit = async () => {
    if (!selectedIds[0]) return;
    const updated = await updateContact(selectedIds[0], formData);
    setContacts((p) =>
      p.map((c) => (c._id === updated._id ? updated : c))
    );
    closeModal();
  };

  const handleDelete = async () => {
    await deleteContacts(selectedIds);
    setContacts((p) => p.filter((c) => !selectedIds.includes(c._id!)));
    closeModal();
  };

  useEffect(() => {
    if (openEdit && selectedIds.length === 1) {
      const c = contacts.find((x) => x._id === selectedIds[0]);
      if (c) setFormData(c);
    }
  }, [openEdit, selectedIds, contacts]);

  /* ===== TABLE COLUMNS ===== */
  const columns: Column<ContactType>[] = [
    { header: "Name", accessor: "name" },
    {
      header: "Email",
      accessor: (row) => (
        <span className={styles.emailCell}>{row.email}</span>
      ),
    },
    { header: "Phone", accessor: "phone" },
    {
      header: "Status",
      accessor: (row) => (
        <span
          className={`${styles.status} ${
            styles[row.status.replace(" ", "").toLowerCase()]
          }`}
        >
          {row.status}
        </span>
      ),
    },
  ];

  if (!contacts.length) return <p>Loading contacts...</p>;

  return (
    <div className={styles.salesTableContainer}>
      {/* ===== TABLE ===== */}
      <CheckboxTable
        data={contacts}
        columns={columns}
        selectedIds={selectedIds}
        onToggleSelect={(id) =>
          setSelectedIds((p) =>
            p.includes(id) ? p.filter((x) => x !== id) : [...p, id]
          )
        }
        onToggleSelectAll={() =>
          setSelectedIds(
            selectedIds.length === contacts.length
              ? []
              : contacts.map((c) => c._id!)
          )
        }
        rowIdKey="_id"
      />

      {/* ===== FOOTER ACTIONS ===== */}
      <div className={styles.tableFooter}>
        <div className={styles.footerLeftActions}>
          <button className={styles.btnAdd} onClick={() => setOpenAdd(true)}>
            <Plus size={16} /> Add
          </button>

          <button
            className={`${styles.btnDelete} ${
              hasSelection ? styles.active : ""
            }`}
            disabled={!hasSelection}
            onClick={() => setOpenDelete(true)}
          >
            Delete
          </button>

          <button className={styles.btnFilter}>Filter</button>
        </div>

        <div className={styles.footerRightActions}>
          <Pencil
            size={18}
            className={styles.iconBtn}
            onClick={() =>
              selectedIds.length === 1 && setOpenEdit(true)
            }
          />
          <RotateCw
            size={18}
            className={styles.iconBtn}
            onClick={resetAll}
          />
        </div>
      </div>

      {/* ===== MODAL ===== */}
      {(openAdd || openEdit || openDelete) && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <X className={styles.modalClose} onClick={closeModal} />

            {openDelete ? (
              <>
                <h3 className={styles.modalTitle}>
                  Do you want to delete this?
                </h3>
                <div className={styles.modalActions}>
                  <button
                    className={styles.btnOutline}
                    onClick={closeModal}
                  >
                    Cancel
                  </button>
                  <button
                    className={styles.btnPrimary}
                    onClick={handleDelete}
                  >
                    Delete
                  </button>
                </div>
              </>
            ) : (
              <>
                <h3 className={styles.modalTitle}>
                  {openAdd ? "Add Contact" : "Edit Contact"}
                </h3>

                <input
                  className={styles.modalInput}
                  placeholder="Name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
                <input
                  className={styles.modalInput}
                  placeholder="Email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
                <input
                  className={styles.modalInput}
                  placeholder="Phone"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                />

                <select
                  className={styles.modalInput}
                  value={formData.status}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      status: e.target.value as any,
                    })
                  }
                >
                  <option>New</option>
                  <option>In Progress</option>
                  <option>Resolved</option>
                </select>

                <div className={styles.modalActions}>
                  <button
                    className={styles.btnOutline}
                    onClick={closeModal}
                  >
                    Cancel
                  </button>
                  <button
                    className={styles.btnPrimary}
                    onClick={openAdd ? handleAdd : handleEdit}
                  >
                    Save
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
