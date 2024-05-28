import React from "react";
import {
  Input,
  Button,
} from "@nextui-org/react";
import { AgentsInput } from "./agents-input";
import lodash from "lodash";

export const LogsTableFilters = ({ queryLogs, onLocalSearch }) => {
  const [logsQueryParams, setLogsQueryParams] = React.useState({
    microServiceName: "",
    customerReference: "",
    orderReference: "",
    correlationId: "",
  });

  const handleInputChange = (inputArgs) => {
    setLogsQueryParams({
      ...logsQueryParams,
      ...inputArgs,
    });
  }

  const handleOnQuery = () => {
    queryLogs(logsQueryParams);
  }

  const debouncedSearch = lodash.debounce((searchText) => {
    onLocalSearch && onLocalSearch(searchText);
  }
  , 500);

  return (
    <>
      <div className="flex gap-4">
        <div className="flex-1">
          <AgentsInput onChange={microServiceName => handleInputChange({ microServiceName })} />
        </div>
        <div className="flex-1">
          <Input
            bordered
            placeholder="Order reference"
            onChange={e => handleInputChange({ orderReference: e.target.value })}
          />
        </div>
        <div className="flex-1">
          <Input
            bordered
            placeholder="Customer reference"
            onChange={e => handleInputChange({ customerReference: e.target.value })}
          />
        </div>
        <div className="flex-1">
          <Input
            bordered
            placeholder="Correlation ID"
            onChange={e => handleInputChange({ correlationId: e.target.value })}
          />
        </div>
        <div>
          <Button auto onClick={handleOnQuery}>Buscar</Button>
        </div>
      </div>
      <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
        <Input
          type="text"
          label="Buscar"
          onChange={(e) => debouncedSearch(e.target.value)}
          placeholder="Ingresa un criterio de búsqueda"
        />
      </div>
    </>
  ); 
};
