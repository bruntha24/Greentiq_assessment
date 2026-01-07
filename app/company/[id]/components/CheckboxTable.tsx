"use client";

import React from "react";
import "./CheckboxTable.module.css";

/* =======================
   TYPES
======================= */

export interface Column<T> {
  header: React.ReactNode;
  accessor: keyof T | ((row: T) => React.ReactNode);
  className?: string;
}

interface CheckboxTableProps<T> {
  data: T[];
  columns: Column<T>[];
  selectedIds: (string | number)[];
  onToggleSelect: (id: string | number) => void;
  onToggleSelectAll?: (checked: boolean) => void;
  rowIdKey?: keyof T;
  rowClassName?: (row: T, selected: boolean) => string;
  tableClassName?: string;
  checkboxClassName?: string;
  checkboxCellClassName?: string;
  cellClassName?: (columnHeader: string) => string;
}

/* =======================
   COMPONENT
======================= */

export function CheckboxTable<T>({
  data,
  columns,
  selectedIds,
  onToggleSelect,
  onToggleSelectAll,
  rowIdKey = "id" as keyof T,
  rowClassName,
  tableClassName = "",
  checkboxClassName = "",
  checkboxCellClassName = "",
  cellClassName,
}: CheckboxTableProps<T>) {
  const allSelected = data.length > 0 && selectedIds.length === data.length;

  return (
    <table className={`checkbox-table ${tableClassName}`}>
      <thead>
        <tr>
          <th className={`checkbox-col ${checkboxCellClassName}`}>
            <input
              type="checkbox"
              checked={allSelected}
              onChange={(e) => onToggleSelectAll?.(e.target.checked)}
              className={checkboxClassName}
            />
          </th>

          {columns.map((col, idx) => (
            <th key={idx} className={col.className}>
              {col.header}
            </th>
          ))}
        </tr>
      </thead>

      <tbody>
        {data.map((row) => {
          const rowId = row[rowIdKey] as unknown as string | number;
          const selected = selectedIds.includes(rowId);

          return (
            <tr
              key={rowId}
              className={`${selected ? "selected" : ""} ${
                rowClassName ? rowClassName(row, selected) : ""
              }`}
            >
              <td className={`checkbox-col ${checkboxCellClassName}`}>
                <input
                  type="checkbox"
                  checked={selected}
                  onChange={() => onToggleSelect(rowId)}
                  className={checkboxClassName}
                />
              </td>

              {columns.map((col, idx) => {
                const value =
                  typeof col.accessor === "function"
                    ? col.accessor(row)
                    : (row[col.accessor] as React.ReactNode);

                const tdClass =
                  col.className ||
                  (cellClassName
                    ? cellClassName(String(col.header))
                    : "");

                return (
                  <td key={idx} className={tdClass}>
                    {value}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
