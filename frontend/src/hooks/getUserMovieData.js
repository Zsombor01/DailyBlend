import axios from 'axios';

const getUserData = async (user_name) => {
    try {
        const response = await axios.get(`http://localhost:3333/profile/movieData/${user_name}`, {
            withCredentials: true,
        });
        return response?.data?.movieListData;
    } catch (err) {
        if (err.response?.status === 401) {
            window.location.href = '/unauthorized';
        }
        console.error(err);
    }
}

export default getUserData;
