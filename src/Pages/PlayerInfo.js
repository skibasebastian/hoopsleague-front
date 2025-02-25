import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { useParams, Link } from 'react-router-dom';

function PlayerInfo() {
  const { PlayerID } = useParams();
  const [playersData, setPlayersData] = useState([]);
  const [playersActions, setPlayersActions] = useState([]);
  const [playersAvgs, setPlayersAvgs] = useState([]);
  const [statsButton, setStatsButton] = useState(false);

  function addZero(x) {
    const y = String(x).padStart(2, '0');
    return y;
  }

  function prcntgCalc(x, y) {
    if (x == 0) {
      const c = (0).toFixed(2);
      return c;
    }
    else {
      const z = (100 * y / x).toFixed(2);
      return z
    }
  }

  function fieldGoals(x1, x2) {
    const fgnum = (+x1 + +x2);
    let fg = fgnum;
    return fg
  }

  useEffect(() => {
    Axios.get("http://localhost:3001/api/getplayerdetails/", {
      params: {
        PlayerID: PlayerID,
      }
    }).then((response) => {
      setPlayersData(response.data)
    }).catch((err) => {
      console.log(err)
    })
  }, [])

  useEffect(() => {
    Axios.get("http://localhost:3001/api/getplayeractions/", {
      params: {
        PlayerID: PlayerID,
      }
    }).then((response) => {
      setPlayersActions(response.data)
    }).catch((err) => {
      console.log(err)
    })
  }, [])

  useEffect(() => {
    Axios.get("http://localhost:3001/api/getplayeravgs/", {
      params: {
        PlayerID: PlayerID,
      }
    }).then((response) => {
      setPlayersAvgs(response.data)
    }).catch((err) => {
      console.log(err)
    })
  }, [])


  return (
    <div className="form">

      {/* {playersData.map((playersDataX) => {
        return (
          <>
            <img width="5%" loading="lazy" src={playersDataX.PlayerImage}></img>
            <img width="15%" src={playersDataX.TeamLogo}></img>
          </>
        )
      })} */}

      {playersData.map((playersData) => {
        return (
          <div className="playerInfoCard">

            <div className='topPlayerInfoCard'>
              <div className="leftPlayerInfoCard">
                <div className="firstName">{playersData.FirstName}</div>

                <div className="row row1">
                  <div className="lastName">{playersData.LastName}</div>
                  <Link to={`/teams/${playersData.PlayerTeamID}`}>
                    <img className='teamLogo' src={playersData.TeamLogo} />
                  </Link>
                  <div className="number">#{playersData.Jersey}</div>
                  <div className='separator'></div>
                  <div className="position">{playersData.Position}</div>
                </div>

                <div className='row row2'>
                  <div className='separator2'></div>
                </div>

                <div className="row row3">
                  <div className='smallText'>Wzrost</div>
                  <div className='smallText'>Waga</div>
                </div>

                <div className="row row4">
                  <div className='height'>
                    <div className="bigBoldText">{playersData.Height}</div>
                    <div className='smallText'> cm</div>
                  </div>

                  <div className='weight'>
                    <div className="bigBoldText">{playersData.Weight}</div>
                    <div className='smallText'> kg</div>
                  </div>
                </div>

                <div className='row row5'>
                  <div className='separator2'></div>
                </div>
              </div>

              <div className="rightPlayerInfoCard">
                <img className='playerImage' loading="lazy" src={playersData.PlayerImage}></img>
              </div>
            </div>


            <div className="playerAvgsDiv">
              <table className="avgTable">
                <thead>
                  <tr>
                    <th scope="col"></th>
                    <th scope="col">MIN</th>
                    <th scope="col">PTS</th>
                    <th scope="col">RBT</th>
                    <th scope="col">AST</th>
                    <th scope="col">PER</th>
                    <th scope="col">STL</th>
                    <th scope="col">BLK</th>
                    <th scope="col">FG</th>
                    <th scope="col">FG%</th>
                    <th scope="col">3P</th>
                    <th scope="col">3P%</th>
                    <th scope="col">FT</th>
                    <th scope="col">FT%</th>
                  </tr>
                </thead>
                <tbody>
                  {playersAvgs.map((value) => (
                    <tr key={value.PlayerID}>
                      <td className='smallTextAvg'>Statystyki średnie</td>
                      <td>
                        {value.mpg}
                      </td>
                      <td>
                        {value.ppg}
                      </td>
                      <td>
                        {value.rebpg}
                      </td>
                      <td>
                        {value.apg}
                      </td>
                      <td>
                        {value.per}
                      </td>
                      <td>
                        {value.stl}
                      </td>
                      <td>
                        {value.blk}
                      </td>
                      <td>
                        {value.fgm}/{value.fga}
                      </td>
                      <td>
                        {prcntgCalc(value.fga, value.fgm)}
                      </td>
                      <td>
                        {value.threepm}/{value.threepa}
                      </td>
                      <td>
                        {prcntgCalc(value.threepa, value.threepm)}
                      </td>
                      <td>
                        {value.ftm}/{value.fta}
                      </td>
                      <td>
                        {prcntgCalc(value.fta, value.ftm)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className='topPlayerInfoCard'>
              <a className='statsBtn' onClick={() => setStatsButton(!statsButton)}>
                Ostatnie mecze</a>
            </div>

          </div>
        )
      })}
      <div className={statsButton ? "playerInfoCard" : "hidTable"}>

        <table className={statsButton ? "avgTable" : "hidTable"}>
          <thead>
            <tr>
              <th scope="col">Data</th>
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
            {playersActions.map((value) => (
              <tr key={value.GameID}>
                <td>{value.GameDateTime}</td>
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
                  {prcntgCalc(value.FieldGoalsAttempted, value.FieldGoalsMade)}
                </td>
                <td>
                  {value.ThreePointersMade}
                </td>
                <td>
                  {value.ThreePointersAttempted}
                </td>
                <td>
                  {prcntgCalc(value.ThreePointersAttempted, value.ThreePointersMade)}
                </td>
                <td>
                  {value.FreeThrowsMade}
                </td>
                <td>
                  {value.FreeThrowsAttempted}
                </td>
                <td>
                  {prcntgCalc(value.FreeThrowsAttempted, value.FreeThrowsMade)}
                </td>
                <td>
                  {value.OffensiveRebounds}
                </td>
                <td>
                  {value.DefensiveRebounds}
                </td>
                <td>
                  {fieldGoals(value.OffensiveRebounds, value.DefensiveRebounds)}
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

    </div>
  )
}

export default PlayerInfo