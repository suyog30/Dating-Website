import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import '../css/NavigationBarNew.css'


function NavigationBarDashboard() {

    const [click, setClick] = useState(false);
    const [button, setButton] = useState(true);


    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);

    const showButton = () => {
        if(window.innerWidth <=960){
            setButton(false)
        }else{
            setButton(true)
        }
    }

    useEffect(() => {
        showButton()
    }, [])

    window.addEventListener('resize', showButton)

    return (
        <>
            <nav className='navbar'>
                <div className='navbar-container'>
                    <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
                    UTDinder <i className='fab fa-typo3' />
                    </Link>
                    <div className='menu-icon' onClick={handleClick}>
                        <i className={click ? 'fas fa-times' : 'fas fa-bars'}></i>
                    </div>
                    <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                        <li className='nav-item'>
                            <Link to='/dashboard' className='nav-links' onClick={closeMobileMenu}>
                                Home
                        </Link>
                        </li>
                        <li className='nav-item'>
                            <Link to='/services' className='nav-links' onClick={closeMobileMenu}>
                                My Services
                        </Link>
                        </li>

                        <li className='nav-item'>
                            <Link to='/userprofile' className='nav-links' onClick={closeMobileMenu}>
                                My Profile
                        </Link>
                        </li>
                        <li className='nav-item'>
                            <Link to='/mymatches' className='nav-links' onClick={closeMobileMenu}>
                                My Matches
                        </Link>
                        </li>
                        <li className='nav-item'>
                            <Link to='/logout' className='nav-links' onClick={closeMobileMenu}>
                                Logout
                        </Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </>
    )
}

export default NavigationBarDashboard
