import React, {useState, useEffect} from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';

function TeamsAdmin() {
    const [TeamName, setTeamName] = useState('');
    const [TeamLogo, setTeamLogo] = useState('');
    const [TeamNameList, setTeamNameList] = useState([]);

    useEffect(() => {
      Axios.get("http://localhost:3001/api/getteam/").then((response)=> {
        setTeamNameList(response.data)
      })
    })
  
    const addTeam = () => {
      Axios.post('http://localhost:3001/api/insertteam/', {
        TeamName: TeamName,
        TeamLogo: TeamLogo
      });
      document.getElementById("TeamNameLabel").value = "";
      document.getElementById("TeamLogoLabel").value = "";
    };
  
    const deleteTeam = (Team) => {
      Axios.delete(`http://localhost:3001/api/deleteteam/${Team}`);
    }

  return (

      <div className="form">
        <label>Nazwa drużyny:</label>
        <input 
          type="text" 
          id="TeamNameLabel"
          name="TeamName" 
          onChange={(e) => { 
            setTeamName(e.target.value);
        }}required
        />

        <label>Link do logo drużyny:</label>
        <input
          type="text"
          id="TeamLogoLabel"
          name="TeamLogo"
          onChange={(e) => {
            setTeamLogo(e.target.value);
          }}
        />

        <button onClick= {addTeam}>Dodaj</button> 

        <h1>Lista drużyn:</h1>
        {TeamNameList.map((value) => {
          return (
            <div className="teamNameCard">
              <img width="100px" src={value.TeamLogo}></img>
              <Link to={`/teams/${value.TeamID}`}>
              <h1>{value.TeamName}</h1>
              </Link>
              <div>
                <button 
                  className="teamListBtn" 
                  onClick={() => {
                    deleteTeam(value.TeamName)}}>Usuń drużynę</button>
              </div>
            </div>
          );
        })}
      </div>
  ); 
}

export default TeamsAdmin;