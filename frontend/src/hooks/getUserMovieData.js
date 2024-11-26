import axios from 'axios';

const getUserData = async (user_name) => {
    try {
        const response = await axios.get(`http://localhost:3333/movies/userData/${user_name}`, {
            withCredentials: true,
        });
        return response?.data?.movieListData;
    } catch (err) {
        console.error(err);
    }
}

export default getUserData;
