import React, { useState, useEffect } from 'react';
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
    }, [])

    const addNews = () => {

        if (NewsTitle != ""  && NewsText != "") {
            Axios.post('http://localhost:3001/api/insertnews/', {
                NewsTitle: NewsTitle,
                NewsText: NewsText,
            });

            document.getElementById("NewsTitleLabel").value = "";
            document.getElementById("NewsTextLabel").value = "";
            window.location.reload(false);
        }
    };

    const deleteNews = (NewsID) => {
        Axios.delete(`http://localhost:3001/api/deletenews/${NewsID}`);
        window.location.reload(false);
    }

    return (
        <div className="form">

            <label className='bigBoldText'>Tytuł newsa:</label>

            <input
                className="inputClassic"
                type="text"
                name="NewsTitle"
                id="NewsTitleLabel"
                onChange={(e) => {
                    setNewsTitle(e.target.value);
                }} />

            <label className='bigBoldText'>Treść newsa:</label>

            <textarea
                className='inputClassic'
                name="NewsText"
                id="NewsTextLabel"
                cols="40"
                rows="5"
                onChange={(e) => {
                    setNewsText(e.target.value);
                }} />

            <button className="btn addBtn" onClick={addNews}>Dodaj</button>

            {NewsData.map((NewsData) => (
                <div key={NewsData.NewsID}>
                    <div className="infoCard">
                        <h1>{NewsData.NewsTitle}</h1>
                        <span>{NewsData.NewsText}</span>
                        <span>&#8203;</span>
                        <span>{NewsData.FormDate}</span>
                        <div>
                            <button
                                type="button"
                                className="btn deleteBtn"
                                onClick={() => {
                                    deleteNews(NewsData.NewsID)
                                }}>Usuń newsa</button>
                        </div>
                    </div>
                </div>
            ))}

        </div>
    )
}

export default NewsAdmin