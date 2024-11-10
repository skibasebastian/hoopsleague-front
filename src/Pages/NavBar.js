import React, {useState, useEffect} from 'react';
import logo from '../images/hoopsleaguelogo.png';
import { Link, NavLink } from 'react-router-dom';

const NavBar = () => {
    return (
    <>
    
        <nav>
            <Link to="/"><img src={logo}/></Link>
        <div className="menu">
            <span></span>
            <span></span>
            <span></span>
        </div>
        <ul>
            <li><NavLink to="/table">Tabela</NavLink></li>
            <li><NavLink to="schedule">Terminarz</NavLink></li>
            <li><NavLink to="/scores">Wyniki</NavLink></li>
            <li><NavLink to="/teams">Zespoły</NavLink></li>
            <li><NavLink to="/players">Zawodnicy</NavLink></li>
            <li><NavLink to="/stats">Statystyki</NavLink></li>
        </ul>
        </nav>

        <nav class="navAdmin">
            <h1>Admin Panel - Możliwość edycji</h1>
        <ul>
            <li><NavLink to="/newsadmin">Newsy</NavLink></li>
            <li><NavLink to="/scheduleadmin">Terminarz</NavLink></li>
            <li><NavLink to="/scoresadmin">Wyniki</NavLink></li>
            <li><NavLink to="/teamsadmin">Zespoły</NavLink></li>
            <li><NavLink to="/playersadmin">Zawodnicy</NavLink></li>
        </ul>
        </nav>

    </>
    
    );
};

export default NavBar