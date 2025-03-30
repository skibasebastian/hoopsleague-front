import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

function TeamInfo() {
  const [TeamNameList, setTeamNameList] = useState([]);
  const { TeamID } = useParams();
  const [playersData, setPlayersData] = useState([]);

  useEffect(() => {
    Axios.get("http://localhost:3001/api/getteamdetails/", {
      params: {
        TeamID: TeamID,
      }
    }).then((response) => {
      setTeamNameList(response.data)
    }).catch((err) => {
      console.log(err)
    })
  }, [])

  useEffect(() => {
    Axios.get("http://localhost:3001/api/getplayerfromteam/", {
      params: {
        TeamID: TeamID,
      }
    }).then((response) => {
      setPlayersData(response.data)
    }).catch((err) => {
      console.log(err)
    })
  }, [])

  return (
    <div className="form">

      <div className="gridDiv">
        {TeamNameList.map((value) => {
          return (
            <div className="teamNameCard">
              <img width="100px" src={value.TeamLogo}></img>
              <h1>{value.TeamName}</h1>
            </div>
          );
        })}
      </div>

      <h1>Lista zawodników:</h1>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Zawodnik</th>
            <th scope="col">Numer</th>
            <th scope="col">Pozycja</th>
            <th scope="col">Wzrost</th>
            <th scope="col">Waga</th>
          </tr>
        </thead>
        <tbody>
          {playersData.map((playersData) => (
            <tr >
              <td><Link to={`/players/${playersData.PlayerID}`}>
                {playersData.FirstName} {playersData.LastName}
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
  );
}

export default TeamInfo