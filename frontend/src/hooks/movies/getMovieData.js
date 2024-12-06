import axios from 'axios';

const getMovieData = async (movieID) => {
    try {
        const response = await axios.get(`http://13.60.12.85/movies?movieID=${movieID}`, {
            withCredentials: true,
        });
        return response.data;
    } catch (err) {
        console.error(err);
    }
}

export default getMovieData;