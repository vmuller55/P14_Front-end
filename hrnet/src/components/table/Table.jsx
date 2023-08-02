import React from 'react';
import { useState } from 'react';

const RectTable = ({ jsonData, tableClassName, headerBgColor, cellBgColor, tableWidth, tableMargin, withSearchBar,withPagination, searchBarClassName }) => {
    const headers = jsonData.length > 0 ? Object.keys(jsonData[0]) : [];
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [sortedColumn, setSortedColumn] = useState(null);
    const [sortOrder, setSortOrder] = useState('asc');

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };
    const filteredData = jsonData.filter((row) =>
        headers.some((header) =>
            String(row[header]).toLowerCase().includes(searchQuery.toLowerCase())
        )
    );
    const handlePageChange = (event) => {
        setCurrentPage(Number(event.target.value));
    };
    
    const handleRowsPerPageChange = (event) => {
        setRowsPerPage(Number(event.target.value));
        setCurrentPage(1); // Reset the current page to 1 when rows per page changes
    };
    const handleSort = (column) => {
        if (sortedColumn === column) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortedColumn(column);
            setSortOrder('asc');
        }
    };

    const sortedData = 
        sortedColumn
            ? filteredData.sort((a, b) => {
                const aValue = a[sortedColumn];
                const bValue = b[sortedColumn];
                if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
                if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
                return 0;
            })
            : filteredData;
    
    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    const currentRows = sortedData.slice(indexOfFirstRow, indexOfLastRow);

    if(!searchBarClassName){
        searchBarClassName = ""
    }
    if(!tableClassName){
        tableClassName = ""
    }

    return (
        <div>
            {withSearchBar
                ?<input type="text" value={searchQuery} onChange={handleSearchChange} placeholder="Search..." className={`react-table-searchbar ${searchBarClassName}`} />
                :""
            }
            {withPagination
                ?<div className="pagination" style={{display : "flex", justifyContent : "space-between", width : tableWidth, margin : tableMargin}}>
                    <div className='selectEntries'>
                        <span>Show </span>
                        <select value={rowsPerPage} onChange={handleRowsPerPageChange}>
                            <option value={5}>5</option>
                            <option value={10}>10</option>
                            <option value={15}>15</option>
                            <option value={jsonData.length}>All</option>
                        </select>
                        <span>entries</span>
                    </div>
                    <div className='pageNumber'>
                        <input
                            type="number"
                            value={currentPage}
                            onChange={handlePageChange}
                            min={1}
                            max={Math.ceil(jsonData.length / rowsPerPage)}
                        />
                        <span>of {Math.ceil(jsonData.length / rowsPerPage)}</span>
                    </div> 
                </div>
                :""   
            }
            
            <table className={`rect-table ${tableClassName}`}style={{ width: tableWidth, margin : tableMargin }}>
            <thead>
                <tr>
                {headers.map((header, index) => (
                    <th key={index} onClick={() => handleSort(header)} style={{ backgroundColor: headerBgColor, cursor : "pointer"}}>{header} {sortedColumn === header && (sortOrder === 'asc' ? '▲' : '▼')}</th>
                ))}
                </tr>
            </thead>
            <tbody>
                {currentRows.map((row, rowIndex) => (
                <tr key={rowIndex}>
                    {headers.map((header, cellIndex) => (
                    <td key={cellIndex}style={{ backgroundColor: cellBgColor }}>{row[header]}</td>
                    ))}
                </tr>
                ))}
            </tbody>
            </table>
        </div>
    );
};

export default RectTable;
