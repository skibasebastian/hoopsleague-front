import React, {useState, useEffect} from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from './Pages/Home';
import Table from './Pages/Table';
import Schedule from './Pages/Schedule';
import ScheduleAdmin from './Pages/ScheduleAdmin';
import Scores from './Pages/Scores';
import ScoresAdmin from './Pages/ScoresAdmin';
import Teams from './Pages/Teams';
import TeamsAdmin from './Pages/TeamsAdmin';
import Players from './Pages/Players';
import PlayersAdmin from './Pages/PlayersAdmin';
import Stats from './Pages/Stats';
import GameInfo from './Pages/GameInfo';
import GameInfoAdmin from './Pages/GameInfoAdmin';
import TeamInfo from './Pages/TeamInfo';
import PlayerInfo from './Pages/PlayerInfo';
import ProtectedRoutes from './ProtectedRoutes';

function App() {

  function activateAdminNavBar() {
    const x = 0;
    const y = String(x).padStart(2, '0');
    console.log(y);
    // var node = document.getElementById("navadm");
    // if (node.style.visibility=='visible') {
    //   node.style.visibility = 'hidden';
    // }
    // else
    //   node.style.visibility = 'visible'
    // return;
  }

  return (
    <div className="App">

    {/* <div className='nav'>
      <div className='nav'>
      <a href="/"><img src={logo}/></a>
      <button onClick={activateAdminNavBar}>AdminPanel</button>    
      </div>  
      <ul>
        <li class="nav-item"><a href="/table">Tabela</a></li>
        <li class="nav-item"><a href="/schedule">Terminarz</a></li>
        <li class="nav-item"><a href="/scores">Wyniki</a></li>
        <li class="nav-item"><a href="/teams">Zespoły</a></li>
        <li class="nav-item"><a href="/players">Zawodnicy</a></li>
        <li class="nav-item"><a href="/stats">Statystyki</a></li>
      </ul>
    </div> */}

    {/* <div id="navadm" className='navAdmin'>
        <h1>Admin Panel</h1>
      <ul>
        <span>Możliwość edycji</span>
        <a href="/scheduleadmin">Terminarz</a>
        <a href="/scoresadmin">Wyniki</a>
        <a href="/teamsadmin">Zespoły</a>
        <a href="/playersadmin">Zawodnicy</a>
      </ul>
    </div> */}

    <h1 className='title'>
        HoopsLeague
      </h1>

    <Router>
      <Routes>
        <Route path="/" element={<Home />} />    
        <Route path="/table" element={<Table />} /> 
        <Route path="/schedule" element={<Schedule />} />
        <Route path="/scores" element={<Scores />} />
        <Route path="/scores/:GameID" element={<GameInfo />} />
        <Route path="/teams" element={<Teams />} />  
        <Route path="/teams/:TeamID" element={<TeamInfo />} />  
        <Route path="/players" element={<Players />} />
        <Route path="/players/:PlayerID" element={<PlayerInfo />} />
        <Route path="/stats" element={<Stats />} />

        <Route element={<ProtectedRoutes/>}>
          <Route path="/scheduleadmin" element={<ScheduleAdmin />} />
          <Route path="/scoresadmin" element={<ScoresAdmin />} />
          <Route path="/scoresadmin/:GameID" element={<GameInfoAdmin />} />
          <Route path="/teamsadmin" element={<TeamsAdmin />} /> 
          <Route path="/playersadmin" element={<PlayersAdmin />} />
        </Route>
      </Routes>
    </Router>

     </div>
  ); 
}

export default App;
