import React, {useState, useEffect} from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';

function ScoresAdmin() {
  const [GameID, setGameID] = useState('');
  const [AwayTeamScore, setAwayTeamScore] = useState('');
  const [HomeTeamScore, setHomeTeamScore] = useState('');

  const [TeamNameList, setTeamNameList] = useState([]);
  const [ScoreList, setScoreList] = useState([]);
  const [ScheduleList, setScheduleList] = useState([]);

  useEffect(() => {
    Axios.get("http://localhost:3001/api/getscores/").then((response)=> {
      setScoreList(response.data)
    }).catch((err) => {
      console.log(err)
    })
  })

  useEffect(() => {
    Axios.get("http://localhost:3001/api/getschedulenoscore/").then((response)=> {
      setScheduleList(response.data)
    }).catch((err) => {
      console.log(err)
    })
  })

  useEffect(() => {
    Axios.get("http://localhost:3001/api/getgamedetails/",{
        params: {
            idgame: GameID,
        }
    }).then((response)=> {
      setTeamNameList(response.data)
    }).catch((err) => {
      console.log(err)
    })
  })

  const addScore = () => {

    if (AwayTeamScore > HomeTeamScore) {
      console.log("opcja 1");
    Axios.post('http://localhost:3001/api/insertscoreawaywin/', {
      GameID: GameID,
      AwayTeamScore: AwayTeamScore,
      HomeTeamScore: HomeTeamScore
    })}
    
    else if (AwayTeamScore < HomeTeamScore) {
      console.log("opcja 2");
    Axios.post('http://localhost:3001/api/insertscorehomewin/', {
      GameID: GameID,
      AwayTeamScore: AwayTeamScore,
      HomeTeamScore: HomeTeamScore
    })}

    else {
      console.log("Błąd");
    };

    document.getElementById("AwayTeamScoreLabel").value = "";
    document.getElementById("HomeTeamScoreLabel").value = "";

  };

  const deleteScore = (Game) => {
    Axios.delete(`http://localhost:3001/api/deletescore/${Game}`);
  }


  return (
    <div className="form">

        <label>Wybierz mecz, do którego chcesz dodać wynik:</label>
        <select
          id="GameIDLabel"
          defaultValue = "Wybierz mecz"         
          onChange={(e) => {
            setGameID(e.target.value)}}>
              <option disabled hidden>Wybierz mecz</option>

          {ScheduleList.map((value) => {
            return (<option value={value.GameID}>{value.AwayTeamName} - {value.HomeTeamName} {value.FormDate}</option>)
          })}
        </select>

      <label>Wynik drużyny 1:</label>
      <input 
        type="text" 
        name="AwayTeamScore" 
        id="AwayTeamScoreLabel" 
        onChange={(e) => { 
          setAwayTeamScore(e.target.value);
      }}/>
      
      <label>Wynik drużyny 2:</label>
      <input 
        type="text" 
        name="HomeTeamScore" 
        id="HomeTeamScoreLabel" 
        onChange={(e) => { 
          setHomeTeamScore(e.target.value);
      }}/>

      <button onClick= {addScore}>Dodaj</button> 

      <h1>Wyniki:</h1>
      {ScoreList.map((value) => {
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
              <Link to={`/scoresadmin/${value.GameID}`}>
                <h1>{value.AwayTeamScore} - {value.HomeTeamScore}</h1>
              </Link>
              </span>

              <span className="scoreHome">
                <Link to={`/teams/${value.HomeTeamID}`}>
                <img width="100px" src={value.HomeTeamLogo}></img>
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

export default ScoresAdmin