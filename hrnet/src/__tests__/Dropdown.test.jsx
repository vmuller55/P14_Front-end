import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Dropdown from '../components/dropdown/Dropdown';

describe('Dropdown Component', () => {
  // Sample data to use in the test
  const testData = ['Option 1', 'Option 2', 'Option 3'];
  const mockOnChange = jest.fn();

  test('renders options correctly', () => {
    render(<Dropdown data={testData} value={testData[0]} onChange={mockOnChange} />);

    // Check if the dropdown options are rendered correctly
    const dropdownOptions = screen.getAllByRole('option');
    expect(dropdownOptions).toHaveLength(testData.length);

    // Check if the options' text content matches the data
    testData.forEach((optionText, index) => {
      expect(dropdownOptions[index]).toHaveTextContent(optionText);
    });

    // Check if the selected value is set correctly
    const selectElement = screen.getByRole('combobox');
    expect(selectElement).toHaveValue(testData[0]);
  });

  test('triggers onChange event correctly', () => {
    render(<Dropdown data={testData} value={testData[0]} onChange={mockOnChange} />);

    // Select a different option
    const selectElement = screen.getByRole('combobox');
    const selectedValue = testData[1];
    fireEvent.change(selectElement, { target: { value: selectedValue } });

    // Check if the onChange event is triggered and the selected value is passed correctly
    expect(mockOnChange).toHaveBeenCalledWith(selectedValue);
  });
});
