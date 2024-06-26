import {
  Chip,
  Tooltip
} from "@nextui-org/react";
import { FaEye } from "react-icons/fa";

const statusColorMap = {
  info: "primary",
  error: "danger",
  dangerous: "warning",
};

export const renderCell = ({ log, columnKey, onViewDetail }) => {
  const cellValue = log[columnKey];

  switch (columnKey) {
    case "microServiceName":
      return <p className="text-bold text-nowrap">{cellValue}</p>;
    case "order_reference":
      return <p className="text-nowrap">{log?.order_reference}</p>;
    case "customer_reference":
      return <p className="text-nowrap">{log?.customer_reference}</p>;
    case "correlationId":
      return <p className="text-nowrap">{log?.correlationId}</p>;
    case "timestamp":
      return new Date(cellValue).toLocaleString();
    case "message":
      return <p style={{
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
      }}>{log.message}</p>;
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
            <span
              className="text-lg text-default-400 cursor-pointer active:opacity-50"
              onClick={() => onViewDetail(log)}>
              <FaEye />
            </span>
          </Tooltip>
        </div>
      );
    default:
      return cellValue;
  }
};
