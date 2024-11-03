import axios from 'axios';

const getUserData = async () => {
    try {
        const response = await axios.get('http://localhost:3333/profile', {
            withCredentials: true,
        });
        return response?.data?.user;
    } catch (err){
        if(err.response?.status === 401){
            window.location.href = '/unauthorized';
        }
        console.error(err);
    }
}

export default getUserData;