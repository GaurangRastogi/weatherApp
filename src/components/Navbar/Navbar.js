import React from 'react'
import Logo from '../../images/icon.webp';
import Select from '../Select/Select';
import './Navbar.css';
function Navbar({toggleStandard}) {
  return (
    <div className='navbar'>
        <img src={Logo} alt="Logo" height={100} width={100}/>
        <p>Weather App</p>
        <Select toggleStandard={toggleStandard}/>
    </div>

  )
}

export default Navbar