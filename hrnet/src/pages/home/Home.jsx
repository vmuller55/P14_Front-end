import './home.css'
import { states } from '../../data/states/states'
import { departments } from '../../data/departments/department'
import { Link } from 'react-router-dom'
function Home () {
    
    return(
        <div>
            <div className="container">
                <Link to={'/employeeList'}>View Current Employees</Link>
                <h2>Create Employee</h2>
                <form action="#" id="create-employee">
                    <label htmlFor="first-name">First Name</label>
                    <input type="text" id="first-name" />
                    <label htmlFor="last-name">Last Name</label>
                    <input type="text" id="last-name" />
                    <label htmlFor="date-of-birth">Date of Birth</label>
                    <input id="date-of-birth" type="text" />
                    <label htmlFor="start-date">Start Date</label>
                    <input id="start-date" type="text" />
                    <fieldset className="address">
                        <legend>Address</legend>
                        <label htmlFor="street">Street</label>
                        <input id="street" type="text" />
                        <label htmlFor="city">City</label>
                        <input id="city" type="text" />
                        <label htmlFor="state">State</label>
                        <select name="state" id="state">
                            {states.map((state, index) => {
                               return <option key={index}>{state.name}</option> 
                            })}
                        </select>

                        <label htmlFor="zip-code">Zip Code</label>
                        <input id="zip-code" type="number" />
                    </fieldset>
                    <label htmlFor="department">Department</label>
                    <select name="department" id="department">
                        {departments.map((department, index) => {
                            return <option key={index}>{department}</option>
                        })}
                    </select>
                </form>
                <button onClick="saveEmployee()">Save</button>
            </div>
            <div id="confirmation" className="modal">Employee Created!</div>
            </div>
    )
}

export default Home