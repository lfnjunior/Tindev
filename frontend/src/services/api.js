import axios from 'axios';
import Global from './Global.js'

//qualquer serviço que faça comunicação com dados externos
const api = axios.create({
    baseURL: Global.BACKEND_URL
});

export default api;