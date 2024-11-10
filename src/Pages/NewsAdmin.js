import React, {useState, useEffect} from 'react';
import Axios from 'axios';

function NewsAdmin() {

    const [NewsTitle, setNewsTitle] = useState('');
    const [NewsText, setNewsText] = useState('');
    const [NewsData, setNewsData] = useState([]);

    useEffect(() => {
        Axios.get("http://localhost:3001/api/getnewsdata/").then((response) => {
          setNewsData(response.data)
        }).catch((err) => {
          console.log(err)
        })
    })

    const addNews = () => {
        Axios.post('http://localhost:3001/api/insertnews/', {
            NewsTitle: NewsTitle,
            NewsText: NewsText,
        });
    
        document.getElementById("NewsTitleLabel").value = "";   
        document.getElementById("NewsTextLabel").value = "";   
      };

    return(
        <div className="form">

            <h1>Dodaj zawodnika:</h1>

            <label>Tytuł newsa:</label>

            <input 
            type="text" 
            name="NewsTitle"
            id="NewsTitleLabel" 
            onChange={(e) => { 
                setNewsTitle(e.target.value);
            }}/>

            <label>Treść newsa:</label>
            
            <textarea 
            name="NewsText" 
            id="NewsTextLabel" 
            cols="40" 
            rows="5" 
            onChange={(e) => {
                setNewsText(e.target.value);
            }}/>

            <button onClick= {addNews}>Dodaj</button>

            {NewsData.map((NewsData) => (
                <>
                    <div className="infoCard">
                        <h1>{NewsData.NewsTitle}</h1>
                        <span>{NewsData.NewsText}</span>
                        <span>&#8203;</span>
                        <span>{NewsData.DateTime}</span>
                    </div>
                </>
            ))}

        </div>
    )
}

export default NewsAdmin