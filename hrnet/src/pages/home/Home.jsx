import './home.css'
import Form from '../../components/form/Form'
import { Link } from 'react-router-dom'
/**
 * Home page with form component and <Link> to navigate
 * @returns JSX content
 */
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