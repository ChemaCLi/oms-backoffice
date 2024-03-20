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
  { name: "Agente", uid: "microServiceName" },
  { name: "Order reference", uid: "orderReference" },
  { name: "Customer reference", uid: "customerReference" },
  { name: "Level", uid: "level" },
  { name: "Mensaje", uid: "message" },
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

  console.log({ logsQuery });

  const renderCell = React.useCallback((log, columnKey) => {
    console.log({ columnKey })
    const cellValue = log[columnKey];

    switch (columnKey) {
      case "microServiceName":
        return <p className="text-bold">{cellValue}</p>;
      case "orderReference":
        return <p>{log.data?.order_reference}</p>;
      case "customerReference":
        return <p>{log.data?.customer_reference}</p>;
      case "timestamp":
        return new Date(cellValue).toLocaleString();
      case "message":
        return <p>{log.message}</p>;
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
