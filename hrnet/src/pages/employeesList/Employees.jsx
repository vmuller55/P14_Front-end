import "./employee.css"
import { useEffect, useState } from "react"
import React from 'react'
import RectTable from "../../components/table/Table"

/**
 * Call table component for employee page and fetch json data
 * @returns jsx for employee Page
 */
const EmployeeList = () => {
    const [jsonData, setJsonData] = useState([]);

    useEffect(() => {
        fetch('./mockedUser.json')
            .then((response) => response.json())
            .then((data) => setJsonData(data))
            .catch((error) => console.error('Error fetching data:', error));
    }, []);

    return (
        <div className="currentEmployeeContainer">
            <h2>Current Employees</h2>
            <div className="table">
                <RectTable 
                    jsonData={jsonData}
                    tableWidth={"90%"}
                    tableClassName={"test"}
                    headerBgColor={"#188764"}
                    cellBgColor={"#67e4bd"}
                    tableMargin={"auto"}
                    withSearchBar={true}
                    withPagination={true}
                />
            </div>
        </div>
        )
    }
            
export default EmployeeList