import axios from 'axios';

const getTrendingMovieIDs = async (user_name) => {
    try {
        const list = await axios.get(`http://localhost:3333/movies/trending`)
            .then(response => response.data.results)
            .then(results => results.map(movie => movie.id))
        return list;
    } catch (err) {
        console.error(err);
    }
}

export default getTrendingMovieIDs;
