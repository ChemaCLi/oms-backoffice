import { Input } from '@nextui-org/react';
import React, { useState } from 'react';

export const AgentsInput = ({ onChange, onEnter }) => {
  const suggestions = [
    { value: "INTEGRATIONS_WORKER", label: "INTEGRATIONS_WORKER" },
    { value: "INTEGRATIONS_REST", label: "INTEGRATIONS_REST" },
    { value: "INSTALEAP_WORKER", label: "INSTALEAP_WORKER" },
    { value: "INSTALEAP_REST", label: "INSTALEAP_REST" },
    { value: "OMS_WORKER", label: "OMS_WORKER" },
    { value: "OMS_REST", label: "OMS_REST" },
  ];

  const [inputValue, setInputValue] = useState('');
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleChange = (e) => {
    const value = e.target.value;
    setInputValue(value);

    if (value) {
      const filtered = suggestions.filter((suggestion) =>
        suggestion.label.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setFilteredSuggestions([]);
      setShowSuggestions(false);
    }

    onChange && onChange(value);
  };

  const handleClear = () => {
    setInputValue('');
    setFilteredSuggestions([]);
    setShowSuggestions(false);
  };

  const handleSuggestionClick = (suggestion) => {
    setInputValue(suggestion.label);
    setFilteredSuggestions([]);
    setShowSuggestions(false);

    onChange && onChange(suggestion.value);
  };

  return (
    <div className="w-full">
      <Input
        bordered
        value={inputValue}
        onChange={handleChange}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            onEnter && onEnter(inputValue);
          }
        }}
        placeholder="Agente"
      />
      
      {showSuggestions && filteredSuggestions.length > 0 && (
        <ul className="absolute w-ful bg-slate-800 border border-gray-300 rounded mt-1 max-h-40 overflow-y-auto z-50">
          {filteredSuggestions.map((suggestion, index) => (
            <li
              key={index}
              className="p-2 hover:bg-slate-900 cursor-pointer"
              onClick={() => handleSuggestionClick(suggestion)}
            >
              {suggestion.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
