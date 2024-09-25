import React, {useState, useEffect} from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';

function TeamsAdmin() {
    const [TeamName, setTeamName] = useState('');
    const [TeamNameList, setTeamNameList] = useState([]);

    useEffect(() => {
      Axios.get("http://localhost:3001/api/getteam/").then((response)=> {
        setTeamNameList(response.data)
      })
    })
  
    const addTeam = () => {
      Axios.post('http://localhost:3001/api/insertteam/', {
        TeamName: TeamName
      });
      document.getElementById("TeamNameLabel").value = "";
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
        }}required/>

        <button onClick= {addTeam}>Dodaj</button> 

        <h1>Lista drużyn:</h1>
        {TeamNameList.map((value) => {
          return (
            <div className="teamNameCard">
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