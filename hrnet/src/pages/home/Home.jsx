import './home.css'
import Form from '../../components/form/Form'
import { Link } from 'react-router-dom'
function Home () {
    
    return(
        <div className="container">
            <Link to={'/employeeList'}>View Current Employees</Link>
            <h2>Create Employee</h2>
            <Form/>
        </div>   
    )
}

export default Home