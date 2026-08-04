"use client";

import type { AdminColumn } from "./admin-types";

interface AdminTableProps<T> {
  columns: AdminColumn<T>[];
  items: T[];
  onEdit: (item: T) => void;
  onDelete?: (item: T) => void;
  emptyLabel?: string;
}

export function AdminTable<T extends Record<string, unknown> & { id: string | number }>({
  columns,
  items,
  onEdit,
  onDelete,
  emptyLabel = "No records found.",
}: AdminTableProps<T>) {
  return (
    <div className="overflow-x-auto rounded-3xl border border-slate-800 bg-slate-900 p-2">
      <table className="min-w-full divide-y divide-slate-700 text-left text-sm text-slate-200">
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.key} className="px-3 py-3 font-semibold text-slate-300">
                {column.label}
              </th>
            ))}
            <th className="px-3 py-3 font-semibold text-slate-300">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-800">
          {items.length === 0 ? (
            <tr>
              <td colSpan={columns.length + 1} className="px-3 py-5 text-slate-400">
                {emptyLabel}
              </td>
            </tr>
          ) : (
            items.map((item) => (
              <tr key={String(item.id)} className="hover:bg-slate-950/80">
                {columns.map((column) => (
                  <td key={column.key} className="px-3 py-3 align-top">
                    {column.render ? column.render(item) : String((item as any)[column.key] ?? "")}
                  </td>
                ))}
                <td className="px-3 py-3 align-top space-x-2">
                  <button
                    type="button"
                    onClick={() => onEdit(item)}
                    className="rounded-xl bg-slate-700 px-3 py-1 text-sm text-slate-100 transition hover:bg-slate-600"
                  >
                    Edit
                  </button>
                  {onDelete && (
                    <button
                      type="button"
                      onClick={() => onDelete(item)}
                      className="rounded-xl bg-rose-600 px-3 py-1 text-sm text-white transition hover:bg-rose-500"
                    >
                      Delete
                    </button>
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
