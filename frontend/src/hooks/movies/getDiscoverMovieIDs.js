import axios from 'axios';

const getDiscoverMovieIDs = async () => {
    try {
        const list = await axios.get(`http://localhost:3333/movies/discover`)
            .then(response => response.data.results)
            .then(results => results.map(movie => movie.id))
        return list;
    } catch (err) {
        console.error(err);
    }
}

export default getDiscoverMovieIDs;
