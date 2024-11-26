import { useEffect, useState } from "react";
import axios from "axios";
import getUserData from "../hooks/getUserData";
import { MovieListType } from "../../../shared/enums/MovieListType";

const WATCHLIST_CHAR = "🕒"
const FAVOURITE_CHAR = "☆"
const WATCHED_CHAR = "👁"
const LINK_CHAR = "🔗"

const updateMovieList = async (movie_id, list_type) => {
    // Missing user logged in check
    // Missing movie is already on list check (remove if its there)
    const user = await getUserData();
    await axios.put(`http://localhost:3333/movies/updateUserData/${user.name}&${movie_id}&${list_type}`)
}

const Movie = ({ movie_id }) => {

    const MOVIE_URL = `http://localhost:3333/movies?movie_id=${movie_id}`;

    const [movieData, setMovieData] = useState([])

    const getMovieData = () => {
        axios.get(MOVIE_URL)
            .then(response => setMovieData(response.data))
    }

    useEffect(() => {
        getMovieData();
    }, [])

    return (
        <div className="movie group">
            <p className="title"> {movieData?.title} </p>
            <img src={`https://image.tmdb.org/t/p/w500${movieData?.poster_path}`} />
            <div className="details invisible group-hover:visible">
                <p className="overview"> {movieData?.overview} </p>
                <input className="user-button" type="button" value={`${WATCHLIST_CHAR}`} alt="Watchlist" title="Add to watchlist" onClick={() => { updateMovieList(movie_id, MovieListType.WATCHLIST) }} />
                <input className="user-button" type="button" value={`${FAVOURITE_CHAR}`} alt="Favourite" title="Add to favourites" onClick={() => { updateMovieList(movie_id, MovieListType.FAVOURITE) }} />
                <input className="user-button" type="button" value={`${WATCHED_CHAR}`} alt="Watched" title="Add to watched" onClick={() => { updateMovieList(movie_id, MovieListType.WATCHED) }} />
                <a className="user-button link" alt="IMDB link" title="IMDB link" href={`https://www.imdb.com/title/${movieData?.imdb_id}`}>{`${LINK_CHAR}`}</a>
            </div>
        </div>
    )
}

export { Movie }