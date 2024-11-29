import axios from 'axios';

const getMovieData = async (movieID) => {
    try {
        const response = await axios.get(`http://localhost:3333/movies?movieID=${movieID}`);
        return response.data;
    } catch (err) {
        console.error(err);
    }
}

export default getMovieData;