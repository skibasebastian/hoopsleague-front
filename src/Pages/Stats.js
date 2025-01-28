import React, { useState, useEffect } from 'react';
import MediaQuery from "react-responsive";
import Axios from 'axios';
import { Link } from 'react-router-dom';

function Stats() {
  const [ppgLeaders, setppgLeaders] = useState([]);
  const [rebLeaders, setrebLeaders] = useState([]);
  const [astLeaders, setastLeaders] = useState([]);
  const [blkLeaders, setblkLeaders] = useState([]);
  const [stlLeaders, setstlLeaders] = useState([]);
  const [threeptLeaders, setthreeptLeaders] = useState([]);
  const [threeprcLeaders, setthreeprcLeaders] = useState([]);
  const [fgprcLeaders, setfgprcLeaders] = useState([]);
  const [ftprcLeaders, setftprcLeaders] = useState([]);
  const [perLeaders, setperLeaders] = useState([]);

  function addOneZero(x) {
    const y = x.toFixed(1);
    return y;
  }

  function addTwoZero(x) {
    const y = x.toFixed(2);
    return y;
  }

  useEffect(() => {
    Axios.get("http://localhost:3001/api/ppgleaders/").then((response) => {
      setppgLeaders(response.data)
    }).catch((err) => {
      console.log(err)
    })
  },[])

  useEffect(() => {
    Axios.get("http://localhost:3001/api/rebleaders/").then((response) => {
      setrebLeaders(response.data)
    }).catch((err) => {
      console.log(err)
    })
  },[])

  useEffect(() => {
    Axios.get("http://localhost:3001/api/astleaders/").then((response) => {
      setastLeaders(response.data)
    }).catch((err) => {
      console.log(err)
    })
  },[])

  useEffect(() => {
    Axios.get("http://localhost:3001/api/blkleaders/").then((response) => {
      setblkLeaders(response.data)
    }).catch((err) => {
      console.log(err)
    })
  },[])

  useEffect(() => {
    Axios.get("http://localhost:3001/api/stlleaders/").then((response) => {
      setstlLeaders(response.data)
    }).catch((err) => {
      console.log(err)
    })
  },[])

  useEffect(() => {
    Axios.get("http://localhost:3001/api/threeptleaders/").then((response) => {
      setthreeptLeaders(response.data)
    }).catch((err) => {
      console.log(err)
    })
  },[])

  useEffect(() => {
    Axios.get("http://localhost:3001/api/threeptprcleaders/").then((response) => {
      setthreeprcLeaders(response.data)
    }).catch((err) => {
      console.log(err)
    })
  },[])

  useEffect(() => {
    Axios.get("http://localhost:3001/api/fgprcleaders/").then((response) => {
      setfgprcLeaders(response.data)
    }).catch((err) => {
      console.log(err)
    })
  },[])

  useEffect(() => {
    Axios.get("http://localhost:3001/api/ftprcleaders/").then((response) => {
      setftprcLeaders(response.data)
    }).catch((err) => {
      console.log(err)
    })
  },[])

  useEffect(() => {
    Axios.get("http://localhost:3001/api/perleaders/").then((response) => {
      setperLeaders(response.data)
    }).catch((err) => {
      console.log(err)
    })
  },[])

  return (
    <div className='form'>

      <MediaQuery query="(min-width: 1100px)">
        <div className="blockDiv">
          <div className="stats">
            <div className='boldtext'>Punkty na mecz</div>
            <table className="tablex">
              <thead>
                <tr>
                  <th scope="col">Poz.</th>
                  <th scope="col">Zawodnik</th>
                  <th scope="col">PPG</th>
                </tr>
              </thead>

              <tbody>
                {ppgLeaders.map((value) => (
                  <tr key={value.PlayerID}>
                    <td></td>
                    <td>
                      <Link to={`/players/${value.PlayerID}`}>
                        {value.FirstName} {value.LastName}
                      </Link>
                    </td>
                    <td>{addOneZero(value.ppg)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="stats">
            <div className='boldtext'>Zbiórki na mecz</div>
            <table className="tablex">
              <thead>
                <tr>
                  <th scope="col">Poz.</th>
                  <th scope="col">Zawodnik</th>
                  <th scope="col">RPG</th>
                </tr>
              </thead>
              <tbody>
                {rebLeaders.map((value) => (
                  <tr key={value.PlayerID}>
                    <td></td>
                    <td>
                      <Link to={`/players/${value.PlayerID}`}>
                        {value.FirstName} {value.LastName}
                      </Link>
                    </td>
                    <td>{addOneZero(value.rebpg)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="blockDiv">

          <div className="stats">
            <div className='boldtext'>Asysty na mecz</div>
            <table className="tablex">
              <thead>
                <tr>
                  <th scope="col">Poz.</th>
                  <th scope="col">Zawodnik</th>
                  <th scope="col">APG</th>
                </tr>
              </thead>
              <tbody>
                {astLeaders.map((value) => (
                  <tr key={value.PlayerID}>
                    <td></td>
                    <td>
                      <Link to={`/players/${value.PlayerID}`}>
                        {value.FirstName} {value.LastName}
                      </Link>
                    </td>
                    <td>{addOneZero(value.apg)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="stats">
            <div className='boldtext'>Bloki na mecz</div>
            <table className="tablex">
              <thead>
                <tr>
                  <th scope="col">Poz.</th>
                  <th scope="col">Zawodnik</th>
                  <th scope="col">BPG</th>
                </tr>
              </thead>
              <tbody>
                {blkLeaders.map((value) => (
                  <tr key={value.PlayerID}>
                    <td></td>
                    <td>
                      <Link to={`/players/${value.PlayerID}`}>
                        {value.FirstName} {value.LastName}
                      </Link>
                    </td>
                    <td>{addOneZero(value.blk)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="blockDiv">

          <div className="stats">
            <div className='boldtext'>Przechwyty na mecz</div>
            <table className="tablex">
              <thead>
                <tr>
                  <th scope="col">Poz.</th>
                  <th scope="col">Zawodnik</th>
                  <th scope="col">SPG</th>
                </tr>
              </thead>
              <tbody>
                {stlLeaders.map((value) => (
                  <tr key={value.PlayerID}>
                    <td></td>
                    <td>
                      <Link to={`/players/${value.PlayerID}`}>
                        {value.FirstName} {value.LastName}
                      </Link>
                    </td>
                    <td>{addOneZero(value.stl)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="stats">
            <div className='boldtext'>Suma trafionych rzutów za 3pkt</div>
            <table className="tablex">
              <thead>
                <tr>
                  <th scope="col">Poz.</th>
                  <th scope="col">Zawodnik</th>
                  <th scope="col">3PM</th>
                </tr>
              </thead>
              <tbody>
                {threeptLeaders.map((value) => (
                  <tr key={value.PlayerID}>
                    <td></td>
                    <td>
                      <Link to={`/players/${value.PlayerID}`}>
                        {value.FirstName} {value.LastName}
                      </Link>
                    </td>
                    <td>{value.threept}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="blockDiv">

          <div className="stats">
            <div className='boldtext'>Skuteczność rzutów za 3pkt</div>
            <table className="tablex">
              <thead>
                <tr>
                  <th scope="col">Poz.</th>
                  <th scope="col">Zawodnik</th>
                  <th scope="col">3P%</th>
                </tr>
              </thead>
              <tbody>
                {threeprcLeaders.map((value) => (
                  <tr key={value.PlayerID}>
                    <td></td>
                    <td>
                      <Link to={`/players/${value.PlayerID}`}>
                        {value.FirstName} {value.LastName}
                      </Link>
                    </td>
                    <td>{addTwoZero(value.threeptprc)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="stats">
            <div className='boldtext'>Skuteczność rzutowa</div>
            <table className="tablex">
              <thead>
                <tr>
                  <th scope="col">Poz.</th>
                  <th scope="col">Zawodnik</th>
                  <th scope="col">FG%</th>
                </tr>
              </thead>
              <tbody>
                {fgprcLeaders.map((value) => (
                  <tr key={value.PlayerID}>
                    <td></td>
                    <td>
                      <Link to={`/players/${value.PlayerID}`}>
                        {value.FirstName} {value.LastName}
                      </Link>
                    </td>
                    <td>{addTwoZero(value.fgprc)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="blockDiv">

          <div className="stats">
            <div className='boldtext'>Skuteczność rzutów wolnych</div>
            <table className="tablex">
              <thead>
                <tr>
                  <th scope="col">Poz.</th>
                  <th scope="col">Zawodnik</th>
                  <th scope="col">FT%</th>
                </tr>
              </thead>
              <tbody>
                {ftprcLeaders.map((value) => (
                  <tr key={value.PlayerID}>
                    <td></td>
                    <td>
                      <Link to={`/players/${value.PlayerID}`}>
                        {value.FirstName} {value.LastName}
                      </Link>
                    </td>
                    <td>{addTwoZero(value.ftprc)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="stats">
            <div className='boldtext'>Wskaźnik PER</div>
            <table className="tablex">
              <thead>
                <tr>
                  <th scope="col">Poz.</th>
                  <th scope="col">Zawodnik</th>
                  <th scope="col">PER</th>
                </tr>
              </thead>
              <tbody>
                {perLeaders.map((value) => (
                  <tr key={value.PlayerID}>
                    <td></td>
                    <td>
                      <Link to={`/players/${value.PlayerID}`}>
                        {value.FirstName} {value.LastName}
                      </Link>
                    </td>
                    <td>{addTwoZero(value.per)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </MediaQuery>

      <MediaQuery query="(max-width: 1100px)">
        <div className="blockDiv">
          <div className="stats">
            <div className='boldtext'>Punkty na mecz</div>
            <table className="tablex">
              <thead>
                <tr>
                  <th scope="col">Poz.</th>
                  <th scope="col">Zawodnik</th>
                  <th scope="col">PPG</th>
                </tr>
              </thead>

              <tbody>
                {ppgLeaders.map((value) => (
                  <tr key={value.PlayerID}>
                    <td></td>
                    <td>
                      <Link to={`/players/${value.PlayerID}`}>
                        {value.FirstName} {value.LastName}
                      </Link>
                    </td>
                    <td>{addOneZero(value.ppg)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="blockDiv">
          <div className="stats">
            <div className='boldtext'>Zbiórki na mecz</div>
            <table className="tablex">
              <thead>
                <tr>
                  <th scope="col">Poz.</th>
                  <th scope="col">Zawodnik</th>
                  <th scope="col">RPG</th>
                </tr>
              </thead>
              <tbody>
                {rebLeaders.map((value) => (
                  <tr key={value.PlayerID}>
                    <td></td>
                    <td>
                      <Link to={`/players/${value.PlayerID}`}>
                        {value.FirstName} {value.LastName}
                      </Link>
                    </td>
                    <td>{addOneZero(value.rebpg)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="blockDiv">
          <div className="stats">
            <div className='boldtext'>Asysty na mecz</div>
            <table className="tablex">
              <thead>
                <tr>
                  <th scope="col">Poz.</th>
                  <th scope="col">Zawodnik</th>
                  <th scope="col">APG</th>
                </tr>
              </thead>
              <tbody>
                {astLeaders.map((value) => (
                  <tr key={value.PlayerID}>
                    <td></td>
                    <td>
                      <Link to={`/players/${value.PlayerID}`}>
                        {value.FirstName} {value.LastName}
                      </Link>
                    </td>
                    <td>{addOneZero(value.apg)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="blockDiv">
          <div className="stats">
            <div className='boldtext'>Bloki na mecz</div>
            <table className="tablex">
              <thead>
                <tr>
                  <th scope="col">Poz.</th>
                  <th scope="col">Zawodnik</th>
                  <th scope="col">BPG</th>
                </tr>
              </thead>
              <tbody>
                {blkLeaders.map((value) => (
                  <tr key={value.PlayerID}>
                    <td></td>
                    <td>
                      <Link to={`/players/${value.PlayerID}`}>
                        {value.FirstName} {value.LastName}
                      </Link>
                    </td>
                    <td>{addOneZero(value.blk)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="blockDiv">
          <div className="stats">
            <div className='boldtext'>Przechwyty na mecz</div>
            <table className="tablex">
              <thead>
                <tr>
                  <th scope="col">Poz.</th>
                  <th scope="col">Zawodnik</th>
                  <th scope="col">SPG</th>
                </tr>
              </thead>
              <tbody>
                {stlLeaders.map((value) => (
                  <tr key={value.PlayerID}>
                    <td></td>
                    <td>
                      <Link to={`/players/${value.PlayerID}`}>
                        {value.FirstName} {value.LastName}
                      </Link>
                    </td>
                    <td>{addOneZero(value.stl)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="blockDiv">
          <div className="stats">
            <div className='boldtext'>Suma trafionych rzutów za 3pkt</div>
            <table className="tablex">
              <thead>
                <tr>
                  <th scope="col">Poz.</th>
                  <th scope="col">Zawodnik</th>
                  <th scope="col">3PM</th>
                </tr>
              </thead>
              <tbody>
                {threeptLeaders.map((value) => (
                  <tr key={value.PlayerID}>
                    <td></td>
                    <td>
                      <Link to={`/players/${value.PlayerID}`}>
                        {value.FirstName} {value.LastName}
                      </Link>
                    </td>
                    <td>{value.threept}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>


        <div className="blockDiv">
          <div className="stats">
            <div className='boldtext'>Skuteczność rzutów za 3pkt</div>
            <table className="tablex">
              <thead>
                <tr>
                  <th scope="col">Poz.</th>
                  <th scope="col">Zawodnik</th>
                  <th scope="col">3P%</th>
                </tr>
              </thead>
              <tbody>
                {threeprcLeaders.map((value) => (
                  <tr key={value.PlayerID}>
                    <td></td>
                    <td>
                      <Link to={`/players/${value.PlayerID}`}>
                        {value.FirstName} {value.LastName}
                      </Link>
                    </td>
                    <td>{addTwoZero(value.threeptprc)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="blockDiv">
          <div className="stats">
            <div className='boldtext'>Skuteczność rzutowa</div>
            <table className="tablex">
              <thead>
                <tr>
                  <th scope="col">Poz.</th>
                  <th scope="col">Zawodnik</th>
                  <th scope="col">FG%</th>
                </tr>
              </thead>
              <tbody>
                {fgprcLeaders.map((value) => (
                  <tr key={value.PlayerID}>
                    <td></td>
                    <td>
                      <Link to={`/players/${value.PlayerID}`}>
                        {value.FirstName} {value.LastName}
                      </Link>
                    </td>
                    <td>{addTwoZero(value.fgprc)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>


        <div className="blockDiv">
          <div className="stats">
            <div className='boldtext'>Skuteczność rzutów wolnych</div>
            <table className="tablex">
              <thead>
                <tr>
                  <th scope="col">Poz.</th>
                  <th scope="col">Zawodnik</th>
                  <th scope="col">FT%</th>
                </tr>
              </thead>
              <tbody>
                {ftprcLeaders.map((value) => (
                  <tr key={value.PlayerID}>
                    <td></td>
                    <td>
                      <Link to={`/players/${value.PlayerID}`}>
                        {value.FirstName} {value.LastName}
                      </Link>
                    </td>
                    <td>{addTwoZero(value.ftprc)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="blockDiv">
          <div className="stats">
            <div className='boldtext'>Wskaźnik PER</div>
            <table className="tablex">
              <thead>
                <tr>
                  <th scope="col">Poz.</th>
                  <th scope="col">Zawodnik</th>
                  <th scope="col">PER</th>
                </tr>
              </thead>
              <tbody>
                {perLeaders.map((value) => (
                  <tr key={value.PlayerID}>
                    <td></td>
                    <td>
                      <Link to={`/players/${value.PlayerID}`}>
                        {value.FirstName} {value.LastName}
                      </Link>
                    </td>
                    <td>{addTwoZero(value.per)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </MediaQuery>


    </div>
  )
}

export default Stats