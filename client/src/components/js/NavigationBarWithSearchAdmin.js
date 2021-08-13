import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import '../css/NavigationBarNew.css'


function NavigationBarWithSearchAdmin(props) {

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
                    <label className="menu-title1">Admin Dashboard</label>
                    <div className='menu-icon' onClick={handleClick}>
                        <i className={click ? 'fas fa-times' : 'fas fa-bars'}></i>
                    </div>
                    <div className='menu-title'>
                    <input className="mr-sm-2 inputSearch p-1" onChange={props.handleInput} type="search" placeholder="Search" aria-label="Search" />
                    
                    </div>
                    
                    <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                        <li className='nav-item'>
                            <Link to='/dashboard' className='nav-links' onClick={closeMobileMenu}>
                                Home
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

export default NavigationBarWithSearchAdmin
