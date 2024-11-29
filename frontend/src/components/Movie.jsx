import { useEffect, useState } from "react";
import axios from "axios";
import getUserData from "../hooks/getUserData";
import getMovieData from "../hooks/movies/getMovieData";
import { toast } from "react-toastify";

const WATCHLIST_CHAR = "🕒";
const FAVOURITE_CHAR = "☆";
const WATCHED_CHAR = "👁";
const LINK_CHAR = "🔗";

const updateMovieList = async (movieID, listType) => {
    try {
        if (!getUserData()) {
            toast.error("User not logged in. Please log in to update your list.");
            return;
        }

        const user = await getUserData();
        const response = await axios.put(
            `http://localhost:3333/movies/updateUserData/${user.name}/${listType}/${movieID}`
        );

        toast.success(
            `Movie successfully added to the ${
                listType === "favouritesList"
                    ? "favourites list"
                    : listType === "watchedList"
                    ? "watched list"
                    : "watch list"
            }`
        );
        console.log(JSON.stringify(response?.data));
    } catch (err) {
        toast.error(err.message);
        console.log(err);
    }
};

const Movie = ({ movieID }) => {
    const [movieData, setMovieData] = useState([]);

    const updateMovieData = async () => {
        const data = await getMovieData(movieID);
        setMovieData(data);
    };

    useEffect(() => {
        updateMovieData();
    }, []);

    return (
        <div className="movie group">
            <p className="title"> {movieData?.title} </p>
            <img src={`https://image.tmdb.org/t/p/w500${movieData?.poster_path}`} />
            <div className="details invisible group-hover:visible">
                <p className="overview"> {movieData?.overview} </p>
                <input
                    className="user-button"
                    type="button"
                    value={`${WATCHLIST_CHAR}`}
                    alt="Watchlist"
                    title="Add to watchlist"
                    onClick={() => {
                        updateMovieList(movieID, "watchList");
                    }}
                />
                <input
                    className="user-button"
                    type="button"
                    value={`${FAVOURITE_CHAR}`}
                    alt="Favourite"
                    title="Add to favourites"
                    onClick={() => {
                        updateMovieList(movieID, "favouritesList");
                    }}
                />
                <input
                    className="user-button"
                    type="button"
                    value={`${WATCHED_CHAR}`}
                    alt="Watched"
                    title="Add to watched"
                    onClick={() => {
                        updateMovieList(movieID, "watchedList");
                    }}
                />
                <a
                    className="user-button link"
                    alt="IMDB link"
                    title="IMDB link"
                    href={`https://www.imdb.com/title/${movieData?.imdb_id}`}
                >{`${LINK_CHAR}`}</a>
            </div>
        </div>
    );
};

export { Movie };
