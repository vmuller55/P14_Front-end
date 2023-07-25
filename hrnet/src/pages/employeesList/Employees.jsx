import '../home/home.css'
import { Link } from 'react-router-dom'
function Employee () {
    
    return(
        <div id="employee-div" class="container">
            <h2>Current Employees</h2>
            <table id="employee-table" class="display"></table>
            <Link to={'/'}>Home</Link>
        </div>
    )
}

export default Employee