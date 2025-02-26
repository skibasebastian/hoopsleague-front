import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';

function Players() {
  const [playersData, setPlayersData] = useState([]);

  useEffect(() => {
    Axios.get("http://localhost:3001/api/getplayer/").then((response) => {
      setPlayersData(response.data)
    }).catch((err) => {
      console.log(err)
    })
  }, [])

  return (
    <div className="form">

      <div className='playerInfoCard'>
        <div className='boldtext'>Lista zawodników</div>
        <table className="table">
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
            {playersData.map((playersData) => (
              <tr key={playersData.PlayerID}>
                <td><Link to={`/players/${playersData.PlayerID}`}>
                  {playersData.FirstName} {playersData.LastName}
                </Link>
                </td>
                <td><Link to={`/teams/${playersData.PlayerTeamID}`}> {playersData.TeamName}
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

    </div>
  )
}

export default Players