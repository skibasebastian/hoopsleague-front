import React, {useState, useEffect} from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';

function Table() {
  const [WinList, setWinList] = useState([]);

  useEffect(() => {
    Axios.get("http://localhost:3001/api/gettable/").then((response)=> {
      setWinList(response.data)
    })
  })

  return (
    <div className="form">

    <table className="tablex">
      <thead>
        <tr>
          <th scope="col">Poz.</th>
          <th scope="col">Drużyna</th>
          <th scope="col">W</th>
          <th scope="col">L</th>
          <th scope="col">M</th>
        </tr>
      </thead>

      <tbody>
        {WinList.map((value) => (
          <tr>
            <td></td>
            <td>
              <Link to={`/teams/${value.TeamID}`}>
                <img width="30px" src={value.TeamLogo}></img>
                {value.TeamName}
              </Link>
            </td>
            <td>{value.TotalWins}</td>
            <td>{value.TotalLosses}</td>
            <td>{value.TotalWins+value.TotalLosses}</td>
          </tr>
        ))}
      </tbody>
    </table>

    </div>
  )
}

export default Table