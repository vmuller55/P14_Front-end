import "./employee.css"
import { useEffect, useState } from "react"
import React from 'react'
import RectTable from "../../components/table/Table"
import data from "../../data/mockData/mockedUser.json"
import { useSelector } from 'react-redux';
import { selectAllEmployees } from "../../redux/reducer"

/**
 * Call table component for employee page and fetch json data
 * @returns jsx for employee Page
 */
const EmployeeList = () => {
    const [jsonData, setJsonData] = useState([]);
    const [reduxTable, setReduxTable] = useState(false);

    const allEmployees = useSelector(selectAllEmployees);

    useEffect(() => {
        fetch('./mockedUser.json')
            .then((response) => response.json())
            .then((data) => setJsonData(data))
            .catch((error) => console.error('Error fetching data:', error));
    }, []);
    
    

    return (
        <div className="currentEmployeeContainer">
            <h2>Current Employees</h2>
            
            {reduxTable
                ?
                <div className="table">
                <button onClick={(e) => setReduxTable(false)}>Random data table</button>
                <RectTable 
                    jsonData={allEmployees}
                    tableWidth={"90%"}
                    headerBgColor={"#188764"}
                    headerColor={"white"}
                    tableMargin={"auto"}
                    withSearchBar={true}
                    withPagination={true}
                />
                </div>
                :<div className="table">
                <button onClick={(e) => setReduxTable(true)}>Redux table</button>
                <RectTable 
                    jsonData={data || jsonData}
                    tableWidth={"90%"}
                    headerBgColor={"#188764"}
                    headerColor={"white"}
                    tableMargin={"auto"}
                    withSearchBar={true}
                    withPagination={true}
                />
            </div>
            }
        </div>
        )
    }
            
export default EmployeeList