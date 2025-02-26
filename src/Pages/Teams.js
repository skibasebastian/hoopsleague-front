import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';

function Teams() {
  const [TeamNameList, setTeamNameList] = useState([]);

  useEffect(() => {
    Axios.get("http://localhost:3001/api/getteam/").then((response) => {
      setTeamNameList(response.data)
    })
  }, [])

  return (


    <div className="gridDiv">
      {TeamNameList.map((value) => {
        return (
          <div className="teamNameCard" key={value.TeamID}>
            <img width="100px" alt="Team Logo" src={value.TeamLogo}></img>
            <Link to={`/teams/${value.TeamID}`}>
              <h1>{value.TeamName}</h1>
            </Link>
          </div>
        );
      })}

    </div>
  );

}

export default Teams;