import React from "react";
import {
  Input,
  Button,
} from "@nextui-org/react";

export const LogsTableFilters = ({ queryLogs, onLocalSearch }) => {
  const [searchText, setSearchText] = React.useState("");
  const [logsQueryParams, setLogsQueryParams] = React.useState({
    microServiceName: "",
    customerReference: "",
    orderReference: "",
    correlationId: "",
  });

  return (
    <>
      <div className="flex gap-4">
        <div className="flex-1">
          <Input
            bordered
            placeholder="Agente"
          />
        </div>
        <div className="flex-1">
          <Input
            bordered
            placeholder="Order reference"
          />
        </div>
        <div className="flex-1">
          <Input
            bordered
            placeholder="Customer reference"
          />
        </div>
        <div className="flex-1">
          <Input
            bordered
            placeholder="Correlation ID"
          />
        </div>
        <div>
          <Button auto>Buscar</Button>
        </div>
      </div>
      <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
        <Input
          type="text"
          label="Buscar"
          onChange={(e) => setSearchText(e.target.value)}
          placeholder="Ingresa un criterio de búsqueda"
        />
      </div>
    </>
  ); 
};
