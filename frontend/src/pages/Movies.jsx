import {useEffect, useState} from "react";
import moviesImage from './asset/movies.png';

function Movies() {
    
    const [movieList, setMovieList] = useState([])

    const api_key = '?api_key=6109c9822b88c2e58e0ddfcb81d17330'

    const movie_url = 'https://api.themoviedb.org/3/movie/';
    const trending_url = 'https://api.themoviedb.org/3/trending/movie/week' + api_key;

    const getMovie = ()=>{
        fetch(trending_url)
        .then(res => res.json())
        .then(json => setMovieList(json.results))
    }

    useEffect(() => {
        getMovie()
    }, [])

    return (
        <div
            className="inset-0 bg-cover bg-center z-[-1] py-16"
            style={{
                backgroundImage: `url(${moviesImage})`,
                "backgroundAttachment": "fixed",
            }}
        >
            <div
                className="flex flex-wrap gap-4 mx-10"
                style={{
                    "justifyContent": "center"
                }}>
                {movieList.map((movie)=>(
                    <div className="border-4 border-black"
                        style={{"maxWidth":"300px"}}>
                        <p
                            className="position absolute font-bold text-white pl-2 pt-1"
                            style={{"textShadow": "0px 0px 8px black"}}>
                                {movie.title}
                        </p>
                        <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}></img>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Movies
