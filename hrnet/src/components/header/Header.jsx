import Logo from '../../assets/images/logo.webp'
import './header.css'
import { Link } from 'react-router-dom'
/**
 * Header with <Link> to navigate
 * @returns JSX content
 */
function Header() {
    return(
        <div className='header'>
            <img src={Logo} alt='logo de HRNET'></img>
            <div className="title">
                <h1>HRnet</h1>
                <Link to="/">Home</Link>
            </div>
        </div>
    )
}

export default Header