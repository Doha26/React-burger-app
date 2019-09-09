import axios from 'axios'
 const instance = axios.create({
    baseURL: 'https://react-burger-app-f833c.firebaseio.com/'
});

export default instance;