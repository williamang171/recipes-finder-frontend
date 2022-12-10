import axios from 'axios';

const env = process.env.NODE_ENV;
export const instance = axios.create({
    baseURL: env === 'production' ? process.env.REACT_APP_BACKEND_BASE_URL : ''
});

export default instance;
