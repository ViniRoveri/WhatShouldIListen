import { Outlet, useNavigate } from 'react-router-dom'
import Logo from '../img/Logos/Logo-Vini-Roveri-100.png'
import {ReactComponent as HomeIcon} from '../img/Home.svg'
import {ReactComponent as StarIcon} from '../img/Star.svg'
import { useSetDisplayPopup } from '../common/hooks'

const HeaderFooter = ()=>{
    const navigate = useNavigate()
    const setDisplayPopup = useSetDisplayPopup()

    return(
        <>
        <header className="header">
            <HomeIcon className='header-home' onClick={()=>{
                navigate('/')
                setDisplayPopup(false)
            }}/>
            <img src={Logo} alt="Logo Vini Roveri" className='header-logo'/>
            <StarIcon className='header-star'onClick={()=>{
                navigate('/favorites')
                setDisplayPopup(false)
            }}/>
        </header>

        <Outlet />

        <footer className="footer">
            <p>Copyright - Vinícius Roveri - 2022</p>
        </footer>
        </>
    )
}

export default HeaderFooter