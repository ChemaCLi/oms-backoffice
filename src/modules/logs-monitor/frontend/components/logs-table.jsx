import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Chip,
  Tooltip,
  CircularProgress,
  Input,
} from "@nextui-org/react";
import { useService } from "../../../shared/frontend/hooks/use-service";

import { FaEye } from "react-icons/fa";
import { logsService } from "../services";

const columns = [
  { name: "Agente", uid: "microserviceName" },
  { name: "Order reference", uid: "orderReference" },
  { name: "Customer reference", uid: "customerReference" },
  { name: "Level", uid: "level" },
  { name: "Fecha", uid: "timestamp" },
  { name: "", uid: "actions" },
];

const statusColorMap = {
  info: "primary",
  error: "danger",
  dangerous: "warning",
};

export const LogsTable = ({ onViewDetail }) => {
  const logsQuery = useService(logsService.getLogs);
  const [searchText, setSearchText] = React.useState("");

  const filteredLogs = React.useMemo(() => {
    if (!searchText) return logsQuery.data;

    return logsQuery.data.filter((log) => {
      const searchableString = Object.values(log).join(" ");
      return searchableString.toLowerCase().includes(searchText.toLowerCase());
    });
  }, [logsQuery.data, searchText]);

  const renderCell = React.useCallback((log, columnKey) => {
    const cellValue = log[columnKey];

    switch (columnKey) {
      case "microserviceName":
        return <p className="text-bold">{cellValue}</p>;
      case "orderReference":
        return <p>{cellValue}</p>;
      case "customerReference":
        return <p>{cellValue}</p>;
      case "timestamp":
        return new Date(cellValue).toLocaleString();
      case "level":
        return (
          <Chip color={statusColorMap[log.level]} size="sm" variant="flat">
            {cellValue}
          </Chip>
        );
      case "actions":
        return (
          <div className="relative flex items-center gap-2">
            <Tooltip content="Detalles">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50" onClick={() => onViewDetail(log)}>
                <FaEye />
              </span>
            </Tooltip>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
        <Input
          type="text"
          label="Buscar"
          onChange={(e) => setSearchText(e.target.value)}
          placeholder="Ingresa un criterio de búsqueda"
        />
      </div>
      <Table
        aria-label="Logs table"
        classNames={{
          table: "min-h-[400px]",
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
          items={filteredLogs || []}
        >
          {(item) => (
            <TableRow key={item.id}>
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
