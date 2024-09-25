import React, {useState, useEffect} from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';

function ScheduleAdmin() {
  const [AwayTeamID, setAwayTeamID] = useState('');
  const [HomeTeamID, setHomeTeamID] = useState('');
  const [GameDateTime, setGameDateTime] = useState('');

  const [TeamNameList, setTeamNameList] = useState([]);
  const [ScheduleList, setScheduleList] = useState([]);

  useEffect(() => {
    Axios.get("http://localhost:3001/api/getteam/").then((response)=> {
      setTeamNameList(response.data)
      return true;
    }).catch((err) => {
      console.log(err)
    })
  })

  useEffect(() => {
    Axios.get("http://localhost:3001/api/getschedule/").then((response)=> {
      setScheduleList(response.data)
      return true;
    }).catch((err) => {
      console.log(err)
    })
  })

  const addSchedule = () => {
    Axios.post('http://localhost:3001/api/insertschedule/', {
      AwayTeamID: AwayTeamID,
      HomeTeamID: HomeTeamID,
      GameDateTime: GameDateTime
    });

    document.getElementById("GameDateTimeLabel").value = "";
  };

  const deleteScore = (Game) => {
    Axios.delete(`http://localhost:3001/api/deletescore/${Game}`);
  }

  return (
    <div className="form">

        <label>Drużyna 1:</label>
        <select
          id="AwayTeamIDLabel"  
          defaultValue = "Wybierz pierwszą drużynę"       
          onChange={(e) => {
            setAwayTeamID(e.target.value)}}>
              <option disabled hidden>Wybierz pierwszą drużynę</option>

          {TeamNameList.map((value) => {
            return <option value={value.TeamID}>{value.TeamName}</option>
          })}
        </select>

        <label>Drużyna 2:</label>
        <select         
          id="HomeTeamIDLabel"
          defaultValue = "Wybierz drugą drużynę"  
          onChange={(e) => {
            setHomeTeamID(e.target.value)}}>
              <option disabled hidden>Wybierz drugą drużynę</option>

          {TeamNameList.map((value) => {
            return <option value={value.TeamID}>{value.TeamName}</option>
          })}
        </select>

        <label>Data:</label>
        <input 
          type="datetime-local" 
          name="GameDateTime"
          id="GameDateTimeLabel" 
          onChange={(e) => { 
            setGameDateTime(e.target.value);
        }}/>

      <button onClick= {addSchedule}>Dodaj</button> 

      <h1>Terminarz:</h1>
      {ScheduleList.map((value) => {
          return (
            <div className="wholeScore">
              <div className="scoreCard">

              <span className="scoreAway">
                <Link to={`/teams/${value.AwayTeamID}`}>
                <h1>{value.AwayTeamName}</h1>
                </Link>
              </span>

              <span>
                <h1>-</h1>
              </span>

              <span className="scoreHome">
                <Link to={`/teams/${value.HomeTeamID}`}>
                <h1>{value.HomeTeamName}</h1>
                </Link>
              </span>
              
            </div>
            <span>{value.FormDate}</span>
            <span><button className="btnDelGame"
            onClick={() => { 
              deleteScore(value.GameID)
            }}>Usuń mecz</button></span>
            </div>
          );
        })}

    </div>
  )
}

export default ScheduleAdmin