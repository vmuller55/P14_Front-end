import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ReactTable from '../components/table/Table';

// Sample JSON data for testing
const jsonData = [
  { id: 1, name: 'John', age: 30 },
  { id: 2, name: 'Jane', age: 25 },
  { id: 3, name: 'Bob', age: 40 },
];

test('renders ReactTable with data', () => {
  render(<ReactTable jsonData={jsonData} withSearchBar={true} withPagination={true} />);

  // Check if headers are rendered correctly
  const headerNames = ['id', 'name', 'age'];
  for (const header of headerNames) {
    const headerElement = screen.getByText(header);
    expect(headerElement).toBeInTheDocument();
  }

  // Check if data rows are rendered correctly
  for (const rowData of jsonData) {
    const { id, name, age } = rowData;
    const idCell = screen.getByText(String(id));
    const nameCell = screen.getByText(name);
    const ageCell = screen.getByText(String(age));

    expect(idCell).toBeInTheDocument();
    expect(nameCell).toBeInTheDocument();
    expect(ageCell).toBeInTheDocument();
  }
  // Check if the initial state is as expected
  const rowsPerPageSelect = screen.getByLabelText('Rows per page:');
  expect(rowsPerPageSelect.value).toBe('5'); // Default value

  // Trigger the change event on the select element
  fireEvent.change(rowsPerPageSelect, { target: { value: '10' } });

  // Check if the state is updated as expected
  expect(rowsPerPageSelect.value).toBe('10');
  
  // currentPage should be reset to 1 after changing rowsPerPage
  const currentPageInput = screen.getByLabelText('page');
  expect(currentPageInput.value).toBe('1');

  // Click on the 'name' header to change the sort column and order
  const nameHeader = screen.getByText('name');
  fireEvent.click(nameHeader);

  // Check if the state is updated correctly
  expect(screen.getByText('id')).toBeInTheDocument();
  expect(screen.getByText('name ▲')).toBeInTheDocument(); // Sorted by name in ascending order
  expect(screen.getByText('age')).toBeInTheDocument();


  // Click on the 'name' header again to toggle the sort order
  fireEvent.click(nameHeader);

  // Check if the sort order is updated to 'desc'
  expect(screen.getByText('id')).toBeInTheDocument();
  expect(screen.getByText('name ▼')).toBeInTheDocument(); // Sorted by name in descending order
  expect(screen.getByText('age')).toBeInTheDocument();

  // Test the search functionality
  const searchInput = screen.getByLabelText('searchBar');
  fireEvent.change(searchInput, { target: { value: 'John' } });
  expect(screen.getByText('John')).toBeInTheDocument();
  expect(screen.queryByText('Jane')).not.toBeInTheDocument();

  // Test the pagination functionality
  const entriesSelect = screen.getByLabelText('page');
  fireEvent.change(entriesSelect, { target: { value: '2' } });
  expect(screen.queryByText('John')).not.toBeInTheDocument();
  expect(screen.queryByText('Jane')).not.toBeInTheDocument();
  expect(screen.queryByText('Bob')).not.toBeInTheDocument();
});
