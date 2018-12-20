import axios from 'axios';

const instance = axios.create({
    baseUrl: 'https://react-burger-1218.firebaseio.com/'
});

export default instance;