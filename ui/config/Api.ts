import Axios from 'axios';
import Cookies from 'js-cookie';
import getConfig from 'next/config';

const { publicRuntimeConfig: config } = getConfig();

let urls = {
    test: 'http://localhost:8090/api', // test on kubernetes kind cluster locally
    development: 'http://localhost:8090/api', // local development
    production: config.ENV_API_URL, // production
}

let Api = Axios.create({
    baseURL: urls[process.env.NODE_ENV],
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
});

const token = Cookies.get('token');
if(token) {
    Api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

export default Api;
