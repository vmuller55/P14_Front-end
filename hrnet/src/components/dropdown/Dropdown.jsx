import React from 'react';

const Dropdown = ({ data, value, onChange }) => {
  const handleOnChange = (event) => {
    const selectedValue = event.target.value;
    onChange(selectedValue);
  };
  return (
    <select value={value} onChange={handleOnChange}>
      {data.map((item) => (
        <option key={item} value={item}>
          {item}
        </option>
      ))}
    </select>
  );
};

export default Dropdown;