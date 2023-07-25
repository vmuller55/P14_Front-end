import Logo from '../../assets/images/logo.webp'
import './header.css'
function Header() {
    return(
        <div className='header'>
            <img src={Logo} alt='logo de HRNET'></img>
            <div className="title">
                <h1>HRnet</h1>
            </div>
        </div>
    )
}

export default Header