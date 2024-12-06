import axios from 'axios';

const getUserData = async () => {
    try {
        const response = await axios.get('http://13.60.12.85/profile', {
            withCredentials: true,
        });
        console.log(response);
        return response?.data?.user;
    } catch (err){
        if(err.response?.status === 401){
            window.location.href = '/unauthorized';
        }
        console.error(err);
    }
}

export default getUserData;