import React from 'react';

const PropertiesList = ({ options, onSelect }) => {
  return (
    <select className="form-select" onChange={(e) => onSelect(e.target.value)}>
      <option value="">Select an option</option>
      {options?.data?.map((option, index) => (
        <option key={index} value={option.id}>
          {option.name}
        </option>
      ))}
    </select>
  );
};

export default PropertiesList;