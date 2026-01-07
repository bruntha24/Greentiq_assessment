"use client";

import React, { useState, useEffect } from "react";
import { CheckboxTable, Column } from "../CheckboxTable";
import {
  Pencil,
  RotateCw,
  X,
  Plus,
  XCircle,
  PauseCircle,
  Clock,
  CheckCircle,
} from "lucide-react";
import styles from "./Sales.module.css";
import {
  fetchSales,
  createSale,
  updateSale,
  deleteSales,
  Sale,
} from "@/api/company/sales";

export default function Sales() {
  const [sales, setSales] = useState<Sale[]>([]);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [sortOrder, setSortOrder] = useState<
    "lowToHigh" | "highToLow" | "none"
  >("none");

  const [formData, setFormData] = useState<Sale>({
    saleName: "",
    status: "Open",
    saleDate: "",
    amount: 0,
    stage: "",
    nextActivity: "",
  });

  /* ================= FETCH SALES ================= */
  useEffect(() => {
    const loadSales = async () => {
      try {
        const data = await fetchSales();
        const formatted = data.map((s: Sale) => ({
          ...s,
          saleDate: s.saleDate?.split("T")[0] || "",
          nextActivity: s.nextActivity?.split("T")[0] || "",
        }));
        setSales(formatted);
      } catch (error) {
        console.error("Fetch Sales Error:", error);
        setSales([]);
      }
    };

    loadSales();
  }, []);

  /* ================= SELECTION ================= */
  const toggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    const validIds = sales.map((s) => s._id).filter(Boolean) as string[];
    setSelectedIds(
      selectedIds.length === validIds.length ? [] : validIds
    );
  };

  /* ================= SORT ================= */
  const sortedSales = [...sales];
  if (sortOrder === "lowToHigh") {
    sortedSales.sort((a, b) => a.amount - b.amount);
  }
  if (sortOrder === "highToLow") {
    sortedSales.sort((a, b) => b.amount - a.amount);
  }

  /* ================= FORM ================= */
  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "amount" ? Number(value) : value,
    }));
  };

  const resetForm = () => {
    setFormData({
      saleName: "",
      status: "Open",
      saleDate: "",
      amount: 0,
      stage: "",
      nextActivity: "",
    });
  };

  /* ================= ADD ================= */
  const submitAddForm = async () => {
    try {
      const newSale = await createSale(formData);
      setSales((prev) => [
        ...prev,
        {
          ...newSale,
          saleDate: newSale.saleDate?.split("T")[0] || "",
          nextActivity: newSale.nextActivity?.split("T")[0] || "",
        },
      ]);
      setShowAddForm(false);
      resetForm();
    } catch (error) {
      console.error("Add Sale Error:", error);
    }
  };

  /* ================= EDIT ================= */
  const submitEditForm = async () => {
    if (!selectedIds[0]) return;

    try {
      const updated = await updateSale(selectedIds[0], formData);
      setSales((prev) =>
        prev.map((s) =>
          s._id === selectedIds[0]
            ? {
                ...updated,
                saleDate: updated.saleDate?.split("T")[0] || "",
                nextActivity: updated.nextActivity?.split("T")[0] || "",
              }
            : s
        )
      );
      setSelectedIds([]);
      setShowEditForm(false);
      resetForm();
    } catch (error) {
      console.error("Edit Sale Error:", error);
    }
  };

  /* ================= DELETE ================= */
  const confirmDelete = async () => {
    try {
      await deleteSales(selectedIds);
      setSales((prev) =>
        prev.filter((s) => !selectedIds.includes(s._id!))
      );
      setSelectedIds([]);
      setShowDeleteConfirm(false);
    } catch (error) {
      console.error("Delete Sale Error:", error);
    }
  };

  /* ================= PREFILL EDIT ================= */
  useEffect(() => {
    if (showEditForm && selectedIds.length === 1) {
      const sale = sales.find((s) => s._id === selectedIds[0]);
      if (sale) setFormData(sale);
    }
  }, [showEditForm, selectedIds, sales]);

  /* ================= STATUS BADGE ================= */
  const statusClass = (status: string) => {
    switch (status) {
      case "Open":
        return styles.statusOpen;
      case "Lost":
        return styles.statusLost;
      case "Sold":
        return styles.statusSold;
      case "Stalled":
        return styles.statusStalled;
      default:
        return "";
    }
  };

  const statusIcon = (status: string) => {
    switch (status) {
      case "Sold":
        return <CheckCircle size={14} />;
      case "Lost":
        return <XCircle size={14} />;
      case "Stalled":
        return <PauseCircle size={14} />;
      case "Open":
        return <Clock size={14} />;
      default:
        return null;
    }
  };

  /* ================= COLUMNS ================= */
  const columns: Column<Sale>[] = [
    {
      header: "Status",
      accessor: (row) => (
        <span
          className={`${styles.statusBadge} ${statusClass(row.status)}`}
        >
          {statusIcon(row.status)}
          <span className={styles.statusText}>{row.status}</span>
        </span>
      ),
    },
    { header: "Sale Date", accessor: "saleDate" },
    { header: "Amount", accessor: "amount" },
    { header: "Stage", accessor: "stage" },
    { header: "Next Activity", accessor: "nextActivity" },
    { header: "Sale Name", accessor: "saleName" },
  ];

  return (
    <div className={styles.card}>
      <CheckboxTable<Sale>
        data={sortedSales}
        columns={columns}
        selectedIds={selectedIds}
        onToggleSelect={toggleSelect}
        onToggleSelectAll={toggleSelectAll}
        rowIdKey="_id"
        tableClassName={styles.table}
        rowClassName={(row, selected) =>
          selected ? styles.rowSelected : ""
        }
        checkboxCellClassName={styles.checkboxCell}
      />

      {/* ================= TOOLBAR ================= */}
      <div className={styles.bottomControls}>
        <div className={styles.actionButtons}>
          <button
            className={styles.actionBtn}
            onClick={() => setShowAddForm(true)}
          >
            <Plus size={16} /> Add
          </button>

          <button
            className={`${styles.actionBtn} ${
              !selectedIds.length ? styles.disabled : ""
            }`}
            onClick={() => setShowDeleteConfirm(true)}
            disabled={!selectedIds.length}
          >
            Delete
          </button>

          <div className={styles.dropdown}>
            <button className={styles.dropbtn}>Filter</button>
            <div className={styles.dropdownContent}>
              <button onClick={() => setSortOrder("lowToHigh")}>
                Low → High
              </button>
              <button onClick={() => setSortOrder("highToLow")}>
                High → Low
              </button>
              <button onClick={() => setSortOrder("none")}>
                Reset
              </button>
            </div>
          </div>
        </div>

        <div className={styles.rightControls}>
          <button
            className={`${styles.actionBtn} ${
              selectedIds.length !== 1 ? styles.disabled : ""
            }`}
            onClick={() => setShowEditForm(true)}
            disabled={selectedIds.length !== 1}
          >
            <Pencil size={16} />
          </button>

          <button
            className={styles.actionBtn}
            onClick={() => setSales([...sales])}
          >
            <RotateCw size={16} />
          </button>
        </div>
      </div>

      {/* ================= MODALS ================= */}
      {(showAddForm || showEditForm || showDeleteConfirm) && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <button
              className={styles.closeButton}
              onClick={() => {
                setShowAddForm(false);
                setShowEditForm(false);
                setShowDeleteConfirm(false);
              }}
            >
              <X size={16} />
            </button>

            {showDeleteConfirm && (
              <>
                <h3>Confirm Delete</h3>
                <p>
                  Are you sure you want to delete {selectedIds.length} sale(s)?
                </p>
                <div className={styles.modalButtons}>
                  <button
                    className={styles.deleteButton}
                    onClick={confirmDelete}
                  >
                    Yes, Delete
                  </button>
                  <button
                    className={styles.cancelButton}
                    onClick={() => setShowDeleteConfirm(false)}
                  >
                    Cancel
                  </button>
                </div>
              </>
            )}

            {(showAddForm || showEditForm) && (
              <>
                <h3>{showAddForm ? "Add Sale" : "Edit Sale"}</h3>

                <select
                  name="status"
                  value={formData.status}
                  onChange={handleFormChange}
                >
                  <option>Open</option>
                  <option>Lost</option>
                  <option>Sold</option>
                  <option>Stalled</option>
                </select>

                <input
                  name="saleDate"
                  type="date"
                  value={formData.saleDate}
                  onChange={handleFormChange}
                />
                <input
                  name="amount"
                  type="number"
                  value={formData.amount}
                  onChange={handleFormChange}
                  placeholder="Amount"
                />
                <input
                  name="stage"
                  value={formData.stage}
                  onChange={handleFormChange}
                  placeholder="Stage"
                />
                <input
                  name="nextActivity"
                  type="date"
                  value={formData.nextActivity}
                  onChange={handleFormChange}
                />
                <input
                  name="saleName"
                  value={formData.saleName}
                  onChange={handleFormChange}
                  placeholder="Sale Name"
                />

                <div className={styles.modalButtons}>
                  <button
                    className={styles.addButton}
                    onClick={
                      showAddForm ? submitAddForm : submitEditForm
                    }
                  >
                    {showAddForm ? "Add" : "Save"}
                  </button>
                  <button
                    className={styles.cancelButton}
                    onClick={() => {
                      setShowAddForm(false);
                      setShowEditForm(false);
                      resetForm();
                    }}
                  >
                    Cancel
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
