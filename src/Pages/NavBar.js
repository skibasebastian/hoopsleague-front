import React, {useState, useEffect} from 'react';
import logo from '../images/hoopsleaguelogo.png';
import { Link, NavLink } from 'react-router-dom';

const NavBar = () => {

    const [menuOpen, setMenuOpen] = useState(false);
    const [userLogin, setUserLogin] = useState(false);

    return (
    <>
    
        <nav>
            <Link to="/"><img src={logo}/></Link>
        <div className="menu" onClick={() => {
            setMenuOpen(!menuOpen);
        }}>
            <span></span>
            <span></span>
            <span></span>
        </div>
        <ul className={menuOpen ? "open" : ""}>
            <li><NavLink to="/table">Tabela</NavLink></li>
            <li><NavLink to="schedule">Terminarz</NavLink></li>
            <li><NavLink to="/scores">Wyniki</NavLink></li>
            <li><NavLink to="/teams">Zespoły</NavLink></li>
            <li><NavLink to="/players">Zawodnicy</NavLink></li>
            <li><NavLink to="/stats">Statystyki</NavLink></li>
            <li><a className={userLogin ? "loginBtn" : "loginBtnHidden"} onClick={() => {
                setUserLogin(!userLogin);
            }}>Logout</a></li>
            <li><a className={userLogin ? "loginBtnHidden" : "loginBtn"} onClick={() => {
                setUserLogin(!userLogin);
            }}>Login</a></li>
        </ul>
        </nav>

        <nav className={userLogin ? "navAdmin" : "navAdminHidden"}>
            <h1>Admin Panel - Możliwość edycji</h1>
        <ul className={menuOpen ? "open" : ""}>
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