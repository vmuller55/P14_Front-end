import React from 'react';
/**
 * Component that take an array, a value and a handle function to set state
 * @param {Array} data 
 * @param {string} value
 * @param {Function} onChange 
 * @returns 
 */
const Dropdown = ({ data, value, onChange, label }) => {
  const handleOnChange = (event) => {
    const selectedValue = event.target.value;
    onChange(selectedValue);
  };
  return (
    <select value={value} onChange={handleOnChange} aria-label={label}>
      {data.map((item) => (
        <option key={item} value={item} label={label}>
          {item}
        </option>
      ))}
    </select>
  );
};

export default Dropdown;