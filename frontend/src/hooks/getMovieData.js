import axios from 'axios';

const getMovieData = async (movie_id) => {
    try {
        const response = await axios.get(`http://localhost:3333/movies?movie_id=${movie_id}`);
        return response.data;
    } catch (err) {
        console.error(err);
    }
}

export default getMovieData;