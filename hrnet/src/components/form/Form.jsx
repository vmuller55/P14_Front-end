import { states } from "../../data/states/states";
import { departments } from "../../data/departments/department";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { nanoid } from "@reduxjs/toolkit";
import { addEmployee } from "../../redux/reducer";
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css";
import "./form.css"
import Modal from "../modal/Modal";




function Form() {
    const [firstName, setFirst] = useState('')
    const [lastName, setLast] = useState('')
    const [birth, setBirth] = useState(new Date())
    const [start, setStart] = useState(new Date())
    const [street, setStreet] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [code, setCode] = useState('')
    const [department, setDepartment] = useState('')

    const [isFormVisible, setIsFormVisible] = useState(true)
   
    
    const handleOpenModal = () => {
        setIsFormVisible(false)   
      };

    const handleCloseModal = () => {
        setIsFormVisible(true)
    };

    const dispatch = useDispatch()

    useEffect(() => {
    })

    function formatDate(date) {
        const dateNew = new Date(date)
        const dateISO = dateNew.toISOString().split("T")[0]
        const [year, month, day] = dateISO.split(".")
    
        return [month, day, year].join("")
    }

    const saveEmployee = () => {
        // if ( firstName.length < 2 || lastName.length < 2) {
        //     alert('Please fill all the fields with 2 character minimum.');
        //     return false;
        // }
        
        dispatch(
            addEmployee({
                id: nanoid(),
                firstName: firstName,
                lastName: lastName,
                startDate: formatDate(start),
                department: department,
                birthDate: formatDate(birth),
                street: street,
                city: city,
                usState: state,
                zipCode: code
            })
        )
        handleOpenModal()
        // Data Reset
        setFirst(''); setLast(''); setStart(new Date()); setDepartment(''); setBirth(new Date())
        setStreet(''); setCity(''); setState(''); setCode('')
    }
   
    return(
        <div className="formContainer"> 
            {isFormVisible
                ?<div>
                    <form action="#" id="createEmployee">
                    <div>
                        <label htmlFor="first-name">First Name</label>
                        <input type="text" id="first-name" onChange={(e) => setFirst(e.target.value)} />
                        <label htmlFor="last-name">Last Name</label>
                        <input type="text" id="last-name" onChange={(e) => setLast(e.target.value)} />
                        <label htmlFor="date-of-birth">Date of Birth</label>
                        <DatePicker selected={birth} onChange={(date) => setBirth(date)}/>
                        <label htmlFor="start-date">Start Date</label>
                        <DatePicker selected={start} onChange={(date) => setStart(date)}/>
                    </div>
                    <fieldset className="address">
                        <legend>Address</legend>
                        <label htmlFor="street">Street</label>
                        <input id="street" type="text" onChange={(e) => setStreet(e.target.value)}/>
                        <label htmlFor="city">City</label>
                        <input id="city" type="text" onChange={(e) => setCity(e.target.value)}/>
                        <label htmlFor="state">State</label>
                        <select name="state" id="state">
                            {states.map((state, index) => {
                                return <option key={index} onChange={(e) => setState(e.target.value)}>{state.name}</option> 
                            })}
                        </select>
                        <label htmlFor="zip-code">Zip Code</label>
                        <input id="zip-code" type="number" onChange={(e) => setCode(e.target.value)}/>
                    </fieldset>
                    <div className="departmentContainer">
                        <label htmlFor="department">Department</label>
                        <select name="department" id="department">
                            {departments.map((department, index) => {
                                return <option key={index} onChange={(e) => setDepartment(e.target.value)}>{department}</option>
                            })}
                        </select>
                    </div>
                    </form>
                    <button onClick={saveEmployee} style={{cursor : "pointer"}}>Save</button>
                </div>
        :<Modal
            modalStyle={{ backgroundColor: 'transparent', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
            contentStyle={{ backgroundColor: '#fff', padding: '20px', borderRadius: '8px', width: '400px', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)' }}
        >
            <h2>Employee has been created</h2>
            <button onClick={handleCloseModal}>Close</button>
        </Modal>
        }
    </div>         
    )
}

export default Form