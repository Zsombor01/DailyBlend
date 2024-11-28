import axios from 'axios';
import { toast } from "react-toastify";

const getDiscoverMovieIDs = async () => {
    try {
        const list = await axios.get(`http://localhost:3333/movies/discover`)
            .then(response => response.data.results)
            .then(results => results.map(movie => movie.id))
        return list;
    } catch (err) {
        toast.error("Failed to get discovered movies!");
        console.error(err);
    }
}

export default getDiscoverMovieIDs;
