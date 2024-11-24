import {useEffect, useState} from "react";
import axios from "axios";

const WATCHLIST_CHAR = "🕒"
const FAVOURITE_CHAR = "☆"
const WATCHED_CHAR = "👁"
const LINK_CHAR = "🔗"

const API_KEY = '?api_key=6109c9822b88c2e58e0ddfcb81d17330'
const MOVIE_URL = 'https://api.themoviedb.org/3/movie/';

// Rename this
// Change list_type from string to something more sensible
const addOrRemoveMovieToUserList = (movie_id, list_type)=> {
    /*
    Check if user is logged in
    Check if user already has movie in list
    Add/remove to list
    */
    console.log(movie_id)
}

const Movie = ({movieId}) => {

    const [movieData, setMovieData] = useState([])

    const getMovieData = ()=>{
        axios.get(MOVIE_URL + movieId + API_KEY)
        .then(response => setMovieData(response.data))
    }

    useEffect(() => {
        getMovieData();
    }, [])

    return(
        <div className="movie group">
            <p className="title"> {movieData?.title} </p>
            <img src={`https://image.tmdb.org/t/p/w500${movieData?.poster_path}`}/>
            <div className="details invisible group-hover:visible">
                <p className="overview"> {movieData?.overview} </p>
                <input className="user-button" type="button" value={`${WATCHLIST_CHAR}`} alt="Watchlist" title="Add to watchlist" onClick={()=> {addOrRemoveMovieToUserList(movieId, "watchlist")}} />
                <input className="user-button" type="button" value={`${FAVOURITE_CHAR}`} alt="Favourite" title="Add to favourites" onClick={()=> {addOrRemoveMovieToUserList(movieId, "favourites")}} />
                <input className="user-button" type="button" value={`${WATCHED_CHAR}`} alt="Watched" title="Add to watched" onClick={()=> {addOrRemoveMovieToUserList(movieId, "watched")}} />
                <a className="user-button link" alt="IMDB link" title="IMDB link" href={`https://www.imdb.com/title/${movieData.imdb_id}`}>{`${LINK_CHAR}`}</a>
            </div>
        </div>
    )
}

export { Movie }