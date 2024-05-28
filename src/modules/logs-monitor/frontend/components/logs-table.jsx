import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  CircularProgress,
} from "@nextui-org/react";
import { useService } from "../../../shared/frontend/hooks/use-service";

import { logsService } from "../services";
import { LogsTableFilters } from "./logs-table-filters";
import { renderCell } from "./render-cell";

const columns = [
  { name: "Agente", uid: "microServiceName" },
  { name: "Order reference", uid: "orderReference" },
  { name: "Customer reference", uid: "customerReference" },
  { name: "Level", uid: "level" },
  { name: "Mensaje", uid: "message" },
  { name: "Fecha", uid: "timestamp" },
  { name: "", uid: "actions" },
];


export const LogsTable = ({ onViewDetail }) => {
  const logsQuery = useService(logsService.getLogs, { args: {} });
  const [searchText, setSearchText] = React.useState("");

  return (
    <div className="flex flex-col gap-4">
      <LogsTableFilters />
      <Table
        aria-label="Logs table"
        classNames={{
          table: "min-h-[400px] overflow-x-auto",
        }}
      >
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn
              key={column.uid}
              align={column.uid === "actions" ? "center" : "start"}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody
          loadingContent={
            <div className="flex gap-4 display-block">
              <CircularProgress size="lg" aria-label="Loading..." />
            </div>
          }
          isLoading={logsQuery.loading}
          items={logsQuery.data || []}
        >
          {(item) => (
            <TableRow key={item._id}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};
