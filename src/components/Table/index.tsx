import React from "react";
import Loader from "../Loader";
import { ITable } from "./types";
import Edit from "../../images/Edit";
import Eye from "../../images/Eye";
import Delete from "../../images/Delete";
import Disable from "../../images/Disable";

function Table({
  columns,
  data,
  loader,
  handleEdit,
  handleDisable,
  handleDelete,
  action,
  disabledRows,
  mode,
}: ITable) {
  return (
    <div className="overflow-y-auto h-4/5 rounded-t-lg">
      <table className="w-full border-collapse border-spacing-y-4 rounded-t">
        <thead className="sticky top-0 bg-zinc-800">
          <tr className="text-xs">
            {columns.map((col) => (
              <th
                key={col.header}
                className="text-left w-1/6 font-medium p-5 text-yellow-500"
              >
                <span className="rounded-lg p-2 bg-zinc-950">{col.header}</span>
              </th>
            ))}
            {action && (
              <th className="text-left w-1/6 font-medium p-5 text-yellow-500">
                <span className="rounded-lg p-2 bg-zinc-950">Action</span>
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {loader ? (
            <tr>
              <td colSpan={columns.length} className="text-center">
                <Loader />
              </td>
            </tr>
          ) : data !== null && data.length > 0 ? (
            data.map((item: any) => (
              <tr
                key={item.name}
                className={`bg-zinc-800 py-8 border-y-slate-800 text-sm`}
              >
                {columns.map((col) => (
                  <td
                    key={col.accessor}
                    className={`text-left p-4 w-1/6 ${
                      disabledRows.includes(item.name)
                        ? "opacity-50 pointer-events-none"
                        : ""
                    }`}
                  >
                    {item[col.accessor]}
                  </td>
                ))}
                <td
                  className={`text-left p-4 w-full flex gap-4 ${
                    mode === "user" ? "opacity-50 pointer-events-none" : ""
                  }`}
                >
                  <span
                    className={`text-green-500 cursor-pointer ${
                      disabledRows.includes(item.name)
                        ? "opacity-50 pointer-events-none"
                        : ""
                    }`}
                    onClick={() => handleEdit(item)}
                  >
                    <Edit />
                  </span>
                  <span
                    className="text-pink-500 cursor-pointer"
                    onClick={() => handleDisable(item)}
                  >
                    {disabledRows.includes(item.name) ? <Disable /> : <Eye />}
                  </span>
                  <span
                    className="text-red-500 cursor-pointer"
                    onClick={() => handleDelete(item)}
                  >
                    <Delete />
                  </span>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length} className="py-4 text-center">
                No Data
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
