import React, {useState, useEffect} from 'react';
import Axios from 'axios';
import { useParams } from 'react-router-dom';

function PlayerInfo() {
    const {PlayerID} = useParams();
    const [playersData, setPlayersData] = useState([]);
    const [playersActions, setPlayersActions] = useState([]);
    const [playersAvgs, setPlayersAvgs] = useState([]);

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
        Axios.get("http://localhost:3001/api/getplayerdetails/", {
            params: {
                PlayerID: PlayerID,
            }
        }).then((response) => {
            setPlayersData(response.data)
        }).catch((err) => {
            console.log(err)
          })
    })

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
    })

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
    })
    
    
return (
    <div className="form">

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
        <tr >
        <td> {playersData.FirstName } {playersData.LastName } </td>
        <td> {playersData.TeamName } </td>
        <td> {playersData.Jersey} </td>
        <td> {playersData.Position} </td>
        <td> {playersData.Height} cm </td>
        <td> {playersData.Weight} kg</td>
        </tr>
        ))}
        </tbody>
        </table>

            <div>.</div>
            <div className='boldtext'>Średnie statystyki</div>
            <div>.</div>
            <table className="table">
            <thead>
                <tr>
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
                <tr>
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
                  {prcntgCalc(value.fga,value.fgm)}
                </td>
                <td>
                  {value.threepm}/{value.threepa}
                </td>
                <td>
                  {prcntgCalc(value.threepa,value.threepm)}
                </td>
                <td>
                  {value.ftm}/{value.fta}
                </td>
                <td>
                  {prcntgCalc(value.fta,value.ftm)}
                </td>
                </tr>
                ))}
                
            </tbody>


            </table>
            <div>.</div>
            <div>.</div>
            <div className='boldtext'>Statystyki w meczach</div>
            <div>.</div>

            <table className="table">
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
                    <tr>
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

export default PlayerInfo