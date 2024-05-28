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
  
  const [filteredResults, setFilteredResults] = React.useState([]);

  React.useEffect(() => {
    if (logsQuery.data) {
      setFilteredResults(logsQuery.data || []);
    }
  }
  , [logsQuery.data]);

  const onLocalSearch = (searchText) => {
    console.log(searchText)
    if (!searchText) {
      setFilteredResults(logsQuery.data || []);
      return;
    }

    const filtered = filteredResults.filter((log) => {
      const searchableString = `${log.microServiceName} ${log.order_reference} ${log.customer_reference} ${log.level} ${log.message} ${log.timestamp}`;
      return searchableString.toLowerCase().includes(searchText.toLowerCase());
    });

    console.log(filtered)

    setFilteredResults(filtered);
  };

  const queryLogs = (logsQueryParams) => {
    logsQuery.refetch(logsQueryParams);
  }

  return (
    <div className="flex flex-col gap-4">
      <LogsTableFilters onLocalSearch={onLocalSearch} queryLogs={queryLogs} />
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
          items={filteredResults || []}
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
