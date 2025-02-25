import React, {useState, useEffect} from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';

function Schedule() {
  const [ScheduleList, setScheduleList] = useState([]);

  useEffect(() => {
    Axios.get("http://localhost:3001/api/getschedule/").then((response)=> {
      setScheduleList(response.data)
      return true;
    }).catch((err) => {
      console.log(err)
    })
  },[])

  return (
    <div className="form">

      <h1>Terminarz:</h1>
      {ScheduleList.map((value) => {
          return (
            <div className="wholeScore" key={value.GameID}>
              <div className="scoreCard">

              <span className="scoreAway">
                <Link to={`/teams/${value.AwayTeamID}`}>
                <img width="100px" src={value.AwayTeamLogo}></img>
                <h1>{value.AwayTeamName}</h1>
                </Link>
              </span>

              <span className="score">
                <h1>-</h1>
              </span>

              <span className="scoreHome">
                <Link to={`/teams/${value.HomeTeamID}`}>
                <img width="100px" src={value.HomeTeamLogo}></img>
                <h1>{value.HomeTeamName}</h1>
                </Link>
              </span>
              
            </div>
            <span>{value.FormDate}</span>
            </div>
          );
        })}

    </div>
  )
}

export default Schedule