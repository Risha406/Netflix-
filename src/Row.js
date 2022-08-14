import React, {useEffect, useState} from 'react';
import './Row.css';
import axios from './axios';

function Row({title, fetchUrl, isLargeRow}) {  // as a prop on server
    const [movies, setMovies] = useState([])

    const base_url= "https://image.tmdb.org/t/p/original/";

    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(fetchUrl);
            setMovies(request.data.results);
            return request;
        }
        fetchData();
    },[fetchUrl]) //dependency

    
    return (
        <div className='row'>
            <h2>{title}</h2>
            

            <div className="row__posters">
                
                {movies.map(
                    (movie) => 
                    ((isLargeRow && movie.poster_path) || 
                        (!isLargeRow && movie.backdrop_path)) && (
                        <img 
                            className={`row__poster ${isLargeRow && "row__posterLarge"}`} 
                            key = {movie.id} 
                            src={`${base_url}${
                                isLargeRow ? movie.poster_path : movie.backdrop_path  //if largr row movie then poster image and if small then use bckdrop
                            }`} 
                            alt={movie.name}/>
                    )
                )}
            </div>
        </div>
    )
}

export default Row
