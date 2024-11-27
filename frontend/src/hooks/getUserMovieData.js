import axios from 'axios';

const getUserData = async (userName) => {
    try {
        const response = await axios.get(`http://localhost:3333/movies/userData/${userName}`, {
            withCredentials: true,
        });
        return response?.data?.movieListData;
    } catch (err) {
        console.error(err);
    }
}

export default getUserData;
