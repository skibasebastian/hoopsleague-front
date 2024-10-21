import React, {useState, useEffect} from 'react';
import logo from '../images/hoopsleaguelogo.png';

const NavBar = () => {

    return (
        <div className='nav'>
            <div className='nav'>
                <a href="/"><img src={logo}/></a>
                {/* <button onClick={activateAdminNavBar}>AdminPanel</button>     */}
            </div>  
            <ul>
                <a href="/table">Tabela</a>
                <a href="/schedule">Terminarz</a>
                <a href="/scores">Wyniki</a>
                <a href="/teams">Zespoły</a>
                <a href="/players">Zawodnicy</a>
                <a href="/stats">Statystyki</a>
            </ul>
      </div>
    )
};

export default NavBar