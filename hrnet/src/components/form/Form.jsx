/* eslint-disable react-hooks/exhaustive-deps */
import { states } from "../../data/states/states";
import   departments   from "../../data/departments/department";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addEmployee } from "../../redux/reducer";
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css";
import "./form.css"
import Modal from "../../data/mockData/testData/mockedModal";
// import Modal from 'my-modal-p14/dist/Modal'
import Dropdown from "../dropdown/Dropdown";


function Form() {
    /**
     * Make array with object data for dropdown components
     */
    const statesArray = []
    states.map((state) => (
        statesArray.push(state.name)
    ))
    const departmentsArray = []
    departments.map((department) => (
        departmentsArray.push(department.name)
    ))
    /**
     * Initialize states for form and modal
     */
    const [formValues, setFormValues] = useState({
        firstName: '',
        lastName: '',
        birth: new Date(),
        start: new Date(),
        street: '',
        city: '',
        code: '',
        selectedStateOption: states[0]?.name || '',
        selectedDepartmentOption: departments[0]?.name || '',
      });
    const [isFormVisible, setIsFormVisible] = useState(true)
    const [isFormValid, setIsFormValid] = useState(false)
    const dispatch = useDispatch()
    /**
     * useEffect that check if form is valid in real time
     */
    useEffect(() => {
        const isValid = validateForm();
        setIsFormValid(isValid);
        console.log('Form is valid:', isValid);
    }, [formValues]);
    /**
     * handle selection in dropdown component and set state
     * @param {string} selectedValue 
     */
    const handleDropdownChangeState = (selectedValue) => {
        setFormValues({ ...formValues, selectedStateOption: selectedValue });
    };
    const handleDropdownChangeDepartment = (selectedValue) => {
        setFormValues({ ...formValues, selectedDepartmentOption: selectedValue });
    };
      /**
       * Set state to remove modal and initialize state
       */
    const handleCloseModal = () => {
      setIsFormVisible(true);
      setFormValues({
        firstName: '',
        lastName: '',
        birth: new Date(),
        start: new Date(),
        street: '',
        city: '',
        code: '',
        selectedStateOption: states[0]?.name || '',
        selectedDepartmentOption: departments[0]?.name || '',
      });
    };
    /**
     * Check if there are empty fields in form
     * @returns boolean true if each fields are complete
     */
    const validateForm = () => {
      const requiredFields = [
        formValues.firstName,
        formValues.lastName,
        formValues.birth,
        formValues.start,
        formValues.street,
        formValues.city,
        formValues.selectedStateOption,
        formValues.code,
        formValues.selectedDepartmentOption,
      ];
      return requiredFields.every((field) => field !== null && field !== '');
    };
    /**
     * If form is valid use dispatch to send info in redux store and set function to display modal
     */
    const saveEmployee = () => {
      if (isFormValid) {
        dispatch(
          addEmployee({
            firstName: formValues.firstName,
            lastName: formValues.lastName,
            department: formValues.selectedDepartmentOption,
            street: formValues.street,
            city: formValues.city,
            usState: formValues.selectedStateOption,
            birthDate: formValues.birth?.toISOString()?.split('T')[0] || '',
            startDate: formValues.start?.toISOString()?.split('T')[0] || '',
            zipCode: formValues.code,
          })
        );
        setIsFormVisible(false);
      }
    };
    return(
      <div className="formContainer">
        {isFormVisible
          ?<div>
            <form action="#" id="createEmployee">
                <div>
                    <label htmlFor="first-name">First Name</label>
                    <input type="text" id="first-name" onChange={(e) => setFormValues({ ...formValues, firstName: e.target.value })}/>
                    <label htmlFor="last-name">Last Name</label>
                    <input type="text" id="last-name" onChange={(e) => setFormValues({ ...formValues, lastName: e.target.value })} />
                    <label htmlFor="date-of-birth">Date of Birth</label>
                    <DatePicker selected={formValues.birth} id="date-of-birth" onChange={(date) => setFormValues({ ...formValues, birth: date })}/>
                    <label htmlFor="start-date">Start Date</label>
                    <DatePicker selected={formValues.start} id="start-date" onChange={(date) => setFormValues({ ...formValues, start: date })}/>
                </div>
                <fieldset className="address">
                    <legend>Address</legend>
                    <label htmlFor="street">Street</label>
                    <input id="street" type="text" onChange={(e) => setFormValues({ ...formValues, street: e.target.value })}/>
                    <label htmlFor="city">City</label>
                    <input id="city" type="text" onChange={(e) => setFormValues({ ...formValues, city: e.target.value })}/>
                    <label htmlFor="state">State</label>
                    <Dropdown data={statesArray} value={formValues.selectedStateOption} onChange={handleDropdownChangeState} label='State'/>
                    <label htmlFor="zip-code">Zip Code</label>
                    <input id="zip-code" type="number" onChange={(e) => setFormValues({ ...formValues, code: e.target.value })}/>
                </fieldset>
                <div className="departmentContainer">
                    <label htmlFor="department">Department</label>
                    <Dropdown data={departmentsArray} value={formValues.selectedDepartmentOption} onChange={handleDropdownChangeDepartment} label='Department' />
                </div>
            </form>
            <button onClick={saveEmployee} style={{cursor : "pointer"}}>Save</button>
          </div>
        :<Modal
            modalStyle={{ backgroundColor: 'transparent', display: 'flex', justifyContent: 'center', flexDirection : "column", alignItems: 'center', padding: '20px', borderRadius: '8px', width: '400px', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)'  }}
            header={<h2>Employee has been created</h2>}
            content={<p>{formValues.firstName} {formValues.lastName} added to current employees list</p>}
            footer={<button onClick={handleCloseModal} style={{cursor : "pointer"}}>Close</button>}
          />  
        }
      </div>         
    )
}

export default Form