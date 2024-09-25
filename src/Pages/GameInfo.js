import React, {useState, useEffect} from 'react';
import Axios from 'axios';
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom';

function GameInfo() {
    const [ScoreList, setScoreList] = useState([]);
    const {GameID} = useParams();
    const [PlayersFromGameList, setPlayersFromGameList] = useState([]);
    const [PlayersFromHomeTeamList, setPlayersFromHomeTeamList] = useState([]);
    const [PlayersFromAwayTeamList, setPlayersFromAwayTeamList] = useState([]);
    
    function addZero(x) {
      const y = String(x).padStart(2, '0');
      return y;
    }

    function prcntgCalc(x,y) {
      if (x == 0) {
        const c = (0).toFixed(2);
        return c;
      }
      else {
        const z = (100*y/x).toFixed(2);
        return z
      }
    }

    function fieldGoals(x1,x2) {
      const fgnum = (+x1 + +x2);
      let fg = fgnum;
      return fg
    }
  
    useEffect(() => {
        Axios.get("http://localhost:3001/api/getgamedetails/",{
            params: {
                idgame: GameID,
            }
        }).then((response)=> {
          setScoreList(response.data)
        }).catch((err) => {
          console.log(err)
        })
      })

      // useEffect(() => {
      //   Axios.get("http://localhost:3001/api/getplayeractionsfromgame/",{
      //       params: {
      //           idgame: GameID,
      //       }
      //   }).then((response)=> {
      //     setPlayersFromGameList(response.data)
      //   }).catch((err) => {
      //     console.log(err)
      //   })
      // })

      useEffect(() => {
        Axios.get("http://localhost:3001/api/getawayplayeractionsfromgame/",{
            params: {
                idgame: GameID,
            }
        }).then((response)=> {
          setPlayersFromAwayTeamList(response.data)
        }).catch((err) => {
          console.log(err)
        })
      })

      useEffect(() => {
        Axios.get("http://localhost:3001/api/gethomeplayeractionsfromgame/",{
            params: {
                idgame: GameID,
            }
        }).then((response)=> {
          setPlayersFromHomeTeamList(response.data)
        }).catch((err) => {
          console.log(err)
        })
      })

      let AwayTeamName = PlayersFromAwayTeamList.map(a => a.PlayerTeamName);
      let HomeTeamName = PlayersFromHomeTeamList.map(a => a.PlayerTeamName);

      return (
        <div className="form">
          {ScoreList.map((value) => {
              return (
                <div className="wholeScore">
                  <div className="scoreCard">
    
                  <span className="scoreAway">
                    <Link to={`/teams/${value.AwayTeamID}`}>
                    <h1>{value.AwayTeamName}</h1>
                    </Link>
                  </span>
    
                  <span className="score">
                    <h1>{value.AwayTeamScore} - {value.HomeTeamScore}</h1>
                  </span>
    
                  <span className="scoreHome">
                    <Link to={`/teams/${value.HomeTeamID}`}>
                    <h1>{value.HomeTeamName}</h1>
                    </Link>
                  </span>
    
                </div>
                <span>{value.FormDate}</span>
                </div>
              );
            })}
        
        <h1>{AwayTeamName[0]}</h1>
        <table className="table">
          <thead>
              <tr>
                <th scope="col">PLAYER</th>
                <th scope="col">MIN</th>
                <th scope="col">FGM</th>
                <th scope="col">FGA</th>
                <th scope="col">FG%</th>
                <th scope="col">3PM</th>
                <th scope="col">3PA</th>
                <th scope="col">3P%</th>
                <th scope="col">FTM</th>
                <th scope="col">FTA</th>
                <th scope="col">FT%</th>
                <th scope="col">OREB</th>
                <th scope="col">DREB</th>
                <th scope="col">REB</th>
                <th scope="col">AST</th>
                <th scope="col">STL</th>
                <th scope="col">BLK</th>
                <th scope="col">TO</th>
                <th scope="col">PF</th>
                <th scope="col">PTS</th>
                <th scope="col">PER</th>
              </tr>
            </thead>

          <tbody>
            {PlayersFromAwayTeamList.map((value) => (
              <tr>
                <td>
                  <Link to={`/players/${value.PlayerID}`}>
                    {value.FirstName} {value.LastName}
                  </Link>
                </td>
                <td>
                  {addZero(value.Minutes)}:{addZero(value.Seconds)}
                </td>
                <td>
                  {value.FieldGoalsMade}
                </td>
                <td>
                  {value.FieldGoalsAttempted}
                </td>
                <td>
                  {prcntgCalc(value.FieldGoalsAttempted,value.FieldGoalsMade)}
                </td>
                <td>
                  {value.ThreePointersMade}
                </td>
                <td>
                  {value.ThreePointersAttempted}
                </td>
                <td>
                  {prcntgCalc(value.ThreePointersAttempted,value.ThreePointersMade)}
                </td>
                <td>
                  {value.FreeThrowsMade}
                </td>
                <td>
                  {value.FreeThrowsAttempted}
                </td>
                <td>
                  {prcntgCalc(value.FreeThrowsAttempted,value.FreeThrowsMade)}
                </td>
                <td>
                  {value.OffensiveRebounds}
                </td>
                <td>
                  {value.DefensiveRebounds}
                </td>
                <td>
                  {fieldGoals(value.OffensiveRebounds,value.DefensiveRebounds)}
                </td>
                <td>
                  {value.Assists}
                </td>
                <td>
                  {value.Steals}
                </td>
                <td>
                  {value.Blocks}
                </td>
                <td>
                  {value.Turnovers}
                </td>
                <td>
                  {value.PersonalFouls}
                </td>
                <td>
                  {value.Points}
                </td>
                <td>
                  {value.PER}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <h1>{HomeTeamName[0]}</h1>
        <table className="table">
          <thead>
              <tr>
                <th scope="col">PLAYER</th>
                <th scope="col">MIN</th>
                <th scope="col">FGM</th>
                <th scope="col">FGA</th>
                <th scope="col">FG%</th>
                <th scope="col">3PM</th>
                <th scope="col">3PA</th>
                <th scope="col">3P%</th>
                <th scope="col">FTM</th>
                <th scope="col">FTA</th>
                <th scope="col">FT%</th>
                <th scope="col">OREB</th>
                <th scope="col">DREB</th>
                <th scope="col">REB</th>
                <th scope="col">AST</th>
                <th scope="col">STL</th>
                <th scope="col">BLK</th>
                <th scope="col">TO</th>
                <th scope="col">PF</th>
                <th scope="col">PTS</th>
                <th scope="col">PER</th>
              </tr>
            </thead>

          <tbody>
            {PlayersFromHomeTeamList.map((value) => (
              <tr>
                <td>
                  <Link to={`/players/${value.PlayerID}`}>
                    {value.FirstName} {value.LastName}
                  </Link>
                </td>
                <td>
                  {addZero(value.Minutes)}:{addZero(value.Seconds)}
                </td>
                <td>
                  {value.FieldGoalsMade}
                </td>
                <td>
                  {value.FieldGoalsAttempted}
                </td>
                <td>
                  {prcntgCalc(value.FieldGoalsAttempted,value.FieldGoalsMade)}
                </td>
                <td>
                  {value.ThreePointersMade}
                </td>
                <td>
                  {value.ThreePointersAttempted}
                </td>
                <td>
                  {prcntgCalc(value.ThreePointersAttempted,value.ThreePointersMade)}
                </td>
                <td>
                  {value.FreeThrowsMade}
                </td>
                <td>
                  {value.FreeThrowsAttempted}
                </td>
                <td>
                  {prcntgCalc(value.FreeThrowsAttempted,value.FreeThrowsMade)}
                </td>
                <td>
                  {value.OffensiveRebounds}
                </td>
                <td>
                  {value.DefensiveRebounds}
                </td>
                <td>
                  {fieldGoals(value.OffensiveRebounds,value.DefensiveRebounds)}
                </td>
                <td>
                  {value.Assists}
                </td>
                <td>
                  {value.Steals}
                </td>
                <td>
                  {value.Blocks}
                </td>
                <td>
                  {value.Turnovers}
                </td>
                <td>
                  {value.PersonalFouls}
                </td>
                <td>
                  {value.Points}
                </td>
                <td>
                  {value.PER}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        </div>

      )
    }

export default GameInfo