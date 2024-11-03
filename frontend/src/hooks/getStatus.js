import axios from 'axios';

const getStatus = async () => {
    try {
        const response = await axios.get('http://localhost:3333/auth/status', {
            withCredentials: true,
        });
        return {loggedIn: true, ...response.data};
    }catch(err){
        return {loggedIn: false};
    }
}

export default getStatus;