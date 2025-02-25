import React, {useState, useEffect} from 'react';
import Axios from 'axios';
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom';

function GameInfoAdmin() {
    const [ScoreList, setScoreList] = useState([]);
    const {GameID} = useParams();
    const [PlayersList, setPlayersList] = useState([]);
    // const [PlayersFromGameList, setPlayersFromGameList] = useState([]);
    const [PlayersFromHomeTeamList, setPlayersFromHomeTeamList] = useState([]);
    const [PlayersFromAwayTeamList, setPlayersFromAwayTeamList] = useState([]);

    const [PlayerID, setPlayerID] = useState('');
    const [Minutes, setMinutes] = useState('');
    const [Seconds, setSeconds] = useState('');
    let FieldGoalsMade;
    let FieldGoalsAttempted;
    const [TwoPointersMade, setTwoPointersMade] = useState('');
    const [TwoPointersAttempted, setTwoPointersAttempted] = useState('');
    const [ThreePointersMade, setThreePointersMade] = useState('');
    const [ThreePointersAttempted, setThreePointersAttempted] =useState('');
    const [FreeThrowsMade, setFreeThrowsMade] = useState('');
    const [FreeThrowsAttempted, setFreeThrowsAttempted] = useState('');
    const [OffensiveRebounds, setOffensiveRebounds] = useState('');
    const [DefensiveRebounds, setDefensiveRebounds] = useState('');
    const [Assists, setAssists] = useState('');
    const [Steals, setSteals] = useState('');
    const [Blocks, setBlocks] = useState('');
    const [Turnovers, setTurnovers] = useState('');
    const [PersonalFouls, setPersonalFouls] = useState('');
    let Points;
    let PER;

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

    function missedShots(x1,x2) {
      const ms = x1-x2;
      return ms
    }

    function pointsCalc(x1,x2,x3) {
      const pts = +(2*x1) + +(3*x2) + +x3;
      return pts
    }

    function perCalc(x1,x2,x3,x4,x5,x6,x7,x8,x9,x10,x11,x12,x13) {
      const goods = +(85.91*x1) + +(53.897*x2) + +(51.757*x3) + +(46.845*x4) + +(39.19*x5) + +(39.19*x6) + +(34.667*x7) + +(14.707*x8);
      const bads = +(17.174*x9) + +(20.1*x10) + +(39.19*x11) + +(53.897*x12);
      const per = ((goods-bads)/x13).toFixed(2);
      return per
    }

    const logPlayerID = () => {
      console.log(PlayerID);
    }

    const addPlayerStats = () => {

      FieldGoalsMade = fieldGoals(TwoPointersMade, ThreePointersMade);
      FieldGoalsAttempted = fieldGoals(TwoPointersAttempted, ThreePointersAttempted);
      let FieldGoalsMissed = missedShots(FieldGoalsAttempted, FieldGoalsMade);
      let FreeThrowsMissed = missedShots(FreeThrowsAttempted, FreeThrowsMade);
      Points = pointsCalc(TwoPointersMade, ThreePointersMade, FreeThrowsMade);
      PER = perCalc(
        FieldGoalsMade, 
        Steals, 
        ThreePointersMade, 
        FreeThrowsMade, 
        Blocks, 
        OffensiveRebounds, 
        Assists, 
        DefensiveRebounds, 
        PersonalFouls, 
        FreeThrowsMissed, 
        FieldGoalsMissed, 
        Turnovers,
        Minutes);

      Axios.post('http://localhost:3001/api/insertplayerstats/', {
        GameID: GameID,
        PlayerID: PlayerID,
        Minutes: Minutes,
        Seconds: Seconds,
        FieldGoalsMade: FieldGoalsMade.toString(),
        FieldGoalsAttempted: FieldGoalsAttempted.toString(),
        TwoPointersMade: TwoPointersMade,
        TwoPointersAttempted: TwoPointersAttempted,
        ThreePointersMade: ThreePointersMade,
        ThreePointersAttempted: ThreePointersAttempted,
        FreeThrowsMade: FreeThrowsMade,
        FreeThrowsAttempted: FreeThrowsAttempted,
        OffensiveRebounds: OffensiveRebounds,
        DefensiveRebounds: DefensiveRebounds,
        Assists: Assists,
        Steals: Steals,
        Blocks: Blocks,
        Turnovers: Turnovers,
        PersonalFouls: PersonalFouls,
        Points: Points.toString(),
        PER: PER,
      });
    };

    useEffect(() => {
        Axios.get("http://localhost:3001/api/getgamedetails/",{
            params: {
                idgame: GameID,
            }
        }).then((response)=> {
          setScoreList(response.data)
        //    console.log(GameID);
        }).catch((err) => {
          console.log(err)
        })
      },[])

      useEffect(() => {
        Axios.get("http://localhost:3001/api/getplayerfromgame/",{
            params: {
                idgame: GameID,
            }
        }).then((response)=> {
          setPlayersList(response.data)
        }).catch((err) => {
          console.log(err)
        })
      },[])

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
      },[])

      let AwayTeamName = PlayersFromAwayTeamList.map(a => a.PlayerTeamName);
      let HomeTeamName = PlayersFromHomeTeamList.map(a => a.PlayerTeamName);

      return (
        <div className="form">
          <h1>Wyniki:</h1>
          {ScoreList.map((value) => {
              return (
                <div className="wholeScore" key={value.GameID}>
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

        <label>Wybierz zawodnika, któremu chcesz przypisać statystyki:</label>
        <select
          id="PlayerIDLabel"
          defaultValue = "Wybierz zawodnika"         
          onChange={(e) => {
            setPlayerID(e.target.value)}}>
              <option disabled hidden>Wybierz zawodnika</option>

          {PlayersList.map((value) => {
            return (<option value={value.PlayerID}>{value.FirstName} {value.LastName}</option>)
          })}
        </select>


        <table className="table">
          <thead>
            <tr>
              <th scope="col">Min</th>
              <th scope="col">Sec</th>
              <th scope="col">2PM</th>
              <th scope="col">2PA</th>
              <th scope="col">3PM</th>
              <th scope="col">3PA</th>
              <th scope="col">FTM</th>
              <th scope="col">FTA</th>
              <th scope="col">OR</th>
              <th scope="col">DR</th>
              <th scope="col">A</th>
              <th scope="col">S</th>
              <th scope="col">B</th>
              <th scope="col">TO</th>
              <th scope="col">PF</th>
            </tr>
          </thead>

          <tbody>
            <tr>

              <td>
                <input 
                  type="number" 
                  name="Minutes"
                  id="MinutesLabel" 
                  onChange={(e) => { 
                    setMinutes(e.target.value);
                }}/>
              </td>

              <td>
                <input 
                  type="number" 
                  name="Seconds"
                  id="SecondsLabel" 
                  onChange={(e) => { 
                    setSeconds(e.target.value);
                }}/>
              </td>

              <td>
                <input 
                  type="number" 
                  name="2PM"
                  id="2PMLabel" 
                  onChange={(e) => { 
                    setTwoPointersMade(e.target.value);
                }}/>
              </td>

              <td>
                <input 
                  type="number" 
                  name="2PA"
                  id="2PALabel" 
                  onChange={(e) => { 
                    setTwoPointersAttempted(e.target.value);
                }}/>
              </td>

              <td>
                <input 
                  type="number" 
                  name="3PM"
                  id="3PMLabel" 
                  onChange={(e) => { 
                    setThreePointersMade(e.target.value);
                }}/>
              </td>

              <td>
                <input 
                  type="number" 
                  name="3PA"
                  id="3PALabel" 
                  onChange={(e) => { 
                    setThreePointersAttempted(e.target.value);
                }}/>
              </td>

              <td>
                <input 
                  type="number" 
                  name="FTM"
                  id="FTMLabel" 
                  onChange={(e) => { 
                    setFreeThrowsMade(e.target.value);
                }}/>
              </td>

              <td>
                <input 
                  type="number" 
                  name="FTA"
                  id="FTALabel" 
                  onChange={(e) => { 
                    setFreeThrowsAttempted(e.target.value);
                }}/>
              </td>

              <td>
                <input 
                  type="number" 
                  name="OR"
                  id="ORLabel" 
                  onChange={(e) => { 
                    setOffensiveRebounds(e.target.value);
                }}/>
              </td>

              <td>
                <input 
                  type="number" 
                  name="DR"
                  id="DRLabel" 
                  onChange={(e) => { 
                    setDefensiveRebounds(e.target.value);
                }}/>
              </td>

              <td>
                <input 
                  type="number" 
                  name="Assists"
                  id="AssistsLabel" 
                  onChange={(e) => { 
                    setAssists(e.target.value);
                }}/>
              </td>

              <td>
                <input 
                  type="number" 
                  name="Steals"
                  id="StealsLabel" 
                  onChange={(e) => { 
                    setSteals(e.target.value);
                }}/>
              </td>

              <td>
                <input 
                  type="number" 
                  name="Blocks"
                  id="BlocksLabel" 
                  onChange={(e) => { 
                    setBlocks(e.target.value);
                }}/>
              </td>

              <td>
                <input 
                  type="number" 
                  name="TO"
                  id="TOLabel" 
                  onChange={(e) => { 
                    setTurnovers(e.target.value);
                }}/>
              </td>

              <td>
                <input 
                  type="number" 
                  name="PF"
                  id="PFLabel" 
                  onChange={(e) => { 
                    setPersonalFouls(e.target.value);
                }}/>
              </td>

            </tr>
          </tbody>

        </table>

        <button onClick={addPlayerStats}>Dodaj</button>

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

export default GameInfoAdmin