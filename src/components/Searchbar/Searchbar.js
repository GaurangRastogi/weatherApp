import React, { useState } from 'react'
import Logo from '../../images/icon.webp';
import SearchIcon from '../../images/search-icon.svg';

function Searchbar({searchLocation}) {

  return (
    <div className='searchBar'>
        <img src={Logo} alt="App" id='app-logo' width={80} height={80}/>
        <input type='search' id='search' width={200} placeholder='Enter Location'/>
        <img src={SearchIcon} alt="Search" width={30} height={30} id='searchIcon' onClick={()=>searchLocation()}/>
    </div>
  )
}

export default Searchbar;