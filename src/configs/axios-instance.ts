/* global process */
import axios from 'axios';
import axiosRetry from 'axios-retry';

const env = process.env.NODE_ENV;

const instance = axios.create({
  baseURL: env === 'production' ? process.env.REACT_APP_BACKEND_BASE_URL : ''
});

axiosRetry(instance, {
  retries: 3, // number of retries
  retryDelay: (retryCount) => {
    console.log(`retry attempt: ${retryCount}`);
    return 5000; // time interval between retries
  },
  retryCondition: (error) => {
    // if retry condition is not specified, by default idempotent requests are retried
    if (error.response !== undefined) {
      return error.response.status === 503;
    }
    return false;
  }
});

export default instance;
