import React, {useState, useEffect} from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';

function PlayersAdmin() {
  const [FirstName, setFirstName] = useState('');
  const [LastName, setLastName] = useState('');
  const [Jersey, setJersey] = useState('');
  const [Position, setPosition] = useState('');
  const [Height, setHeight] = useState('');
  const [Weight, setWeight] = useState('');
  const [Team, setTeam] = useState('');

  const [playersData, setPlayersData] = useState([]);
  const [TeamNameList, setTeamNameList] = useState([]);

  useEffect(() => {
    Axios.get("http://localhost:3001/api/getplayer/").then((response) => {
      setPlayersData(response.data)
    }).catch((err) => {
      console.log(err)
    })
  })

  useEffect(() => {
    Axios.get("http://localhost:3001/api/getteam/").then((response)=> {
      setTeamNameList(response.data)
    }).catch((err) => {
      console.log(err)
    })
  })

  const addPlayer = () => {
    Axios.post('http://localhost:3001/api/insertplayer/', {
      FirstName: FirstName,
      LastName: LastName,
      Jersey: Jersey,
      Position: Position,
      Height: Height,
      Weight: Weight,
      PlayerTeamID: Team,
    });

    document.getElementById("FirstNameLabel").value = "";
    document.getElementById("LastNameLabel").value = "";
    document.getElementById("JerseyLabel").value = "";
    document.getElementById("HeightLabel").value = "";
    document.getElementById("WeightLabel").value = "";

  };

  return (
    <div className="form">

      <h1>Dodaj zawodnika:</h1>

      <label>Imię:</label>
      <input 
        type="text" 
        name="FirstName"
        id="FirstNameLabel" 
        onChange={(e) => { 
          setFirstName(e.target.value);
      }}/>

      <label>Nazwisko:</label>
      <input 
        type="text" 
        name="LastName" 
        id="LastNameLabel" 
        onChange={(e) => { 
          setLastName(e.target.value);
      }}/>

      <label>Numer:</label>
      <input 
        type="number" 
        name="Jersey"
        id="JerseyLabel" 
        min="0" max="99"
        onChange={(e) => { 
          setJersey(e.target.value);
      }}/>

      <label>Pozycja:</label>
        <select
          defaultValue = "Wybierz drużynę"         
          onChange={(e) => {
          setPosition(e.target.value)}}>

          <option hidden>Wybierz pozycję</option>
          <option value="G">Obrońca</option>
          <option value="F">Skrzydłowy</option>
          <option value="C">Środkowy</option>
        </select>

      <label>Wzrost [cm]:</label>
      <input 
        type="number" 
        name="Height" 
        id="HeightLabel" 
        onChange={(e) => { 
          setHeight(e.target.value);
      }}/>

      <label>Waga [kg]:</label>
      <input 
        type="number" 
        name="Weight" 
        id="WeightLabel" 
        onChange={(e) => { 
          setWeight(e.target.value);
      }}/>

      <label>Drużyna:</label>

        <select
          defaultValue = "Wybierz drużynę"         
          onChange={(e) => {
          setTeam(e.target.value)}}>

          <option disabled hidden>Wybierz drużynę</option>

          {TeamNameList.map((value) => {
            return <option value={value.TeamID}>{value.TeamName}</option>
          })}
        </select>

      <button onClick= {addPlayer}>Dodaj</button> 

      <h1>Lista zawodników:</h1>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">Zawodnik</th>
            <th scope="col">Drużyna</th>
            <th scope="col">Numer</th>
            <th scope="col">Pozycja</th>
            <th scope="col">Wzrost</th>
            <th scope="col">Waga</th>
          </tr>
        </thead>
        <tbody>
          { playersData.map((playersData)=> (
            <tr>
              <td><Link to={`/players/${playersData.PlayerID}`}>
              <a>{playersData.FirstName } {playersData.LastName }</a>
              </Link>
              </td>
              <td><Link to={`/teams/${playersData.PlayerTeamID}`}> {playersData.TeamName } 
              </Link>
              </td>
              <td> {playersData.Jersey} </td>
              <td> {playersData.Position} </td>
              <td> {playersData.Height} cm </td>
              <td> {playersData.Weight} kg</td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  )
}

export default PlayersAdmin