import React from "react";
import {
  Input,
  Button,
} from "@nextui-org/react";
import { AgentsInput } from "./agents-input";
import lodash from "lodash";

export const LogsTableFilters = ({ queryLogs, onLocalSearch }) => {
  const [logsQueryParams, setLogsQueryParams] = React.useState({
    microServiceName: [],
    customerReference: [],
    orderReference: [],
    correlationId: [],
  });

  const handleInputChange = (inputArgs) => {
    const [key, value] = Object.entries(inputArgs)[0];
    const commaSeparatedValues = (value || '').split(',').map((v) => v.trim());

    setLogsQueryParams((prev) => {
      const updatedFilter = commaSeparatedValues;
      return {
        ...prev,
        [key]: updatedFilter,
      };
    });
  }

  const handleOnQuery = () => {
    queryLogs(logsQueryParams);
  }

  const onEnter = () => {
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
          <AgentsInput
            onEnter={onEnter}
            onChange={microServiceName => handleInputChange({ microServiceName })} />
        </div>
        <div className="flex-1">
          <Input
            bordered
            placeholder="Order reference"
            onChange={e => handleInputChange({ orderReference: e.target.value })}
            onKeyDown={(e) => {
              if (e.key === 'Enter') onEnter && onEnter();
            }}
          />
        </div>
        <div className="flex-1">
          <Input
            bordered
            placeholder="Customer reference"
            onChange={e => handleInputChange({ customerReference: e.target.value })}
            onKeyDown={(e) => {
              if (e.key === 'Enter') onEnter && onEnter();
            }}
          />
        </div>
        <div className="flex-1">
          <Input
            bordered
            placeholder="Correlation ID"
            onChange={e => handleInputChange({ correlationId: e.target.value })}
            onKeyDown={(e) => {
              if (e.key === 'Enter') onEnter && onEnter();
            }}
          />
        </div>
        <div>
          <Button auto onClick={handleOnQuery}>Buscar</Button>
        </div>
      </div>
      <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
        <Input
          type="text"
          onChange={(e) => debouncedSearch(e.target.value)}
          placeholder="Buscar en los resultados..."
        />
      </div>
    </>
  ); 
};
