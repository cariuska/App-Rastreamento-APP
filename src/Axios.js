import axios from 'axios';

export default Axios = axios.create({
    baseURL: 'https://api.apprastreamento.com.br/v1/',
    headers: {
        'Content-Type': 'application/json',
        'hash': 'AppRastreamento',
    }
});